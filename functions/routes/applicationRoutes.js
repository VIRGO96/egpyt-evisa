const express = require("express");
const router = express.Router();
const { formLimiter, authLimiter } = require("../middleware/rateLimiter");
const {
  createApplication,
  updateApplication,
  getApplication,
} = require("../controllers/applicationController");
const {
  sendEmailVerificationCode,
  verifyEmailCode,
} = require("../controllers/emailVerificationController");

// Create new application
router.post("/create", createApplication);

// Update existing application
router.put("/update/:applicationId", updateApplication);

// Send 6-digit verification code to email
router.post("/send-email-verification", formLimiter, sendEmailVerificationCode);

// Verify 6-digit code against email
router.post("/verify-email-code", authLimiter, verifyEmailCode);

// Get application by ID
router.get("/:applicationId", getApplication);

module.exports = router;
