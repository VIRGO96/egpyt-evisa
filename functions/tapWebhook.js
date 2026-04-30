const axios = require("axios");
const { Firestore } = require("firebase-admin/firestore");
const sendSGMail = require("./utils/SendSGMail");
const { onRequest } = require("firebase-functions/v2/https");
const { getSecrets } = require("./utils/secrets");
const { secrets: definedSecrets } = require("./utils/secrets");
const { sanitizeInput, isMalicious, sanitizeObject } = require("./utils/sanitize");
const { safeSyncApplicationToAlgolia } = require("./utils/algolia");

exports.tapWebhook = onRequest(
  {
    service: "tapwebhook",
    region: "us-central1",
    memory: "512MiB",
    timeoutSeconds: 120,
    vpcConnector:
      "projects/ieta-uk-platform/locations/us-central1/connectors/sendgrid-connector",
    secrets: Object.values(definedSecrets),
  },
  async (req, res) => {
    const { db } = require("./utils/firebase");
    const secrets = await getSecrets();
    try {
      const event = req.body;
      console.log("TAP WEBHOOK EVENT:", JSON.stringify(event, null, 2));

      const charge = event.charge || event;
      const status = charge.status;
      const metadata = charge.metadata || {};

      // ✅ SANITIZE METADATA BEFORE USING
      let refNumber = metadata.ref_number || null;
      let passportNumber = metadata.passport_number || null;
      let clientName = metadata.client_name || null;
      let email = charge.customer?.email?.toLowerCase().trim() || null;

      // Check for malicious content
      if (clientName && isMalicious(clientName)) {
        console.error("🚨 MALICIOUS CONTENT DETECTED in clientName:", clientName);
        return res.status(400).json({
          success: false,
          message: "Invalid input detected",
        });
      }

      if (refNumber && isMalicious(refNumber)) {
        console.error("🚨 MALICIOUS CONTENT DETECTED in refNumber:", refNumber);
        return res.status(400).json({
          success: false,
          message: "Invalid input detected",
        });
      }

      // Sanitize values before storage
      refNumber = sanitizeInput(refNumber);
      passportNumber = sanitizeInput(passportNumber);
      clientName = sanitizeInput(clientName);
      email = sanitizeInput(email);

      // Friendly simplified status
      let friendlyStatus = "Pending";
      if (["CAPTURED", "SUCCESS"].includes(status)) {
        friendlyStatus = "Paid";
      } else if (["FAILED", "DECLINED", "VOID", "CANCELLED"].includes(status)) {
        friendlyStatus = "Failed";
      }
      
      // ✅ STORE SANITIZED DATA
      await db.collection("payments").doc(charge.id).set({
        tapId: charge.id,
        status,
        friendlyStatus,
        amount: charge.amount,
        currency: charge.currency,
        customer: email,
        refNumber,
        passportNumber,
        clientName,
        createdAt: new Date(),
      });

      // ---- IF PAID ----
      if (friendlyStatus === "Paid") {

        const applicationsRef = db.collection("applications");

        const appSnap = await applicationsRef
          .where("applicationId", "==", refNumber)
          .limit(1)
          .get();

        if (!appSnap.empty) {
          await appSnap.docs[0].ref.update({
            paymentStatus: "completed",
            updatedAt: new Date(),
          });

          console.log("Application updated to completed");
        } else {
          console.log("No application found for", refNumber);
        }

        const travellersRef = db.collection("travellers");
        const snap = await travellersRef
          .where("applicationId", "==", refNumber)
          .get();

        if (snap.empty) {
          console.log("No travellers found for this application.");
          return res.status(200).send("No travellers found.");
        }

        const batchTraveller = db.batch();

        for (const doc of snap.docs) {
          const travellerRef = doc.ref;
          const traveller = doc.data();

          // update normal fields only
          batchTraveller.update(travellerRef, {
            status: "in_process",
            updatedAt: new Date(),
          });

          // now update the array field separately
          batchTraveller.update(travellerRef, {
            statusHistory: Firestore.FieldValue.arrayUnion({
              status: "in_process",
              note: "Status updated to in_process",
              timestamp: new Date(),
            }),
          });

          const travellerEmail = traveller.email?.toLowerCase().trim();
          console.log(refNumber, traveller.passportNumber, "->", travellerEmail);
          if (travellerEmail) {
            await sendSGMail({
              to: travellerEmail,
              applicationId: refNumber,
              travellerId: traveller.passportNumber || null,
              templateId: "d-2542a7468435433e923c33950511c512",
              dynamicTemplateData: {
                application_id: refNumber,
                passport_number: traveller.passportNumber || "N/A",
                client_name: traveller.fullName || "Traveller",
                current_status: "in_process",
              },
            });

            console.log("In-process email sent to:", travellerEmail);
          } else {
            console.log("Skipping in-process email, no traveller email for", traveller.passportNumber);
          }
        }


        await batchTraveller.commit();
        console.log("Traveller statuses updated to in_process");


        const batch1 = db.batch();
        snap.forEach(doc => batch1.update(doc.ref, { sendEmail: true }));
        await batch1.commit();

        // 2) SEND EMAIL TO ALL TRAVELLERS
        for (const doc of snap.docs) {
          const traveller = doc.data();

          await sendSGMail({
            to: traveller.email.toLowerCase().trim(),
            applicationId: refNumber,
            travellerId: traveller.passportNumber || null,
            templateId: "d-9c7f8645622c417fab9208c710cf878f",
            dynamicTemplateData: {
              ref_number: refNumber,
              passport_number: traveller.passportNumber || "N/A",
              client_name: traveller.fullName || "Traveller",
              amount: charge.amount,
              currency: charge.currency,
              payment_status: friendlyStatus,
            },
          });

          console.log("Email sent to:", traveller.email);
        }

        const batch2 = db.batch();
        snap.forEach(doc => batch2.update(doc.ref, { sendEmail: false }));
        await batch2.commit();

        console.log("sendEmail flags reset");
        await safeSyncApplicationToAlgolia(refNumber, "tapWebhook");
      }

      return res.status(200).send("Tap Webhook processed");
    } catch (error) {
      console.error("❌ TAP WEBHOOK ERROR:", error);
      return res.status(500).send("Tap Webhook error");
    }
  }
);
