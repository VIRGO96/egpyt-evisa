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
  try {
    await setupSendGrid();

    const msg = {
      to: data.to,
      from:{
        email: "noreply@ukevisa.com",
        name: "UK electronic travel authorization (ETA)"
      },
      cc: {
        email: "noreply@ukevisa.com",
      },
      templateId: data.templateId,
      dynamicTemplateData: data.dynamicTemplateData,
    };

    const [response] = await sgMail.send(msg);
    return response;
  } catch (err) {
    console.error("Error sending email", err.response?.body || err.message);
    return null;
  }
};

module.exports = sendSGMail;
