const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const sendSGMail = require("./utils/SendSGMail");
const { secrets: definedSecrets } = require("./utils/secrets");
const { safeSyncApplicationToAlgolia } = require("./utils/algolia");

function normalizeStatus(status) {
  if (typeof status !== "string") {
    return "";
  }

  return status.trim().toLowerCase();
}

function getStatusHistory(data) {
  return Array.isArray(data?.statusHistory) ? data.statusHistory : [];
}

exports.onTravellerStatusChange = onDocumentUpdated(
  {
    document: "travellers/{travellerId}",
    region: "us-central1",
    memory: "512MiB",
    timeoutSeconds: 120,
    vpcConnector: "projects/ieta-uk-platform/locations/us-central1/connectors/sendgrid-connector",
    secrets: Object.values(definedSecrets),
  },
  async (event) => {
    const beforeData = event.data.before.data() || {};
    const afterData = event.data.after.data();
    if (!afterData) return null;

    const oldStatus = normalizeStatus(beforeData.status);
    const newStatus = normalizeStatus(afterData.status);
    const travellerId = event.params.travellerId;

    const beforeHistory = getStatusHistory(beforeData);
    const afterHistory = getStatusHistory(afterData);
    const latestHistoryStatus = normalizeStatus(
      afterHistory[afterHistory.length - 1]?.status
    );
    const sameStatusResendRequested =
      oldStatus === newStatus &&
      afterHistory.length > beforeHistory.length &&
      latestHistoryStatus === newStatus;
    const shouldSyncAlgolia =
      oldStatus !== newStatus || sameStatusResendRequested;
    const applicationId = afterData.applicationId;

    if (!newStatus) {
      console.log(`Skipping email for traveller ${travellerId} — no status found`);
      return null;
    }

    // Keep Algolia consistent even when email sending is skipped.
    if (shouldSyncAlgolia && applicationId) {
      await safeSyncApplicationToAlgolia(
        applicationId,
        `travellerStatusChange:${travellerId}`
      );
    }

    if (oldStatus === newStatus && !sameStatusResendRequested) {
      return null;
    }

    if (afterData.sendEmail === false || afterData.sendEmail === "false") {
      console.log(`Skipping email for traveller ${travellerId} — sendEmail=false`);
      return null;
    }

    if (sameStatusResendRequested) {
      console.log(
        `Resending status email for traveller ${travellerId} (status reapplied: ${newStatus})`
      );
    }

    const email = afterData.email;
    if (!email) {
      console.log(`Traveller ${travellerId} has no email.`);
      return null;
    }

    const templateMap = {
      pending: "d-dc862d33fc8d4d89b4358d48bff049e1",
      in_process: "d-2542a7468435433e923c33950511c512",
      approved: "d-2defff76a0ec47e2af6d5d7685843433",
      cancelled: "d-ba8066934ffe4d6f998f47baa0f93eca",
      cancelled_refunded: "d-122c4b35c6ca4e95b721aca34d0b83d9",
      rejected: "d-e8b0362ebbcb429e99b437c2b18b9253",
      clear_passport_required: "d-01b3f5bf1bed4afc8daa97e3bca3b5c1",
      clear_personal_required: "d-e47a948ea161465e9b6a46161ccbcd43",
      passport_not_acceptable: "d-3a734d8eb7f94eba8e2fa81aec95d955",
    };

    const templateId = templateMap[newStatus];
    if (!templateId) {
      console.log(`No email template for status: ${newStatus}`);
      return null;
    }

    // Prepare dynamic data for email
    let dynamicData = {
      client_name: afterData.fullName || "Traveller",
      application_id: applicationId,
      traveller_id: travellerId,
      status: newStatus,
      visa_type: "United Kingdom ETA - 2 years, Multiple entry",
      passport_number: afterData.passportNumber || "N/A",
    };
    const isRefundStatus = ["cancelled_refunded"].includes(newStatus);
    if (isRefundStatus && afterData.paymentAmount && afterData.paymentCurrency) {
      dynamicData.refund_amount = `${afterData.paymentCurrency} ${afterData.paymentAmount}`;
    }

    if (newStatus === "approved") {
      let expiryDate;
      let approvalRef = null;

      if (Array.isArray(afterData.statusHistory)) {
        const approvedEntry = [...afterData.statusHistory]
          .reverse()
          .find((entry) => normalizeStatus(entry.status) === "approved");

        if (approvedEntry) {
          if (approvedEntry.expiryDate && approvedEntry.expiryDate.trim() !== "") {
            const date = new Date(approvedEntry.expiryDate);
            expiryDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          }

          if (approvedEntry.note && approvedEntry.note.trim() !== "") {
            approvalRef = approvedEntry.note;
          }
        }
      }

      if (approvalRef) {
        dynamicData.approval_ref_number = approvalRef;
      }

      if (expiryDate) {
        dynamicData.expiry_date = expiryDate;
      }
    }

    const emailData = {
      to: email,
      applicationId: applicationId,
      travellerId: afterData.passportNumber || null,
      templateId,
      dynamicTemplateData: dynamicData,
    };

    try {
      await sendSGMail(emailData);
      console.log(
        `Email sent to ${email} for traveller ${travellerId} (status: ${newStatus})`
      );
    } catch (err) {
      console.error(`Failed to send email to ${email}:`, err);
    }

    return null;
  }
);
