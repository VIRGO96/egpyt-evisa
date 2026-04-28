const { db } = require("../utils/firebase");
const {
  safeSyncApplicationToAlgolia,
  searchApplicationRecords,
} = require("../utils/algolia");

/**
 * Get user profile by user ID
 * GET /api/v1/admin/users/:userId
 */
exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userData = userDoc.data();

    return res.status(200).json({
      id: userDoc.id,
      email: userData.email,
      name: userData.name,
      displayName: userData.displayName,
      role: userData.role,
      isActive: userData.isActive,
    });
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
    });
  }
};

/**
 * Get paginated list of applications with optional status filter
 * GET /api/v1/admin/applications
 * Query params: status, limit, page
 */
exports.getApplications = async (req, res) => {
  try {
    const { status, limit = 10, page = 0 } = req.query;
    const limitCount = parseInt(limit);
    const pageNum = parseInt(page);

    let applicationsQuery = db.collection("applications");

    // Apply status filter if provided
    if (status && status !== "all") {
      applicationsQuery = applicationsQuery.where("status", "==", status);
    }

    // Order by creation date
    applicationsQuery = applicationsQuery.orderBy("createdAt", "desc");

    // Apply pagination
    if (pageNum > 0) {
      const offset = pageNum * limitCount;
      applicationsQuery = applicationsQuery.offset(offset);
    }

    applicationsQuery = applicationsQuery.limit(limitCount);

    // Execute query
    const snapshot = await applicationsQuery.get();
    
    const applications = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const appData = doc.data();
        
        // Get travellers for this application
        const travellersQuery = await db
          .collection("travellers")
          .where("applicationId", "==", appData.applicationId)
          .orderBy("travellerIndex")
          .get();

        const travellers = travellersQuery.docs.map((tDoc) => ({
          id: tDoc.id,
          ...tDoc.data(),
        }));

        return {
          id: doc.id,
          ...appData,
          travellers,
        };
      })
    );

    // Get total count for pagination
    let countQuery = db.collection("applications");
    if (status && status !== "all") {
      countQuery = countQuery.where("status", "==", status);
    }
    const countSnapshot = await countQuery.count().get();
    const totalCount = countSnapshot.data().count;

    return res.status(200).json({
      data: applications,
      totalCount,
      lastVisible: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null,
    });
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};

/**
 * Search applications via Algolia
 * GET /api/v1/admin/applications/search
 * Query params: q, status, page, limit
 */
exports.searchApplications = async (req, res) => {
  try {
    const { q = "", status = "all", page = 1, limit = 10 } = req.query;
    const normalizedQuery =
      typeof q === "string" && q.trim().toLowerCase() === "all" ? "" : q;
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitCount = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

    const result = await searchApplicationRecords({
      query: normalizedQuery,
      status,
      page: pageNum - 1,
      limit: limitCount,
    });

    const data = (result.hits || []).map((hit) => ({
      applicationId: hit.applicationId,
      amount: hit.amount || 0,
      currency: hit.currency || "GBP",
      createdAt: hit.createdAt || null,
      updatedAt: hit.updatedAt || null,
      paymentStatus: hit.paymentStatus || "",
      applicants: Array.isArray(hit.applicants) ? hit.applicants : [],
    }));

    return res.status(200).json({
      data,
      totalCount: result.nbHits || 0,
      page: pageNum,
      limit: limitCount,
      totalPages: Math.ceil((result.nbHits || 0) / limitCount),
    });
  } catch (error) {
    console.error("❌ Error searching applications:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search applications",
      error: error.message,
    });
  }
};

/**
 * Get single application by application ID with travellers
 * GET /api/v1/admin/applications/:applicationId
 */
exports.getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;

    // Find application
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

    const appDoc = appQuery.docs[0];
    const appData = appDoc.data();

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
      id: appDoc.id,
      ...appData,
      travellers,
    });
  } catch (error) {
    console.error("❌ Error fetching application:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};

/**
 * Get recent applications
 * GET /api/v1/admin/applications/recent
 * Query params: limit (default 5)
 */
exports.getRecentApplications = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const limitCount = parseInt(limit);

    const snapshot = await db
      .collection("applications")
      .orderBy("createdAt", "desc")
      .limit(limitCount)
      .get();

    const applications = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const appData = doc.data();

        // Get first traveller (primary contact)
        const travellerQuery = await db
          .collection("travellers")
          .where("applicationId", "==", appData.applicationId)
          .where("travellerIndex", "==", 0)
          .limit(1)
          .get();

        const traveller = travellerQuery.empty
          ? null
          : travellerQuery.docs[0].data();

        return {
          id: doc.id,
          ...appData,
          traveller,
        };
      })
    );

    return res.status(200).json(applications);
  } catch (error) {
    console.error("❌ Error fetching recent applications:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent applications",
    });
  }
};

/**
 * Update application status (updates traveller document)
 * PUT /api/v1/admin/applications/status
 */
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { docId, status, comment, expiryDate, sendEmail } = req.body;

    if (!docId || !status) {
      return res.status(400).json({
        success: false,
        message: "docId and status are required",
      });
    }

    const travellerRef = db.collection("travellers").doc(docId);
    const travellerDoc = await travellerRef.get();

    if (!travellerDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Traveller document not found",
      });
    }

    // Create status history entry
    const historyEntry = {
      note: comment || `Status updated to ${status}`,
      status: status,
      timestamp: new Date(),
      expiryDate: expiryDate || null,
    };

    // Prepare update data
    const updateData = {
      status,
      updatedAt: new Date(),
      statusHistory: db.FieldValue.arrayUnion(historyEntry),
    };

    if (comment) {
      updateData.statusComment = comment;
    }

    if (typeof sendEmail === "boolean") {
      updateData.sendEmail = sendEmail;
    }

    // Update the traveller document
    await travellerRef.update(updateData);
    await safeSyncApplicationToAlgolia(
      travellerDoc.data().applicationId,
      "updateApplicationStatus"
    );

    console.log(`✅ Traveller status updated: ${docId} -> ${status}`);

    return res.status(200).json({
      success: true,
      docId,
      status,
      updatedAt: updateData.updatedAt,
    });
  } catch (error) {
    console.error("❌ Error updating application status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};

/**
 * Update a specific field in a traveller document
 * PATCH /api/v1/admin/travellers/:docId
 */
exports.updateTravellerField = async (req, res) => {
  try {
    const { docId } = req.params;
    const { field, value } = req.body;

    if (!field || value === undefined) {
      return res.status(400).json({
        success: false,
        message: "field and value are required",
      });
    }

    const travellerRef = db.collection("travellers").doc(docId);
    const travellerDoc = await travellerRef.get();

    if (!travellerDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Traveller document not found",
      });
    }

    // Update the field
    await travellerRef.update({
      [field]: value,
      updatedAt: new Date(),
    });
    await safeSyncApplicationToAlgolia(
      travellerDoc.data().applicationId,
      "updateTravellerField"
    );

    console.log(`✅ Traveller field updated: ${docId}.${field}`);

    return res.status(200).json({
      success: true,
      message: "Traveller updated successfully",
    });
  } catch (error) {
    console.error("❌ Error updating traveller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update traveller",
    });
  }
};

/**
 * Get dashboard statistics
 * GET /api/v1/admin/stats
 */
exports.getStats = async (req, res) => {
  try {
    // Get all applications
    const applicationsSnapshot = await db.collection("applications").get();
    const applications = applicationsSnapshot.docs.map((doc) => doc.data());

    // Get all payments
    const paymentsSnapshot = await db.collection("payments").get();
    const payments = paymentsSnapshot.docs.map((doc) => doc.data());

    // Calculate statistics
    const totalApplications = applications.length;
    
    const pendingApplications = applications.filter(
      (app) => app.status === "pending" || app.paymentStatus === "pending"
    ).length;
    
    const paidApplications = applications.filter(
      (app) => app.paymentStatus === "completed"
    ).length;
    
    const totalRevenue = payments
      .filter((p) => p.status === "CAPTURED" || p.status === "AUTHORIZED")
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    return res.status(200).json({
      totalApplications,
      pendingApplications,
      paidApplications,
      totalRevenue,
    });
  } catch (error) {
    console.error("❌ Error fetching stats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
    });
  }
};
