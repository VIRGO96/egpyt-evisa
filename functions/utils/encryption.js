const crypto = require('crypto');
const { getSecrets } = require('./secrets');

/**
 * Encryption/Decryption utilities for sensitive data
 * Uses AES-256-GCM for authenticated encryption
 */

// Encryption configuration
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

// Load encryption key from secrets
let ENCRYPTION_KEY = null;

const initializeEncryption = async () => {
  if (!ENCRYPTION_KEY) {
    const secrets = await getSecrets();
    ENCRYPTION_KEY = secrets.ENCRYPTION_KEY;
    console.log('🔒 Encryption key loaded from secrets');
  }
};

/**
 * Encrypt sensitive data
 * @param {string} text - Plain text to encrypt
 * @param {string} key - Encryption key (32 bytes for AES-256)
 * @returns {string} - Encrypted data in format: iv:authTag:encryptedData
 */
async function encrypt(text, key = null) {
  try {
    await initializeEncryption();
    
    // Use provided key or default from secrets
    const encryptionKey = key || ENCRYPTION_KEY;
    
    // Ensure key is 32 bytes
    const keyBuffer = Buffer.from(encryptionKey.padEnd(32, '0').substring(0, 32));
    
    // Generate random IV
    const iv = crypto.randomBytes(IV_LENGTH);
    
    // Create cipher
    const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);
    
    // Encrypt
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Get auth tag
    const authTag = cipher.getAuthTag();
    
    // Return: iv:authTag:encryptedData
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('❌ Encryption error:', error);
    throw new Error('Encryption failed');
  }
}

/**
 * Decrypt encrypted data
 * @param {string} encryptedData - Data in format: iv:authTag:encryptedData
 * @param {string} key - Encryption key (32 bytes)
 * @returns {string} - Decrypted plain text
 */
async function decrypt(encryptedData, key = null) {
  try {
    await initializeEncryption();
    
    // Parse encrypted data
    const parts = encryptedData.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format');
    }
    
    const [ivHex, authTagHex, encrypted] = parts;
    
    // Use provided key or default from secrets
    const encryptionKey = key || ENCRYPTION_KEY;
    
    // Ensure key is 32 bytes
    const keyBuffer = Buffer.from(encryptionKey.padEnd(32, '0').substring(0, 32));
    
    // Convert hex to buffers
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    // Create decipher
    const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
    decipher.setAuthTag(authTag);
    
    // Decrypt
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('❌ Decryption error:', error);
    throw new Error('Decryption failed');
  }
}

/**
 * Hash sensitive data (one-way)
 * @param {string} text - Text to hash
 * @param {string} salt - Optional salt
 * @returns {string} - Hashed value
 */
function hash(text, salt = '') {
  return crypto
    .createHash('sha256')
    .update(text + salt)
    .digest('hex');
}

/**
 * Generate secure random token
 * @param {number} length - Token length in bytes (default 32)
 * @returns {string} - Random hex token
 */
function generateToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Middleware to decrypt request body
 * Expects encrypted payload in req.body.encrypted
 */
function decryptRequestBody(req, res, next) {
  if (!req.body || !req.body.encrypted) {
    // No encrypted data, proceed normally
    return next();
  }

  try {
    const decryptedJson = decrypt(req.body.encrypted);
    req.body = JSON.parse(decryptedJson);
    console.log('✅ Request body decrypted');
    next();
  } catch (error) {
    console.error('🚨 Failed to decrypt request body:', error);
    return res.status(400).json({
      success: false,
      message: 'Invalid encrypted payload',
    });
  }
}

/**
 * Middleware to encrypt response body
 * Encrypts sensitive data before sending to client
 */
function encryptResponseBody(req, res, next) {
  const originalJson = res.json.bind(res);
  
  res.json = function(data) {
    // Only encrypt successful responses with sensitive data
    if (data.success && data.data) {
      try {
        const encryptedData = encrypt(JSON.stringify(data.data));
        return originalJson({
          success: true,
          encrypted: encryptedData,
        });
      } catch (error) {
        console.error('❌ Failed to encrypt response:', error);
      }
    }
    
    // Send unencrypted for errors or non-sensitive data
    return originalJson(data);
  };
  
  next();
}

module.exports = {
  encrypt,
  decrypt,
  hash,
  generateToken,
  decryptRequestBody,
  encryptResponseBody,
};
