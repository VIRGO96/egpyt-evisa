const {
  sanitizeObject,
  isMalicious,
  validateFormData,
} = require("../utils/sanitize");
const { safeSyncApplicationToAlgolia } = require("../utils/algolia");

/**
 * Generate unique application ID
 */
function generateApplicationId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `UK-ETA-${timestamp}-${random}`.toUpperCase();
}

/**
 * Create new application with travellers
 * POST /api/v1/application/create
 */
exports.createApplication = async (req, res) => {
  const { db } = require("../utils/firebase");
  
  try {
    const { visaType, travellers } = req.body;

    // ✅ VALIDATION
    if (!visaType || !travellers || !Array.isArray(travellers)) {
      return res.status(400).json({
        success: false,
        message: "visaType and travellers array are required",
      });
    }

    if (travellers.length === 0 || travellers.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Number of travellers must be between 1 and 50",
      });
    }

    // ✅ SECURITY: Check for malicious content in entire payload
    const payloadString = JSON.stringify(req.body);
    if (isMalicious(payloadString)) {
      console.error("🚨 MALICIOUS CONTENT DETECTED in application submission");
      return res.status(400).json({
        success: false,
        message: "Invalid input detected in application data",
      });
    }

    // ✅ GENERATE APPLICATION ID
    const applicationId = generateApplicationId();

    // ✅ SANITIZE INPUT
    const sanitizedVisaType = sanitizeObject({ visaType }).visaType;
    const sanitizedTravellers = travellers.map((t) => sanitizeObject(t));

    // ✅ VALIDATE FIRST TRAVELLER (PRIMARY CONTACT)
    const primaryTraveller = sanitizedTravellers[0];
    try {
      validateFormData({
        email: primaryTraveller.email,
        phone: primaryTraveller.phoneNumber,
        name: primaryTraveller.fullName, // Map fullName to name for validator
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error?.message || "Invalid input detected",
      });
    }

    // ✅ CREATE APPLICATION DOCUMENT
    const applicationDoc = {
      applicationId,
      visaType: sanitizedVisaType,
      totalTravellers: sanitizedTravellers.length,
      createdAt: new Date(),
      updatedAt: new Date(),
      primaryEmail: primaryTraveller.email?.toLowerCase().trim(),
      primaryPhone: primaryTraveller.phoneNumber,
      paymentStatus: "pending",
      paymentAmount: sanitizedTravellers.length * 72,
      paymentCurrency: "GBP",
    };

    // ✅ WRITE TO FIRESTORE (Server-side only)
    await db.collection("applications").add(applicationDoc);
    console.log("✅ Application created:", applicationId);

    // ✅ CREATE TRAVELLER DOCUMENTS
    for (let i = 0; i < sanitizedTravellers.length; i++) {
      const traveller = sanitizedTravellers[i];

      // Remove File objects but keep URL strings
      if (traveller.passportPhoto && typeof traveller.passportPhoto === 'object' && traveller.passportPhoto.constructor && traveller.passportPhoto.constructor.name === 'File') {
        delete traveller.passportPhoto;
      }
      if (traveller.personalPhoto && typeof traveller.personalPhoto === 'object' && traveller.personalPhoto.constructor && traveller.personalPhoto.constructor.name === 'File') {
        delete traveller.personalPhoto;
      }
      if (traveller.parentPassportPhoto && typeof traveller.parentPassportPhoto === 'object' && traveller.parentPassportPhoto.constructor && traveller.parentPassportPhoto.constructor.name === 'File') {
        delete traveller.parentPassportPhoto;
      }

      const travellerDoc = {
        ...traveller,
        applicationId,
        travellerIndex: i,
        status: "pending",
        statusHistory: [
          {
            status: "pending",
            timestamp: new Date(),
            note: "Application created",
          },
        ],
        sendEmail: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.collection("travellers").add(travellerDoc);
      console.log(`✅ Traveller ${i + 1} saved for ${applicationId}`);
    }

    await safeSyncApplicationToAlgolia(applicationId, "createApplication");

    // ✅ SUCCESS RESPONSE
    return res.status(201).json({
      success: true,
      data: {
        applicationId,
        totalTravellers: sanitizedTravellers.length,
        paymentAmount: sanitizedTravellers.length * 72,
        paymentCurrency: "GBP",
      },
    });
  } catch (error) {
    console.error("❌ Error creating application:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create application",
      error: error.message,
    });
  }
};

/**
 * Update existing application
 * PUT /api/v1/application/update/:applicationId
 */
exports.updateApplication = async (req, res) => {
  const { db } = require("../utils/firebase");
  
  try {
    const { applicationId } = req.params;
    const { travellers } = req.body;

    if (!applicationId) {
      return res.status(400).json({
        success: false,
        message: "applicationId is required",
      });
    }

    if (!travellers || !Array.isArray(travellers) || travellers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "travellers array is required",
      });
    }

    // ✅ SECURITY CHECK
    const payloadString = JSON.stringify(req.body);
    if (isMalicious(payloadString)) {
      console.error("🚨 MALICIOUS CONTENT DETECTED in application update");
      return res.status(400).json({
        success: false,
        message: "Invalid input detected",
      });
    }

    // ✅ FIND APPLICATION
    const appQuery = await db
      .collection("applications")
      .where("applicationId", "==", applicationId)
      .limit(1)
      .get();

    if (appQuery.empty) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const appRef = appQuery.docs[0].ref;

    // ✅ SANITIZE TRAVELLERS
    const sanitizedTravellers = travellers.map((t) => sanitizeObject(t));

    // ✅ UPDATE APPLICATION
    await appRef.update({
      totalTravellers: sanitizedTravellers.length,
      updatedAt: new Date(),
      primaryEmail: sanitizedTravellers[0]?.email?.toLowerCase().trim(),
      primaryPhone: sanitizedTravellers[0]?.phoneNumber,
      paymentAmount: sanitizedTravellers.length * 72,
    });

    // ✅ UPDATE TRAVELLERS
    for (let i = 0; i < sanitizedTravellers.length; i++) {
      const traveller = sanitizedTravellers[i];
      
      // Remove File objects but keep URL strings
      if (traveller.passportPhoto && typeof traveller.passportPhoto === 'object') {
        delete traveller.passportPhoto;
      }
      if (traveller.personalPhoto && typeof traveller.personalPhoto === 'object') {
        delete traveller.personalPhoto;
      }
      if (traveller.parentPassportPhoto && typeof traveller.parentPassportPhoto === 'object') {
        delete traveller.parentPassportPhoto;
      }

      // Check if traveller exists
      const travellerQuery = await db
        .collection("travellers")
        .where("applicationId", "==", applicationId)
        .where("travellerIndex", "==", i)
        .limit(1)
        .get();

      const travellerData = {
        ...traveller,
        applicationId,
        travellerIndex: i,
        updatedAt: new Date(),
      };

      if (!travellerQuery.empty) {
        // Update existing
        await travellerQuery.docs[0].ref.update(travellerData);
      } else {
        // Create new
        travellerData.status = "pending";
        travellerData.sendEmail = false;
        travellerData.createdAt = new Date();
        travellerData.statusHistory = [
          {
            status: "pending",
            timestamp: new Date(),
            note: "Traveller added",
          },
        ];
        await db.collection("travellers").add(travellerData);
      }
    }

    await safeSyncApplicationToAlgolia(applicationId, "updateApplication");

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
    });
  } catch (error) {
    console.error("❌ Error updating application:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update application",
    });
  }
};

/**
 * Get application by ID
 * GET /api/v1/application/:applicationId
 */
exports.getApplication = async (req, res) => {
  const { db } = require("../utils/firebase");
  
  try {
    const { applicationId } = req.params;

    const appQuery = await db
      .collection("applications")
      .where("applicationId", "==", applicationId)
      .limit(1)
      .get();

    if (appQuery.empty) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const appData = appQuery.docs[0].data();

    // Get travellers
    const travellersQuery = await db
      .collection("travellers")
      .where("applicationId", "==", applicationId)
      .orderBy("travellerIndex")
      .get();

    const travellers = travellersQuery.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      success: true,
      data: {
        application: {
          id: appQuery.docs[0].id,
          ...appData,
        },
        travellers,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching application:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};
