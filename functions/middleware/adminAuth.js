const { admin } = require("../utils/firebase");

/**
 * Verify Firebase ID Token and check if user is an admin
 * This middleware ensures only authenticated admin users can access admin endpoints
 */
async function verifyAdminToken(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("🚨 Missing or invalid Authorization header");
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing authentication token",
      });
    }

    const idToken = authHeader.split("Bearer ")[1];

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Get user document from Firestore
    const { db } = require("../utils/firebase");
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      console.error("🚨 User document not found:", uid);
      return res.status(403).json({
        success: false,
        message: "Access denied: User profile not found",
      });
    }

    const userData = userDoc.data();

    // Check if user is an admin
    if (userData.role !== "admin") {
      console.error("🚨 Non-admin user attempted to access admin endpoint:", uid);
      return res.status(403).json({
        success: false,
        message: "Access denied: Admin role required",
      });
    }

    // Check if user is active
    if (!userData.isActive) {
      console.error("🚨 Inactive admin user attempted to access admin endpoint:", uid);
      return res.status(403).json({
        success: false,
        message: "Access denied: Account is inactive",
      });
    }

    // Attach user info to request for use in controllers
    req.adminUser = {
      uid,
      email: userData.email,
      name: userData.name,
      role: userData.role,
    };

    console.log("✅ Admin authenticated:", req.adminUser.email);
    next();
  } catch (error) {
    console.error("❌ Error verifying admin token:", error);
    
    if (error.code === "auth/id-token-expired") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token expired",
      });
    }
    
    if (error.code === "auth/argument-error") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication",
    });
  }
}

module.exports = { verifyAdminToken };
