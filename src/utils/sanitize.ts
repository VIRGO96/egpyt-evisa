import DOMPurify from 'dompurify';

/**
 * Sanitizes user input to prevent XSS attacks
 * Strips ALL HTML tags and attributes
 * @param input - User-supplied text that needs sanitization
 * @returns Sanitized plain text string
 */
export function sanitizeText(input: string | undefined | null): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove all HTML tags and attributes
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  }).trim();
}

/**
 * Validates input against known XSS patterns
 * @param input - Text to validate
 * @returns True if input contains suspicious patterns
 */
export function containsMaliciousPatterns(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false;
  }

  // Patterns that indicate potential XSS attempts
  const dangerousPatterns = [
    /<script/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers like onerror=, onclick=, onload=
    /data:text\/html/i,
    /<img[^>]+onerror/i,
    /<svg[^>]+onload/i,
    /eval\(/i,
    /expression\(/i,
    /vbscript:/i,
  ];

  return dangerousPatterns.some(pattern => pattern.test(input));
}

/**
 * Validates and sanitizes text input with length limits
 * @param input - User input
 * @param maxLength - Maximum allowed length (default 500)
 * @returns Sanitized and validated text or null if invalid
 */
export function validateAndSanitize(
  input: string | undefined | null,
  maxLength: number = 500
): string | null {
  if (!input || typeof input !== 'string') {
    return null;
  }

  // Check length before sanitization
  if (input.length > maxLength) {
    throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
  }

  // Check for malicious patterns
  if (containsMaliciousPatterns(input)) {
    throw new Error('Input contains potentially malicious content');
  }

  // Sanitize the input
  const sanitized = sanitizeText(input);

  // Ensure sanitized version isn't empty
  if (!sanitized || sanitized.trim().length === 0) {
    return null;
  }

  return sanitized;
}

/**
 * Sanitizes an object's string properties recursively
 * @param obj - Object containing user data
 * @returns New object with sanitized string values
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const sanitized = { ...obj };

  for (const key in sanitized) {
    if (Object.prototype.hasOwnProperty.call(sanitized, key)) {
      const value = sanitized[key];

      if (typeof value === 'string') {
        sanitized[key] = sanitizeText(value) as any;
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map(item =>
          typeof item === 'string' ? sanitizeText(item) : item
        ) as any;
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitizeObject(value);
      }
    }
  }

  return sanitized;
}
