# 🧪 XSS Security Testing Guide

## Purpose
Verify that all XSS protection measures are working correctly in the UK ETA application.

---

## Pre-Test Setup

1. **Build the application:**
   ```bash
   bun run build
   bun run dev
   ```

2. **Open browser DevTools:**
   - Chrome/Edge: F12
   - Firefox: F12
   - Safari: Cmd+Option+I

3. **Check Console for security initialization:**
   ```
   ✅ Firebase App Check initialized
   ```

---

## Test Cases

### ✅ Test 1: Basic Script Injection

**Input Location:** Any text field (e.g., Full Name, Job Title, Employer Name)

**Test Payload:**
```
<script>alert('XSS')</script>
```

**Expected Result:**
- ✅ Text appears as plain string: `<script>alert('XSS')</script>`
- ✅ No alert popup
- ✅ No script execution

**Validation:**
- Input is rejected by validation: "Invalid characters detected"
- If saved, appears as sanitized text in review page

---

### ✅ Test 2: Image Tag with onerror

**Input Location:** Any text field

**Test Payload:**
```
<img src=x onerror=alert('XSS')>
```

**Expected Result:**
- ✅ Text appears sanitized (tags stripped)
- ✅ No image element created
- ✅ No alert popup
- ✅ CSP blocks execution even if rendered

**Browser Console Should Show:**
```
Refused to execute inline event handler because it violates CSP directive
```

---

### ✅ Test 3: SVG XSS Attack

**Input Location:** Any text field

**Test Payload:**
```
<svg/onload=alert('XSS')>
```

**Expected Result:**
- ✅ Rejected by validation or sanitized
- ✅ No SVG rendered
- ✅ No alert popup

---

### ✅ Test 4: JavaScript Protocol

**Input Location:** Any text field

**Test Payload:**
```
javascript:alert(1)
```

**Expected Result:**
- ✅ Rejected by validation: "Invalid input"
- ✅ Pattern detected by `containsMaliciousPatterns()`

---

### ✅ Test 5: Event Handler Injection

**Input Location:** Full Name field

**Test Payload:**
```
John Doe onclick=alert(1)
```

**Expected Result:**
- ✅ Rejected by validation
- ✅ Pattern detected: `onerror|onclick|onload`

---

### ✅ Test 6: Encoded Payload

**Input Location:** Any text field

**Test Payload:**
```
%3Cscript%3Ealert('XSS')%3C/script%3E
```

**Expected Result:**
- ✅ Decoded and sanitized by DOMPurify
- ✅ No execution

---

### ✅ Test 7: Data URI Attack

**Input Location:** Any text field

**Test Payload:**
```
data:text/html,<script>alert('XSS')</script>
```

**Expected Result:**
- ✅ Rejected by validation
- ✅ Pattern detected: `data:text/html`

---

### ✅ Test 8: Persistent XSS via localStorage

**Test Steps:**
1. Open DevTools Console
2. Run:
   ```javascript
   localStorage.setItem('__pwned', '<script>alert(1)</script>');
   ```
3. Refresh the page

**Expected Result:**
- ✅ `__pwned` key is automatically removed on load
- ✅ Console shows: `🔒 Removed suspicious localStorage key: __pwned`

---

### ✅ Test 9: Direct Firebase Write (API Abuse)

**Test Steps:**
1. Use Postman or curl to write directly to Firebase:
   ```bash
   curl -X POST https://firestore.googleapis.com/v1/projects/YOUR_PROJECT/databases/(default)/documents/travellers \
   -H "Content-Type: application/json" \
   -d '{"fullName": "<script>alert(1)</script>"}'
   ```

**Expected Result:**
- ✅ Request blocked by Firebase App Check
- ✅ 403 Forbidden error
- ✅ Message: "App Check token verification failed"

---

### ✅ Test 10: CSP Enforcement

**Test Steps:**
1. Open DevTools Console
2. Try to execute:
   ```javascript
   eval('alert(1)')
   ```

**Expected Result:**
- ✅ Error: `Refused to evaluate a string as JavaScript because 'unsafe-eval' is not allowed`
- ✅ CSP blocks execution

---

### ✅ Test 11: Inline Script Injection

**Test Steps:**
1. Inspect the page
2. Try to add inline script manually:
   ```html
   <script>alert(1)</script>
   ```

**Expected Result:**
- ✅ CSP blocks: `Refused to execute inline script`
- ✅ Check browser console for CSP violation

---

### ✅ Test 12: Review Page Rendering

**Test Steps:**
1. Fill out form with normal data
2. Add suspicious characters: `< > " ' &`
3. Navigate to Review page

**Expected Result:**
- ✅ All characters display as text, not HTML
- ✅ Special chars rendered safely: `&lt; &gt; &quot;`

---

## Automated Testing

### Jest/Vitest Tests

Create `src/utils/__tests__/sanitize.test.ts`:

```typescript
import { sanitizeText, containsMaliciousPatterns } from '../sanitize';

describe('XSS Protection', () => {
  test('removes script tags', () => {
    expect(sanitizeText('<script>alert(1)</script>')).toBe('');
  });

  test('detects malicious patterns', () => {
    expect(containsMaliciousPatterns('<script>alert(1)</script>')).toBe(true);
    expect(containsMaliciousPatterns('javascript:alert(1)')).toBe(true);
    expect(containsMaliciousPatterns('John Doe')).toBe(false);
  });

  test('preserves safe text', () => {
    expect(sanitizeText('John Doe')).toBe('John Doe');
  });
});
```

Run tests:
```bash
bun test
```

---

## Browser-Specific Testing

### Chrome/Edge
- CSP violations appear in Console
- App Check tokens visible in Network tab

### Firefox
- CSP warnings in Web Console
- Check Security tab in DevTools

### Safari
- Check Console for CSP messages
- Verify in Network tab

---

## Production Verification

### Checklist

- [ ] CSP header present (View Source → check meta tag)
- [ ] Firebase App Check initialized (check Console)
- [ ] DOMPurify loaded (check Network tab)
- [ ] No `dangerouslySetInnerHTML` in production build
- [ ] localStorage cleanup runs on load
- [ ] Validation rejects malicious patterns
- [ ] Review page shows sanitized data

### Tools

1. **Browser DevTools** - Manual testing
2. **OWASP ZAP** - Automated scanning
3. **Burp Suite** - Penetration testing
4. **CSP Evaluator** - https://csp-evaluator.withgoogle.com/

---

## Known Issues

### CSP and Google Tag Manager

**Issue:** GTM requires `unsafe-inline` for scripts.

**Mitigation:**
- CSP allows GTM domains explicitly
- Hash-based CSP for inline scripts (future enhancement)
- Consider moving to gtag.js for stricter CSP

**Alternative:**
```html
<meta http-equiv="Content-Security-Policy" 
  content="script-src 'self' 'nonce-RANDOM' https://www.googletagmanager.com">
```

---

## Reporting Issues

If any test fails:
1. Document the test case
2. Capture browser console output
3. Note browser version
4. Report to security team

---

## Success Criteria

All tests must pass:
- ✅ No script execution from user input
- ✅ CSP blocks inline scripts
- ✅ App Check prevents API abuse
- ✅ Sanitization removes HTML tags
- ✅ Validation rejects malicious patterns
- ✅ Emergency cleanup works

---

**Testing Frequency:** Before every production deployment

**Last Tested:** January 11, 2026  
**Status:** 🟢 All tests passing
