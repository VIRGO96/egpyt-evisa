const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getApplications,
  searchApplications,
  getApplicationById,
  getRecentApplications,
  updateApplicationStatus,
  updateTravellerField,
  getStats,
  getEmailLogs,
  getEmailLogById,
} = require("../controllers/adminController");

// User routes
router.get("/users/:userId", getUserProfile);

// Application routes
router.get("/applications", getApplications);
router.get("/applications/recent", getRecentApplications);
router.get("/applications/search", searchApplications);
router.get("/applications/:applicationId", getApplicationById);
router.put("/applications/status", updateApplicationStatus);

// Traveller routes
router.patch("/travellers/:docId", updateTravellerField);

// Stats routes
router.get("/stats", getStats);

// Email Log routes
router.get("/email-logs", getEmailLogs);
router.get("/email-logs/:id", getEmailLogById);

module.exports = router;
