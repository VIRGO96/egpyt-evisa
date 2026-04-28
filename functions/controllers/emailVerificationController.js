const crypto = require("crypto");
const { hash } = require("../utils/encryption");
const sendSGMail = require("../utils/SendSGMail");
const { sanitizeInput, isValidEmail } = require("../utils/sanitize");

const EMAIL_VERIFICATION_COLLECTION = "email_verifications";
const EMAIL_VERIFICATION_EXPIRY_MINUTES = 10;
const RESEND_COOLDOWN_SECONDS = 60;
const MAX_VERIFY_ATTEMPTS = 25;
const EMAIL_VERIFICATION_TEMPLATE_ID = "d-8c77a4db2d354b45a0b9bf09ffbf7bed";

const RESPONSE_CODES = {
  INVALID_REQUEST: "INVALID_REQUEST",
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
  VERIFICATION_REQUEST_ACCEPTED: "VERIFICATION_REQUEST_ACCEPTED",
  VERIFICATION_FAILED: "VERIFICATION_FAILED",
  EMAIL_VERIFIED: "EMAIL_VERIFIED",
  SERVER_ERROR: "SERVER_ERROR",
  SERVER_CONFIG_ERROR: "SERVER_CONFIG_ERROR",
};

function buildVerificationDocId(email) {
  return `email_${hash(email).slice(0, 40)}`;
}

function generateVerificationCode() {
  return crypto.randomInt(0, 1000000).toString().padStart(6, "0");
}

function buildCodeHash(email, code) {
  return hash(`${email}:${code}`);
}

function toDateOrNull(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function timingSafeHexEqual(leftHex, rightHex) {
  if (typeof leftHex !== "string" || typeof rightHex !== "string") return false;

  try {
    const left = Buffer.from(leftHex, "hex");
    const right = Buffer.from(rightHex, "hex");

    if (left.length === 0 || right.length === 0 || left.length !== right.length) {
      return false;
    }

    return crypto.timingSafeEqual(left, right);
  } catch (error) {
    return false;
  }
}

function isVerificationActive(verificationData, now = new Date()) {
  const expiresAt = toDateOrNull(verificationData?.expiresAt);
  return Boolean(expiresAt && expiresAt >= now);
}

function sendAcceptedResponse(res) {
  return res.status(200).json({
    success: true,
    code: RESPONSE_CODES.VERIFICATION_REQUEST_ACCEPTED,
    message: "If the email is eligible, a verification code has been sent.",
    data: {
      cooldownSeconds: RESEND_COOLDOWN_SECONDS,
      expiresInMinutes: EMAIL_VERIFICATION_EXPIRY_MINUTES,
    },
  });
}

function sendVerificationFailedResponse(res, status = 400) {
  return res.status(status).json({
    success: false,
    code: RESPONSE_CODES.VERIFICATION_FAILED,
    message: "Code verification failed.",
  });
}

/**
 * POST /api/v1/application/send-email-verification
 * Body: { email }
 */
exports.sendEmailVerificationCode = async (req, res) => {
  const { db } = require("../utils/firebase");

  try {
    const email = sanitizeInput(String(req.body?.email || ""))
      .toLowerCase()
      .trim();

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        code: RESPONSE_CODES.INVALID_REQUEST,
        message: "Invalid request payload.",
      });
    }

    const templateId = EMAIL_VERIFICATION_TEMPLATE_ID;

    if (!templateId) {
      return res.status(500).json({
        success: false,
        code: RESPONSE_CODES.SERVER_CONFIG_ERROR,
        message: "Verification service is temporarily unavailable.",
      });
    }

    const verificationDocRef = db
      .collection(EMAIL_VERIFICATION_COLLECTION)
      .doc(buildVerificationDocId(email));

    const existingSnapshot = await verificationDocRef.get();
    const existingData = existingSnapshot.exists ? existingSnapshot.data() : null;
    const now = new Date();
    const hasCompletedVerification = existingData?.verified === true;

    if (!hasCompletedVerification) {
      const lastSentAt = toDateOrNull(
        existingData?.lastSentAt || existingData?.updatedAt
      );
      if (lastSentAt) {
        const elapsedSeconds = Math.floor(
          (now.getTime() - lastSentAt.getTime()) / 1000
        );
        if (elapsedSeconds < RESEND_COOLDOWN_SECONDS) {
          return res.status(429).json({
            success: false,
            code: RESPONSE_CODES.TOO_MANY_REQUESTS,
            message: "Please wait before trying again.",
          });
        }
      }
    }

    const verificationCode = generateVerificationCode();
    const codeHash = buildCodeHash(email, verificationCode);
    const expiresAt = new Date(
      now.getTime() + EMAIL_VERIFICATION_EXPIRY_MINUTES * 60 * 1000
    );

    const emailPayload = {
      to: email,
      templateId,
      dynamicTemplateData: {
        verification_code: verificationCode,
        expiry_minutes: EMAIL_VERIFICATION_EXPIRY_MINUTES,
      },
    };

    const sendResult = await sendSGMail(emailPayload);

    if (!sendResult) {
      return res.status(500).json({
        success: false,
        code: RESPONSE_CODES.SERVER_ERROR,
        message: "Verification service is temporarily unavailable.",
      });
    }

    await verificationDocRef.set(
      {
        email,
        codeHash,
        verified: false,
        verifiedAt: null,
        attempts: 0,
        expiresAt,
        lastSentAt: now,
        lastFailedAt: null,
        updatedAt: now,
        createdAt: existingData?.createdAt || now,
      },
      { merge: true }
    );

    return sendAcceptedResponse(res);
  } catch (error) {
    console.error("❌ Error sending verification code:", error);
    return res.status(500).json({
      success: false,
      code: RESPONSE_CODES.SERVER_ERROR,
      message: "Verification service is temporarily unavailable.",
    });
  }
};

/**
 * POST /api/v1/application/verify-email-code
 * Body: { email, code }
 */
exports.verifyEmailCode = async (req, res) => {
  const { db } = require("../utils/firebase");

  try {
    const email = sanitizeInput(String(req.body?.email || ""))
      .toLowerCase()
      .trim();
    const code = sanitizeInput(String(req.body?.code || "")).trim();

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        code: RESPONSE_CODES.INVALID_REQUEST,
        message: "Invalid request payload.",
      });
    }

    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({
        success: false,
        code: RESPONSE_CODES.INVALID_REQUEST,
        message: "Invalid request payload.",
      });
    }

    const verificationDocRef = db
      .collection(EMAIL_VERIFICATION_COLLECTION)
      .doc(buildVerificationDocId(email));

    const verificationSnapshot = await verificationDocRef.get();

    if (!verificationSnapshot.exists) return sendVerificationFailedResponse(res);

    const verificationData = verificationSnapshot.data();
    const now = new Date();
    const verificationActive = isVerificationActive(verificationData, now);

    if (verificationData?.verified) {
      if (verificationActive) {
        return res.status(200).json({
          success: true,
          code: RESPONSE_CODES.EMAIL_VERIFIED,
          message: "Email verified successfully.",
        });
      }

      return sendVerificationFailedResponse(res);
    }

    if (!verificationActive) return sendVerificationFailedResponse(res);

    const attempts = Number.isInteger(verificationData?.attempts)
      ? verificationData.attempts
      : 0;

    if (attempts >= MAX_VERIFY_ATTEMPTS) {
      return sendVerificationFailedResponse(res, 429);
    }

    const incomingCodeHash = buildCodeHash(email, code);
    if (!timingSafeHexEqual(incomingCodeHash, verificationData?.codeHash)) {
      const nextAttempts = attempts + 1;

      await verificationDocRef.update({
        attempts: nextAttempts,
        updatedAt: now,
        lastFailedAt: now,
      });

      return sendVerificationFailedResponse(
        res,
        nextAttempts >= MAX_VERIFY_ATTEMPTS ? 429 : 400
      );
    }

    await verificationDocRef.update({
      verified: true,
      verifiedAt: now,
      updatedAt: now,
      attempts: 0,
      codeHash: null,
    });

    return res.status(200).json({
      success: true,
      code: RESPONSE_CODES.EMAIL_VERIFIED,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("❌ Error verifying email code:", error);
    return res.status(500).json({
      success: false,
      code: RESPONSE_CODES.SERVER_ERROR,
      message: "Verification service is temporarily unavailable.",
    });
  }
};
