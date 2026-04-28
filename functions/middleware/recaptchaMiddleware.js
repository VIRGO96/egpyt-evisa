const { validateRecaptchaToken } = require('../utils/recaptchaValidator');
const { getSecrets } = require('../utils/secrets');

/**
 * Express middleware to validate reCAPTCHA tokens before processing requests
 * Extracts token from:
 * - req.body.recaptchaToken
 * - req.headers['x-recaptcha-token']
 * 
 * @param {string} expectedAction - Expected action name for token validation
 * @param {number} scoreThreshold - Minimum reCAPTCHA score (0-1)
 */
function recaptchaMiddleware(expectedAction = 'payment', scoreThreshold = 0.5) {
  return async (req, res, next) => {
    try {
      // Extract token from body or headers
      const token = req.body.recaptchaToken || req.headers['x-recaptcha-token'];

      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'reCAPTCHA token is required',
        });
      }

      // Get Classic v3 secret key from Firebase secrets
      const secrets = await getSecrets();
      const secretKey = secrets.RECAPTCHA_SECRET_KEY;

      if (!secretKey) {
        console.warn('⚠️ RECAPTCHA_SECRET_KEY not configured in Firebase secrets');
        return res.status(500).json({
          success: false,
          message: 'Server configuration error: reCAPTCHA v3 not configured',
        });
      }

      // Validate the token via Classic v3 siteverify
      const validation = await validateRecaptchaToken(
        token,
        secretKey,
        expectedAction,
        scoreThreshold
      );

      if (!validation.valid) {
        console.warn(`⚠️ reCAPTCHA validation failed: ${validation.error}`);
        return res.status(403).json({
          success: false,
          message: 'reCAPTCHA validation failed',
          reason: validation.error,
        });
      }

      // Attach validation result to request for downstream handlers
      req.recaptcha = {
        valid: true,
        score: validation.score,
        action: validation.action,
        timestamp: validation.timestamp,
      };

      console.log(`✅ reCAPTCHA validation passed - Score: ${validation.score}`);
      next();
    } catch (error) {
      console.error('❌ reCAPTCHA middleware error:', error.message);
      return res.status(500).json({
        success: false,
        message: 'reCAPTCHA validation error',
        error: error.message,
      });
    }
  };
}

module.exports = {
  recaptchaMiddleware,
};
