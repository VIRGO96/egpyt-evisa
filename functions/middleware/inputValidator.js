/**
 * Express middleware for input validation and sanitization
 * Validates and sanitizes all incoming request bodies before processing
 * 
 * Usage:
 * const { validateAndSanitize } = require('./inputValidator');
 * app.use(express.json());
 * app.use(validateAndSanitize);
 */

const { sanitizeObject, isMalicious } = require('../utils/sanitize');

/**
 * Middleware to validate and sanitize all JSON request bodies
 * Logs suspicious activity and rejects malicious requests
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
function validateAndSanitize(req, res, next) {
  try {
    // Skip if no body or method is GET/HEAD
    if (
      !req.body ||
      typeof req.body !== 'object' ||
      ['GET', 'HEAD', 'OPTIONS'].includes(req.method)
    ) {
      return next();
    }

    // Log request details for security monitoring
    console.log(`[Security] ${req.method} ${req.path}`, {
      ip: req.ip || req.connection.remoteAddress,
      timestamp: new Date().toISOString(),
    });

    // Recursively sanitize all string fields in the request body
    try {
      // Preserve pre-sanitized payload for downstream integrity checks (e.g. x-body-hash).
      req.originalBody = req.body;

      const sanitized = sanitizeObject(req.body, {
        ignoredFields: ['id', 'timestamp', 'createdAt', 'updatedAt'], // Fields to skip sanitization
      });

      req.body = sanitized;
      next();
    } catch (sanitizationError) {
      // Log attempted attack
      console.error('⚠️ SECURITY ALERT: Malicious content detected', {
        error: sanitizationError.message,
        path: req.path,
        method: req.method,
        ip: req.ip,
        body: JSON.stringify(req.body).substring(0, 200), // Log first 200 chars
      });

      // Return 400 Bad Request without exposing details
      return res.status(400).json({
        success: false,
        message: 'Invalid input detected. Request rejected.',
        error: 'INVALID_INPUT',
      });
    }
  } catch (error) {
    console.error('Middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing request',
    });
  }
}

/**
 * Middleware to log all incoming requests for security monitoring
 * Helps detect attack patterns
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
function securityLogger(req, res, next) {
  const startTime = Date.now();

  // Log request
  console.log(`[Request] ${req.method} ${req.path}`, {
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('user-agent'),
    timestamp: new Date().toISOString(),
  });

  // Log response on finish
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`[Response] ${req.method} ${req.path}`, {
      status: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
}

/**
 * Middleware to enforce Content Security Policy (CSP)
 * Prevents inline scripts and restricts resource loading
 * Only applies to API endpoints, not static files
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
function cspHeaders(req, res, next) {
  // Skip CSP for static files (Vite assets, etc)
  if (req.path.includes('.js') || req.path.includes('.css') || req.path.includes('node_modules')) {
    return next();
  }

  // Set CSP headers to prevent XSS attacks (only for API endpoints)
  res.set('Content-Security-Policy', [
    "default-src 'self'",                    // Default: only from same origin
    "script-src 'self' 'unsafe-inline'",     // Scripts from same origin (allow inline for dev)
    "style-src 'self' 'unsafe-inline'",      // Styles from same origin (inline allowed)
    "img-src 'self' data: https:",           // Images from same origin, data URLs, HTTPS
    "font-src 'self' data:",                 // Fonts from same origin and data URLs
    "connect-src 'self' https:",             // API calls to same origin and HTTPS only
    "frame-ancestors 'none'",                // Cannot be embedded in iframes
    "form-action 'self'",                    // Forms can only submit to same origin
    "base-uri 'self'",                       // Base tag can only point to same origin
    "object-src 'none'",                     // No plugins
  ].join('; '));

  // Additional security headers
  res.set('X-Content-Type-Options', 'nosniff');           // Prevent MIME type sniffing
  res.set('X-Frame-Options', 'DENY');                     // Prevent clickjacking
  res.set('X-XSS-Protection', '1; mode=block');           // Enable browser XSS protection
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin'); // Control referrer info

  next();
}

/**
 * Middleware to validate specific content types
 * Ensures request has proper Content-Type header
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
function validateContentType(req, res, next) {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const contentType = req.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        message: 'Content-Type must be application/json',
      });
    }
  }

  next();
}

/**
 * Middleware to detect and log suspicious patterns
 * Identifies potential attack attempts
 * 
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
function detectSuspiciousActivity(req, res, next) {
  const bodyStr = JSON.stringify(req.body || {});

  // Check for XSS patterns
  const xssPatterns = [
    /<script/i,
    /onerror=/i,
    /onclick=/i,
    /javascript:/i,
    /<iframe/i,
  ];

  const suspiciousPatterns = xssPatterns.filter(pattern => pattern.test(bodyStr));

  if (suspiciousPatterns.length > 0) {
    console.warn('🚨 SUSPICIOUS ACTIVITY DETECTED', {
      path: req.path,
      method: req.method,
      ip: req.ip,
      patterns: suspiciousPatterns.map(p => p.toString()),
      timestamp: new Date().toISOString(),
    });
  }

  // Check for SQL injection patterns
  const sqlPatterns = [
    /('|(--)|;|\/\*|\*\/|xp_|sp_)/i,
  ];

  if (sqlPatterns.some(pattern => pattern.test(bodyStr))) {
    console.warn('🚨 POTENTIAL SQL INJECTION DETECTED', {
      path: req.path,
      method: req.method,
      ip: req.ip,
      timestamp: new Date().toISOString(),
    });
  }

  next();
}

/**
 * Error handling middleware for input validation errors
 * Catches and logs validation errors
 * 
 * @param {Error} error - Error object
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
function inputValidationErrorHandler(error, req, res, next) {
  if (error instanceof SyntaxError && error.status === 400) {
    // JSON parsing error
    console.error('Invalid JSON received:', error.message);
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON format',
      error: 'INVALID_JSON',
    });
  }

  // Pass to next error handler if not a validation error
  next(error);
}

module.exports = {
  validateAndSanitize,
  securityLogger,
  cspHeaders,
  validateContentType,
  detectSuspiciousActivity,
  inputValidationErrorHandler,
};
