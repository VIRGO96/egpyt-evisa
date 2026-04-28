const crypto = require('crypto');
const { getSecrets } = require('../utils/secrets');

/**
 * API Security Middleware
 * Implements multiple layers of security:
 * 1. API Key verification
 * 2. Request signature verification (HMAC)
 * 3. Timestamp-based replay attack prevention
 * 4. Request body integrity check
 */

// Security configuration
const TIMESTAMP_WINDOW = 5 * 60; // 5 minutes in seconds
const NONCE_CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

// Store used nonces to prevent replay attacks (in production, use Redis)
const usedNonces = new Map();

// Load API keys from secrets
let API_KEY = null;
let API_SECRET = null;

// Initialize secrets on first request
const initializeSecrets = async () => {
  if (!API_KEY || !API_SECRET) {
    const secrets = await getSecrets();
    API_KEY = secrets.API_KEY;
    API_SECRET = secrets.API_SECRET;
    console.log('🔒 API Security keys loaded from secrets');
  }
};

// Clean up old nonces every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [nonce, timestamp] of usedNonces.entries()) {
    if (now - timestamp > NONCE_CLEANUP_INTERVAL) {
      usedNonces.delete(nonce);
    }
  }
}, NONCE_CLEANUP_INTERVAL);

/**
 * Generate HMAC signature for request
 * @param {string} method - HTTP method
 * @param {string} path - Request path
 * @param {string} timestamp - Unix timestamp
 * @param {string} nonce - Unique request ID
 * @param {object} body - Request body
 * @param {string} apiSecret - Secret key
 * @returns {string} - HMAC signature
 */
function generateSignature(method, path, timestamp, nonce, body, apiSecret) {
  const bodyString = body ? JSON.stringify(body) : '';
  const message = `${method}:${path}:${timestamp}:${nonce}:${bodyString}`;
  
  return crypto
    .createHmac('sha256', apiSecret)
    .update(message)
    .digest('hex');
}

/**
 * Get the request body that should be used for integrity verification.
 * Prefer the pre-sanitized body if middleware stored it.
 */
function getIntegrityBody(req) {
  if (req.originalBody && typeof req.originalBody === 'object') {
    return req.originalBody;
  }
  return req.body;
}

/**
 * Verify API Key
 * Checks if the provided API key matches the expected key
 */
async function verifyApiKey(req, res, next) {
  await initializeSecrets();
  
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    console.error('🚨 Missing API Key');
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  if (apiKey !== API_KEY) {
    console.error('🚨 Invalid API Key:', apiKey.substring(0, 10) + '...');
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  console.log('✅ API Key verified');
  next();
}

/**
 * Verify Request Signature (HMAC)
 * Prevents tampering and ensures request authenticity
 */
async function verifySignature(req, res, next) {
  await initializeSecrets();
  
  const signature = req.headers['x-signature'];
  const timestamp = req.headers['x-timestamp'];
  const nonce = req.headers['x-nonce'];
  
  // Check required headers
  if (!signature || !timestamp || !nonce) {
    console.error('🚨 Missing security headers');
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  // Check timestamp (prevent replay attacks - must be within 5 minutes)
  const requestTime = parseInt(timestamp, 10);
  const now = Date.now();
  const timeDiff = Math.abs(now - requestTime);
  
  if (timeDiff > 5 * 60 * 1000) { // 5 minutes
    console.error('🚨 Request timestamp too old:', timeDiff / 1000, 'seconds');
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  // Check nonce (prevent replay attacks - must be unique)
  if (usedNonces.has(nonce)) {
    console.error('🚨 Nonce already used (replay attack):', nonce);
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  // Generate expected signature
  const expectedSignature = generateSignature(
    req.method,
    req.path,
    timestamp,
    nonce,
    req.body,
    API_SECRET
  );

  // Compare signatures (constant-time comparison to prevent timing attacks)
  if (!crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  )) {
    console.error('🚨 Invalid signature');
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  // Mark nonce as used
  usedNonces.set(nonce, now);
  
  console.log('✅ Request signature verified');
  next();
}

/**
 * Verify Request Body Integrity
 * Checks if body hash matches the provided hash
 */
async function verifyBodyHash(req, res, next) {
  const bodyHash = req.headers['x-body-hash'];
  
  if (!bodyHash) {
    // Body hash is optional for GET requests
    if (req.method === 'GET') {
      return next();
    }
    
    console.error('🚨 Missing body hash');
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  // Calculate body hash
  const bodyString = JSON.stringify(getIntegrityBody(req));
  const calculatedHash = crypto
    .createHash('sha256')
    .update(bodyString)
    .digest('hex');

  if (bodyHash !== calculatedHash) {
    console.error('🚨 Body hash mismatch');
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  console.log('✅ Body hash verified');
  next();
}

/**
 * Secure endpoint - requires all security checks (server-to-server)
 * Use for sensitive endpoints that need maximum security
 */
function secureEndpoint(req, res, next) {
  // Chain all security checks (all async now)
  verifyApiKey(req, res, async (err1) => {
    if (err1) return;
    
    await verifySignature(req, res, async (err2) => {
      if (err2) return;
      
      await verifyBodyHash(req, res, (err3) => {
        if (err3) return;
        
        next();
      });
    });
  });
}

/**
 * Frontend endpoint - API key + timestamp + nonce + body hash (NO signature)
 * Browser-safe security that doesn't require API_SECRET on client
 */
async function frontendEndpoint(req, res, next) {
  await initializeSecrets();
  
  // Verify API key
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    console.error('🚨 Missing API Key');
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  if (apiKey !== API_KEY) {
    console.error('🚨 Invalid API Key:', apiKey.substring(0, 10) + '...');
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  // Verify timestamp
  const timestamp = req.headers['x-timestamp'];
  if (!timestamp) {
    console.warn('⚠️ Missing timestamp');
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  const now = Math.floor(Date.now() / 1000);
  const requestTime = parseInt(timestamp);
  
  if (Math.abs(now - requestTime) > TIMESTAMP_WINDOW) {
    console.warn('⚠️ Invalid timestamp:', { now, requestTime, diff: now - requestTime });
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  // Verify nonce
  const nonce = req.headers['x-nonce'];
  if (!nonce) {
    console.warn('⚠️ Missing nonce');
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  if (usedNonces.has(nonce)) {
    console.warn('⚠️ Nonce already used:', nonce);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  // Verify body hash
  const bodyHash = req.headers['x-body-hash'];
  if (bodyHash && req.method !== 'GET') {
    const bodyString = JSON.stringify(getIntegrityBody(req));
    const calculatedHash = crypto.createHash('sha256').update(bodyString).digest('hex');
    
    if (bodyHash !== calculatedHash) {
      console.error('🚨 Body hash mismatch');
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  }

  usedNonces.set(nonce, Date.now());
  
  console.log('✅ Frontend security verified');
  next();
}

/**
 * Optional: Less strict security for public endpoints
 * Only requires API key, no signature verification
 */
function publicEndpoint(req, res, next) {
  verifyApiKey(req, res, next);
}

module.exports = {
  verifyApiKey,
  verifySignature,
  verifyBodyHash,
  secureEndpoint,
  frontendEndpoint,
  publicEndpoint,
  generateSignature, // Export for frontend use
};
