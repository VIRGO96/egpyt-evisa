const axios = require("axios");
const { getSecrets } = require("../utils/secrets");
const { sanitizeObject, isMalicious } = require("../utils/sanitize");


exports.createCharge = async (req, res) => {
  const secrets = await getSecrets();
  try {
    const { totalTravellers, customer, metadata, token, description } = req.body;
    const totalTravellersNum = Number(totalTravellers);

    if (isNaN(totalTravellersNum)) {
      return res.status(400).json({
        success: false,
        message: "totalTravellers must be a valid number",
      });
    }

    if (totalTravellersNum <= 0 || totalTravellersNum >= 100) {
      return res.status(400).json({
        success: false,
        message: "Kindly provide a valid number of travellers",
      });
    }
    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer field is required",
      });
    }

    // 🔒 SANITIZE METADATA - CRITICAL SECURITY
    let sanitizedMetadata = {};
    if (metadata) {
      // Check for malicious content
      const metadataString = JSON.stringify(metadata);
      if (isMalicious(metadataString)) {
        console.error("🚨 MALICIOUS METADATA DETECTED:", metadata);
        return res.status(400).json({
          success: false,
          message: "Invalid input detected in metadata",
        });
      }
      // Sanitize all metadata fields
      sanitizedMetadata = sanitizeObject(metadata, { recursive: true });
      console.log("✅ Metadata sanitized:", sanitizedMetadata);
    }

    const amountPerTraveller = 72;
    const amount = totalTravellersNum * amountPerTraveller;
    const payload = {
      amount,
      currency: "GBP",
      customer_initiated: true,
      threeDSecure: true,
      save_card: false,
      customer,
      source: {
        id: token || "src_card",
      },
      post: {
        url: `https://tapwebhook-ulcsaxetia-uc.a.run.app`,
      },
      redirect: {
        url: secrets.TAP_REDIRECT_URL,
      },
      metadata: sanitizedMetadata,
      description: description || "UK ETA Application Fee",
    };
    // Send charge creation request to Tap API
    const chargeRes = await axios.post(
      "https://api.tap.company/v2/charges",
      payload,
      {
        headers: {
          Authorization: `Bearer ${secrets.TAP_SECRET_KEY_LIVE}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return Tap payment redirect URL
    return res.status(200).json({
      success: true,
      data: {
        redirect_url: chargeRes.data.transaction?.url || null,
        charge_id: chargeRes.data.id,
        status: chargeRes.data.status,
      },
    });
  } catch (error) {
    console.error("TAP createCharge error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};

exports.verifyChargeStatus = async (req, res) => {
  const secrets = await getSecrets();
  try {
    const { tap_id } = req.params;
    if (!tap_id) {
      return res.status(400).json({ success: false, message: "Missing chargeId" });
    }
    const response = await axios.get(
      `https://api.tap.company/v2/charges/${tap_id}`,
      {
        headers: {
          Authorization: `Bearer ${secrets.TAP_SECRET_KEY_LIVE}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const charge = response.data;

    return res.status(200).json({
      success: true,
      data: {
        status: charge.status,
      }

    });
  } catch (error) {
    console.error("verifyChargeStatus error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};


