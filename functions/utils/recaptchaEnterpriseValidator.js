const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

// Validates a reCAPTCHA Enterprise token by creating an assessment
// Returns { valid: boolean, score?: number, reasons?: string[], error?: string }
async function validateEnterpriseToken({ token, siteKey, expectedAction = 'payment', minScore = 0.5 }) {
  try {
    if (!token) return { valid: false, error: 'No token provided' };
    if (!siteKey) return { valid: false, error: 'Missing siteKey' };

    const client = new RecaptchaEnterpriseServiceClient();
    const projectId = process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT || 'ieta-uk-platform';
    const parent = client.projectPath(projectId);

    const request = {
      parent,
      assessment: {
        event: {
          token,
          siteKey,
          expectedAction,
        },
      },
    };

    const [response] = await client.createAssessment(request);

    const props = response.tokenProperties;
    if (!props || !props.valid) {
      return { valid: false, error: props?.invalidReason || 'Invalid token' };
    }

    if (props.action !== expectedAction) {
      return { valid: false, error: `Action mismatch (expected: ${expectedAction}, got: ${props.action})` };
    }

    const score = response.riskAnalysis?.score ?? 0;
    const reasons = response.riskAnalysis?.reasons || [];
    return { valid: score >= minScore, score, reasons };
  } catch (err) {
    return { valid: false, error: `Enterprise validation error: ${err.message}` };
  }
}

module.exports = { validateEnterpriseToken };
