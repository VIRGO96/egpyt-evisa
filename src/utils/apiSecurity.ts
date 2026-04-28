/**
 * API Security Utilities for Frontend
 * Generates required security headers for API requests
 * 
 * Security Model:
 * - API Key: Static, validates client identity (VITE_API_KEY)
 * - Timestamp: Dynamic, prevents old replay attacks (5-minute window)
 * - Nonce: Dynamic, prevents duplicate replay attacks
 * - Body Hash: Dynamic, ensures request integrity
 * 
 * Note: No signature generation - API_SECRET must stay on backend only
 */

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Generate a random nonce (unique request ID)
 * Must be unique for each request to prevent replay attacks
 * @returns 64-character hex string
 */
export function generateNonce(): string {
  // Use Web Crypto API (browser-safe)
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate SHA-256 hash of request body
 * Used to verify request body wasn't tampered with
 * @param body - Request body object
 * @returns Hex-encoded SHA-256 hash
 */
export async function generateBodyHash(body: any): Promise<string> {
  const bodyString = JSON.stringify(body) || '';
  const encoder = new TextEncoder();
  const data = encoder.encode(bodyString);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Get all required security headers for API request
 * @param method - HTTP method (GET, POST, PUT, etc.)
 * @param path - Request path (e.g., '/api/v1/application/create')
 * @param body - Request body object (can be null for GET requests)
 * @returns Object with security headers
 */
export async function getSecurityHeaders(
  method: string,
  path: string,
  body: any
): Promise<Record<string, string>> {
  if (!API_KEY) {
    console.error('❌ VITE_API_KEY not configured in environment');
    throw new Error('API_KEY not configured');
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = generateNonce();
  const bodyHash = await generateBodyHash(body);

  return {
    'x-api-key': API_KEY,
    'x-timestamp': timestamp,
    'x-nonce': nonce,
    'x-body-hash': bodyHash,
  };
}

/**
 * Simplified version for GET requests (no body)
 */
export async function getSecurityHeadersForGet(
  method: string,
  path: string
): Promise<Record<string, string>> {
  return getSecurityHeaders(method, path, null);
}
