const sgMail = require("@sendgrid/mail");
const { getSecrets } = require("./secrets");

let apiKey;

const setupSendGrid = async () => {
  if (!apiKey) {
    const secrets = await getSecrets(); 
    apiKey = secrets.SENDGRID_API_KEY;

    if (!apiKey) {
      throw new Error("SENDGRID_API_KEY not found in secrets");
    }

    sgMail.setApiKey(apiKey);
  }
};

const sendSGMail = async (data) => {
  const { db } = require("./firebase");
  try {
    await setupSendGrid();

    // Generate a tracking ID
    const logRef = db.collection("email_logs").doc();
    const trackingId = logRef.id;

    const fromEmail = "noreply@ukevisa.com";
    const fromName = "UK electronic travel authorization (ETA)";

    const msg = {
      to: data.to,
      from: {
        email: fromEmail,
        name: fromName,
      },
      cc: {
        email: fromEmail,
      },
      subject: data.subject || "UK electronic travel authorization (ETA) Update",
      templateId: data.templateId,
      dynamicTemplateData: data.dynamicTemplateData,
      custom_args: {
        trackingId: trackingId,
      },
    };

    // Store initial log in Firestore
    await logRef.set({
      trackingId,
      applicationId: data.applicationId || null,
      travellerId: data.travellerId || null,
      to: data.to,
      from: fromEmail,
      subject: msg.subject,
      templateId: data.templateId,
      status: "sent",
      createdAt: new Date(),
      eventHistory: [],
    });

    const [response] = await sgMail.send(msg);
    
    // Update log with SendGrid Message ID if available
    const sgMessageId = response?.headers?.["x-message-id"];
    if (sgMessageId) {
      await logRef.update({ sgMessageId: sgMessageId });
    }

    return response;
  } catch (err) {
    console.error("Error sending email", err.response?.body || err.message);
    return null;
  }
};

module.exports = sendSGMail;
