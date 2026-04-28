/**
 * Rate limiting middleware to prevent abuse and DoS attacks
 * 
 * Usage:
 * const rateLimiter = require('./rateLimiter');
 * app.use(rateLimiter.generalLimiter);
 * app.post('/api/payment', rateLimiter.paymentLimiter, paymentController);
 */

const rateLimit = require('express-rate-limit');

/**
 * General rate limiter for all API requests
 * Allows 100 requests per 15 minutes per IP
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  skip: (req) => {
    // Don't rate limit health check endpoint
    return req.path === '/health';
  },
  handler: (req, res) => {
    console.warn('⚠️ RATE LIMIT EXCEEDED', {
      ip: req.ip,
      path: req.path,
      method: req.method,
      timestamp: new Date().toISOString(),
    });

    res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
      error: 'RATE_LIMIT_EXCEEDED',
      retryAfter: req.rateLimit.resetTime,
    });
  },
});

/**
 * Strict rate limiter for payment endpoint
 * Allows 10 payment requests per 15 minutes per IP
 * Payment processing should be careful and not allow spam
 */
const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Stricter: max 10 payment requests per 15 minutes
  message: 'Too many payment requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use combination of IP and email for better tracking
    return `${req.ip}-${req.body?.email || 'unknown'}`;
  },
  handler: (req, res) => {
    console.error('🚨 PAYMENT RATE LIMIT EXCEEDED - POSSIBLE ATTACK', {
      ip: req.ip,
      email: req.body?.email,
      method: req.method,
      timestamp: new Date().toISOString(),
    });

    res.status(429).json({
      success: false,
      message: 'Too many payment attempts. Please wait before trying again.',
      error: 'PAYMENT_RATE_LIMIT',
    });
  },
});

/**
 * Authentication endpoint rate limiter
 * Prevents brute force attacks on login/verification
 * Allows 5 attempts per 15 minutes per IP
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Very strict: max 5 auth attempts
  skipSuccessfulRequests: true, // Don't count successful requests
  message: 'Too many failed login attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.error('🚨 AUTH RATE LIMIT EXCEEDED - POSSIBLE BRUTE FORCE', {
      ip: req.ip,
      email: req.body?.email,
      timestamp: new Date().toISOString(),
    });

    res.status(429).json({
      success: false,
      message: 'Too many authentication attempts. Please try again later.',
      error: 'AUTH_RATE_LIMIT',
    });
  },
});

/**
 * Form submission rate limiter
 * Prevents spam form submissions
 * Allows 20 submissions per hour per IP
 */
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Max 20 form submissions per hour
  message: 'Too many form submissions. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Track by IP and email if available
    return `${req.ip}-form-${req.body?.email || req.body?.phone || 'unknown'}`;
  },
  handler: (req, res) => {
    console.warn('⚠️ FORM SUBMISSION RATE LIMIT EXCEEDED', {
      ip: req.ip,
      email: req.body?.email,
      timestamp: new Date().toISOString(),
    });

    res.status(429).json({
      success: false,
      message: 'Too many form submissions. Please try again later.',
      error: 'FORM_RATE_LIMIT',
    });
  },
});

/**
 * API key rate limiter for third-party integrations
 * Tracks by API key instead of IP
 */
const createApiKeyLimiter = (maxRequests = 1000, windowMs = 60 * 60 * 1000) => {
  return rateLimit({
    windowMs,
    max: maxRequests,
    keyGenerator: (req) => {
      // Extract API key from header
      const apiKey = req.get('X-API-Key') || req.get('Authorization') || 'unknown';
      return `api-key-${apiKey}`;
    },
    skip: (req) => {
      // Skip if no API key provided
      return !req.get('X-API-Key') && !req.get('Authorization');
    },
    handler: (req, res) => {
      console.warn('⚠️ API KEY RATE LIMIT EXCEEDED', {
        apiKey: req.get('X-API-Key')?.substring(0, 10),
        path: req.path,
        timestamp: new Date().toISOString(),
      });

      res.status(429).json({
        success: false,
        message: 'API rate limit exceeded.',
        error: 'API_RATE_LIMIT',
      });
    },
  });
};

/**
 * Combined middleware that applies multiple limiters based on route
 */
const createRouteLimiter = (limiterConfig) => {
  return (req, res, next) => {
    // Determine which limiter to apply based on route
    let limiter = generalLimiter;

    if (req.path.includes('/payment')) {
      limiter = paymentLimiter;
    } else if (req.path.includes('/auth') || req.path.includes('/login')) {
      limiter = authLimiter;
    } else if (req.path.includes('/form') || req.method === 'POST') {
      limiter = formLimiter;
    }

    // Apply the selected limiter
    limiter(req, res, next);
  };
};

module.exports = {
  generalLimiter,
  paymentLimiter,
  authLimiter,
  formLimiter,
  createApiKeyLimiter,
  createRouteLimiter,
};
