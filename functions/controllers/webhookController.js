const { db } = require("../utils/firebase");
const { getSecrets } = require("../utils/secrets");
const EventWebhook = require("@sendgrid/eventwebhook").EventWebhook;
// const crypto = require("crypto");

const toCamelCase = (str) => {
  return str.replace(/([-_][a-z0-9])/ig, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const convertKeysToCamelCase = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(convertKeysToCamelCase);
  
  const n = {};
  for (const key of Object.keys(obj)) {
    n[toCamelCase(key)] = convertKeysToCamelCase(obj[key]);
  }
  return n;
};

/**
 * Handle SendGrid Event Webhook
 * POST /webhooks/sendgrid/events
 */
exports.handleSendGridEvents = async (req, res) => {
  try {
    const secrets = await getSecrets();
    const publicKey = secrets.SENDGRID_VERIFICATION_KEY;
    
    if (!publicKey) {
      console.error("SENDGRID_VERIFICATION_KEY not found in secrets");
      return res.status(500).send("Configuration error");
    }

    // Verify SendGrid Signature
    const signature = req.headers["x-twilio-email-event-webhook-signature"];
    const timestamp = req.headers["x-twilio-email-event-webhook-timestamp"];
    
    // Ensure payload is the raw body string for verification
    const payload = req.rawBody ? req.rawBody.toString("utf8") : JSON.stringify(req.body);

    let isValid = false;
    try {
      //   isValid = crypto.verify(
      //   "sha256",
      //   Buffer.from(timestamp + payload),
      //   {
      //     key: Buffer.from(publicKey.trim(), "base64"),
      //     format: "der",
      //     type: "spki",
      //   },
      //   Buffer.from(signature, "base64")
      // );
      const ew = new EventWebhook();
      const ecdsaPublicKey = ew.convertPublicKeyToECDSA(publicKey.trim());
      isValid = ew.verifySignature(ecdsaPublicKey, payload, signature, timestamp);
    } catch (verifyError) {
      console.error("Signature verification error:", verifyError.message);
      return res.status(400).send("Invalid signature format");
    }

    if (!isValid) {
      console.warn("Invalid SendGrid signature received");
      return res.status(403).send("Unauthorized");
    }

    const events = req.body;
    if (!Array.isArray(events)) {
      return res.status(400).send("Invalid payload");
    }

    console.log(`Processing ${events.length} SendGrid events`);

    for (const event of events) {
      const camelCaseEvent = convertKeysToCamelCase(event);
      const trackingId = camelCaseEvent.trackingId; // Custom arg we added
      if (!trackingId) {
        console.warn("Event missing trackingId, skipping", camelCaseEvent.sgMessageId);
        continue;
      }

      const logRef = db.collection("email_logs").doc(trackingId);
      const updateData = {
        status: camelCaseEvent.event,
        updatedAt: new Date(),
        // Add to event history array
        eventHistory: require("firebase-admin").firestore.FieldValue.arrayUnion({
          ...camelCaseEvent,
          receivedAt: new Date()
        })
      };

      // Extract specific status times as requested
      if (camelCaseEvent.event === "processed") {
        updateData.processedAt = new Date(camelCaseEvent.timestamp * 1000);
      } else if (camelCaseEvent.event === "delivered") {
        updateData.deliveredAt = new Date(camelCaseEvent.timestamp * 1000);
      }

      await logRef.update(updateData).catch(err => {
        console.error(`Error updating email log ${trackingId}:`, err.message);
      });
    }

    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in SendGrid webhook handler:", error);
    return res.status(500).send("Internal Server Error");
  }
};
