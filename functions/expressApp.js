const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { secrets: definedSecrets } = require("./utils/secrets");
const paymentRoutes = require("./routes/paymentRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { handleSendGridEvents } = require("./controllers/webhookController");

const { verifyAdminToken } = require("./middleware/adminAuth");
const {
  validateAndSanitize,
  securityLogger,
  cspHeaders,
  validateContentType,
  detectSuspiciousActivity,
  inputValidationErrorHandler,
} = require("./middleware/inputValidator");
const {
  generalLimiter,
  paymentLimiter,
} = require("./middleware/rateLimiter");
const { frontendEndpoint } = require("./middleware/apiSecurity");
const { decryptRequestBody } = require("./utils/encryption");

const app = express();

// Enable trust proxy for Firebase Cloud Functions
// This is required because Cloud Functions runs behind Google Cloud Platform's proxy
app.set('trust proxy', true);

// ===== Security Middleware (Apply FIRST) =====
app.use(securityLogger);                    // Log all requests
app.use(cspHeaders);                        // Content Security Policy headers
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(validateContentType);               // Validate Content-Type header

// Webhooks (Bypass strict input validation, signature verification is handled in controller)
app.post("/webhooks/sendgrid/events", handleSendGridEvents);

app.use(detectSuspiciousActivity);          // Detect XSS/SQL injection patterns
app.use(validateAndSanitize);               // Sanitize all inputs
app.use(generalLimiter);                    // Rate limiting for all endpoints

// ===== Routes =====
app.get("/health", (req, res) => res.send("ok"));
app.use("/api/v1/payment", paymentLimiter, paymentRoutes); // Strict rate limit for payments
app.use("/api/v1/application", frontendEndpoint, applicationRoutes); // Application routes with frontend-safe security
app.use("/api/v1/admin", verifyAdminToken, adminRoutes); // Admin routes with Firebase Auth verification

// ===== Error Handling =====
app.use(inputValidationErrorHandler);       // Handle validation errors

exports.app = onRequest(
  {
    region: "us-central1",
    memory: "512MiB",
    timeoutSeconds: 120,
    vpcConnector:
      "projects/ieta-uk-platform/locations/us-central1/connectors/sendgrid-connector",
    vpcConnectorEgressSettings: "ALL_TRAFFIC",
    secrets: Object.values(definedSecrets),
  },
  app
);
