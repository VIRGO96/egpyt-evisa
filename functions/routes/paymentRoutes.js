// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const { recaptchaMiddleware } = require("../middleware/recaptchaMiddleware");
const {
  createCharge,
  verifyChargeStatus,
  // oneWebhook
} = require("../controllers/paymentController");

// Create payment charge with reCAPTCHA v3 validation
// Middleware validates token with action='payment' and minimum score 0.5
router.post("/charge", recaptchaMiddleware('payment', 0.5), createCharge);

// Webhook for payment status
// router.post("/webhook", oneWebhook);

//Verify Charge Status
// router.get("/payment-status/:applicationId", verifyChargeStatus);
router.get("/payment-status/:tap_id", verifyChargeStatus);
module.exports = router;
