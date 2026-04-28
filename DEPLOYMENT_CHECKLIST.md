# 🚀 Security Deployment Checklist

Use this checklist before deploying the security-hardened application to production.

---

## Pre-Deployment

### ✅ Environment Variables

- [ ] Add `VITE_RECAPTCHA_SITE_KEY` to `.env`
  - Get key from: https://www.google.com/recaptcha/admin
  - Select reCAPTCHA v3
  - Add your domain

- [ ] Verify all Firebase env variables are set:
  ```env
  VITE_FIREBASE_API_KEY=
  VITE_FIREBASE_AUTH_DOMAIN=
  VITE_FIREBASE_PROJECT_ID=
  VITE_FIREBASE_STORAGE_BUCKET=
  VITE_FIREBASE_MESSAGING_SENDER_ID=
  VITE_FIREBASE_APP_ID=
  VITE_RECAPTCHA_SITE_KEY=
  ```

---

### ✅ Firebase Console Setup

- [ ] Enable Firebase App Check
  1. Go to Firebase Console → App Check
  2. Click "Register app"
  3. Select "Web"
  4. Choose "reCAPTCHA v3"
  5. Add your site key
  6. Enable enforcement for Firestore

- [ ] Verify Firestore Security Rules
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if false; // Lock down by default
        // Add specific rules for your collections
      }
    }
  }
  ```

- [ ] Check Firebase Storage Rules (if using)

---

### ✅ Code Verification

- [ ] Build completes successfully:
  ```bash
  bun run build
  ```

- [ ] No TypeScript errors:
  ```bash
  bun run type-check
  ```

- [ ] CSP meta tag present in `dist/index.html`
  ```bash
  grep "Content-Security-Policy" dist/index.html
  ```

- [ ] DOMPurify included in bundle:
  ```bash
  grep -r "dompurify" dist/assets/*.js
  ```

---

### ✅ Security Testing

Run all tests from [SECURITY_TESTING.md](./SECURITY_TESTING.md):

- [ ] Test 1: Basic script injection blocked ✅
- [ ] Test 2: Image onerror blocked ✅
- [ ] Test 3: SVG XSS blocked ✅
- [ ] Test 4: JavaScript protocol blocked ✅
- [ ] Test 5: Event handler blocked ✅
- [ ] Test 8: localStorage cleanup works ✅
- [ ] Test 10: CSP enforcement active ✅

---

### ✅ Browser Testing

Test in multiple browsers:

- [ ] Chrome/Edge (latest)
  - CSP violations in Console
  - No XSS execution
  - App Check initialized

- [ ] Firefox (latest)
  - CSP warnings visible
  - Sanitization works
  
- [ ] Safari (latest)
  - CSP active
  - No script execution

---

## Deployment Steps

### 1. Build for Production

```bash
bun install
bun run build
```

**Expected Output:**
- ✅ No errors
- ✅ Bundle size reasonable
- ✅ CSP in index.html

---

### 2. Test Production Build Locally

```bash
bun run preview
```

**Manual Tests:**
1. Open http://localhost:4173
2. Check browser console for:
   ```
   ✅ Firebase App Check initialized
   ```
3. Try XSS payload in form field
4. Verify it's blocked/sanitized

---

### 3. Deploy to Hosting

#### Firebase Hosting:
```bash
firebase deploy --only hosting
```

#### Vercel:
```bash
vercel --prod
```

#### Netlify:
```bash
netlify deploy --prod
```

---

### 4. Post-Deployment Verification

- [ ] Visit production URL
- [ ] Check browser DevTools Console:
  - [ ] No CSP violations (except GTM - expected)
  - [ ] App Check initialized successfully
  - [ ] No JavaScript errors

- [ ] Test form submission:
  - [ ] Enter valid data → Should work
  - [ ] Enter XSS payload → Should be blocked/sanitized
  - [ ] Check Firebase → Data should be sanitized

- [ ] Check Network tab:
  - [ ] Firebase requests include App Check token
  - [ ] No unauthorized API calls succeed

---

## Monitoring Setup

### ✅ Firebase Console

- [ ] Enable Firebase Performance Monitoring
- [ ] Set up App Check metrics dashboard
- [ ] Configure error reporting

### ✅ Browser Analytics

- [ ] Monitor CSP violation reports
- [ ] Track failed validations
- [ ] Log suspicious input attempts

### ✅ Security Scanning

- [ ] Run OWASP ZAP scan on production URL
- [ ] Check SSL Labs: https://www.ssllabs.com/ssltest/
- [ ] Verify CSP: https://csp-evaluator.withgoogle.com/

---

## Emergency Rollback Plan

If security issues detected after deployment:

### Immediate Actions:
1. Revert to previous version:
   ```bash
   firebase hosting:rollback  # or platform-specific command
   ```

2. Disable affected features temporarily

3. Review logs for attack patterns

4. Apply hotfix and redeploy

---

## Post-Deployment Testing

### Production Smoke Tests:

1. **XSS Test (Safe):**
   - Enter in name field: `Test User <script>alert(1)</script>`
   - Expected: Saved as plain text
   - Check Firebase: Should be sanitized

2. **API Abuse Test:**
   ```bash
   curl -X POST https://your-domain.com/api/endpoint \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```
   - Expected: 403 Forbidden (App Check)

3. **CSP Verification:**
   - Open DevTools Console
   - Run: `eval('alert(1)')`
   - Expected: CSP violation error

---

## Documentation Updates

- [ ] Update README with security notes
- [ ] Document environment variables
- [ ] Add security contact information
- [ ] Create incident response plan

---

## Compliance Checks

- [ ] GDPR compliance verified
- [ ] Data retention policies documented
- [ ] Privacy policy updated
- [ ] Terms of service reviewed

---

## Team Communication

### Notify Team About:

1. **New Environment Variables**
   - All developers need `VITE_RECAPTCHA_SITE_KEY`
   - Update CI/CD pipelines

2. **Security Changes**
   - Share SECURITY.md
   - Review input validation rules
   - Discuss CSP implications

3. **Testing Requirements**
   - Run security tests before commits
   - Follow secure coding guidelines

---

## Success Criteria

Deployment is successful when:

- ✅ All XSS tests pass
- ✅ CSP enforced (check Console)
- ✅ App Check active (check Network)
- ✅ Forms work correctly
- ✅ No legitimate users blocked
- ✅ Sanitization transparent to users
- ✅ Performance acceptable (<2s load time)

---

## Final Checklist

Before marking deployment complete:

- [ ] Production URL accessible
- [ ] SSL certificate valid
- [ ] CSP active and no errors
- [ ] App Check initialized
- [ ] XSS tests all pass
- [ ] Firebase data sanitized
- [ ] No broken functionality
- [ ] Analytics tracking
- [ ] Error monitoring active
- [ ] Team notified
- [ ] Documentation updated
- [ ] Rollback plan ready

---

## Support Resources

- **Security Docs:** SECURITY.md
- **Testing Guide:** SECURITY_TESTING.md
- **Quick Reference:** README_SECURITY.md
- **Firebase Docs:** https://firebase.google.com/docs
- **DOMPurify:** https://github.com/cure53/DOMPurify
- **CSP Guide:** https://content-security-policy.com/

---

**Deployment Date:** _____________

**Deployed By:** _____________

**Verified By:** _____________

**Status:** 🟢 APPROVED / 🔴 BLOCKED

---

## Notes

_Add any deployment-specific notes here_

---

**Next Security Review:** In 3 months (April 2026)
