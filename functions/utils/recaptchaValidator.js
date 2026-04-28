const axios = require('axios');

/**
 * Validates a reCAPTCHA v3 token server-side
 * 
 * @param {string} token - The reCAPTCHA token from the client
 * @param {string} secretKey - Your reCAPTCHA secret key (from Google reCAPTCHA Admin Console)
 * @param {string} expectedAction - The expected action name (e.g., 'payment')
 * @param {number} scoreThreshold - Minimum score (0-1) to allow action. Default: 0.5
 * @returns {Promise<{valid: boolean, score: number, action: string, error?: string}>}
 */
async function validateRecaptchaToken(
  token,
  secretKey,
  expectedAction = 'payment',
  scoreThreshold = 0.5
) {
  try {
    if (!token) {
      return { valid: false, score: 0, action: null, error: 'No token provided' };
    }

    if (!secretKey) {
      console.warn('⚠️ RECAPTCHA_SECRET_KEY not configured');
      return { valid: false, score: 0, action: null, error: 'reCAPTCHA not configured' };
    }

    // Call Google's verification endpoint
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
      }
    );

    const { success, score, action, challenge_ts, hostname, error_codes } = response.data;

    console.log(`reCAPTCHA validation - Success: ${success}, Score: ${score}, Action: ${action}`);

    // Token validation failed
    if (!success) {
      const errorReason = error_codes ? error_codes.join(', ') : 'Unknown error';
      return {
        valid: false,
        score: 0,
        action: action || null,
        error: `reCAPTCHA validation failed: ${errorReason}`,
      };
    }

    // Check if action matches expected action
    if (action !== expectedAction) {
      return {
        valid: false,
        score,
        action,
        error: `Action mismatch. Expected: ${expectedAction}, Got: ${action}`,
      };
    }

    // Check score threshold (v3 returns 0-1 score)
    if (score < scoreThreshold) {
      return {
        valid: false,
        score,
        action,
        error: `Score too low. Expected >= ${scoreThreshold}, Got: ${score}`,
      };
    }

    // All checks passed
    return {
      valid: true,
      score,
      action,
      timestamp: challenge_ts,
      hostname,
    };
  } catch (error) {
    console.error('❌ reCAPTCHA validation error:', error.message);
    return {
      valid: false,
      score: 0,
      action: null,
      error: `Validation error: ${error.message}`,
    };
  }
}

module.exports = {
  validateRecaptchaToken,
};
