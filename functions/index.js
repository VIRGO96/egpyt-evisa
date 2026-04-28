const { defineSecret } = require("firebase-functions/params");

// Define secrets as environment variables
const recaptchaSecretKey = defineSecret("RECAPTCHA_SECRET_KEY");

// Export Cloud Functions
// exports.oneWebhook = require("./oneWebhook").oneWebhook;
exports.tapWebhook = require("./tapWebhook").tapWebhook;
exports.onTravellerStatusChange = require("./travellerStatusChange").onTravellerStatusChange;

// Export Express app (secrets are managed in expressApp.js)
exports.app = require("./expressApp").app;
