/**
 * Server-side input sanitization for Cloud Functions
 * Prevents XSS attacks by removing malicious JavaScript from user input
 * 
 * IMPORTANT: This is for server-side use in Node.js environment
 * Install: npm install isomorphic-dompurify
 */

const DOMPurify = require('isomorphic-dompurify');

/**
 * Sanitizes user input by removing all HTML tags and dangerous attributes
 * @param {string} input - User-provided input string
 * @returns {string} - Sanitized text with all HTML removed
 */
function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Use DOMPurify to remove all HTML tags and attributes
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],        // No HTML tags allowed
    ALLOWED_ATTR: [],        // No attributes allowed
    KEEP_CONTENT: true,      // Keep the text content
  });

  return sanitized.trim();
}

/**
 * Detects potentially malicious patterns in input
 * Returns true if suspicious content is found
 * 
 * @param {string} input - Input to check
 * @returns {boolean} - True if malicious patterns detected
 */
function isMalicious(input) {
  if (!input || typeof input !== 'string') {
    return false;
  }

  // Comprehensive list of XSS attack patterns
  const dangerousPatterns = [
    // Script tags
    /<script/i,
    /<\/script/i,
    
    // Iframe (can load malicious content)
    /<iframe/i,
    
    // Embedded objects
    /<object/i,
    /<embed/i,
    
    // JavaScript protocol
    /javascript:/i,
    
    // Event handlers (most common XSS vector)
    /on\w+\s*=/i,           // Catches: onerror=, onclick=, onload=, onmouseover=, etc.
    /on[a-z]+\s*=/i,        // More precise version
    
    // Data URLs with HTML/JavaScript
    /data:text\/html/i,
    /data:.*javascript/i,
    
    // Image with onerror
    /<img[^>]+onerror/i,
    
    // SVG with onload
    /<svg[^>]+onload/i,
    
    // Eval (dynamic code execution)
    /eval\s*\(/i,
    
    // Expression (IE specific)
    /expression\s*\(/i,
    
    // VBScript
    /vbscript:/i,
    
    // Form hijacking
    /<form/i,
    /<input[^>]+type\s*=\s*["\']?hidden/i,
    
    // Meta refresh
    /<meta[^>]+http-equiv\s*=\s*["\']?refresh/i,
    
    // Base href manipulation
    /<base[^>]+href/i,
    
    // Link tag injection
    /<link[^>]+onload/i,
    
    // Style with expressions
    /style\s*=[^>]*expression/i,
    /style\s*=[^>]*import/i,
    /style\s*=[^>]*behavior/i,
  ];

  // Check if input matches any dangerous pattern
  for (const pattern of dangerousPatterns) {
    if (pattern.test(input)) {
      console.warn(`⚠️ Malicious pattern detected: ${pattern}`);
      return true;
    }
  }

  return false;
}

/**
 * Validates and sanitizes input with length limits
 * Throws error if input is malicious
 * 
 * @param {string} input - User input
 * @param {number} maxLength - Maximum allowed length (default 1000)
 * @returns {string|null} - Sanitized input or null if empty
 * @throws {Error} - If input is malicious or exceeds length
 */
function validateAndSanitize(input, maxLength = 1000) {
  if (!input || typeof input !== 'string') {
    return null;
  }

  // Check length before processing
  if (input.length > maxLength) {
    throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
  }

  // Check for malicious patterns
  if (isMalicious(input)) {
    throw new Error(`Malicious content detected in input: "${input.substring(0, 50)}..."`);
  }

  // Sanitize the input
  const sanitized = sanitizeInput(input);

  // Return null if result is empty
  if (!sanitized || sanitized.trim().length === 0) {
    return null;
  }

  return sanitized;
}

/**
 * Recursively sanitizes all string properties in an object
 * Useful for processing form submissions
 * 
 * @param {object} obj - Object with string properties to sanitize
 * @param {object} options - Configuration options
 * @param {string[]} options.ignoredFields - Fields to skip (e.g., 'id', 'timestamp')
 * @returns {object} - New object with sanitized values
 * @throws {Error} - If any field contains malicious content
 */
function sanitizeObject(obj, options = {}) {
  const { ignoredFields = [] } = options;

  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item, index) => {
      try {
        return sanitizeObject(item, options);
      } catch (error) {
        throw new Error(`Error in array[${index}]: ${error.message}`);
      }
    });
  }

  // Handle objects
  const sanitized = {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }

    // Skip ignored fields
    if (ignoredFields.includes(key)) {
      sanitized[key] = obj[key];
      continue;
    }

    const value = obj[key];

    if (typeof value === 'string') {
      // Check for malicious content
      if (isMalicious(value)) {
        throw new Error(
          `Malicious content detected in field "${key}": "${value.substring(0, 50)}..."`
        );
      }
      // Sanitize string values
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === 'object' && value !== null) {
      // Recursively sanitize nested objects
      try {
        sanitized[key] = sanitizeObject(value, options);
      } catch (error) {
        throw new Error(`Error in field "${key}": ${error.message}`);
      }
    } else {
      // Keep other types as-is (numbers, booleans, null, etc.)
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Validates email format (basic check)
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email format is valid
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number (basic format check)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if phone format looks valid
 */
function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return false;
  }

  // Allow only digits, spaces, hyphens, parentheses, and + symbol
  const phoneRegex = /^[\d\s\-()+ ]{7,}$/;
  return phoneRegex.test(phone);
}

/**
 * Sanitizes and validates common form fields
 * @param {object} formData - Form data object
 * @returns {object} - Validated and sanitized form data
 * @throws {Error} - If validation fails
 */
function validateFormData(formData) {
  const validated = {};

  // Validate and sanitize common fields
  if (formData.email) {
    if (!isValidEmail(formData.email)) {
      throw new Error('Invalid email format');
    }
    validated.email = sanitizeInput(formData.email.toLowerCase().trim());
  }

  if (formData.name) {
    validated.name = validateAndSanitize(formData.name, 100);
  }

  if (formData.phone) {
    if (formData.phone && !isValidPhone(formData.phone)) {
      throw new Error('Invalid phone format');
    }
    validated.phone = sanitizeInput(formData.phone);
  }

  if (formData.message) {
    validated.message = validateAndSanitize(formData.message, 5000);
  }

  // Sanitize any other string fields
  for (const key in formData) {
    if (
      !validated.hasOwnProperty(key) &&
      typeof formData[key] === 'string'
    ) {
      validated[key] = sanitizeInput(formData[key]);
    }
  }

  return validated;
}

module.exports = {
  sanitizeInput,
  isMalicious,
  validateAndSanitize,
  sanitizeObject,
  isValidEmail,
  isValidPhone,
  validateFormData,
};
