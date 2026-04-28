const { defineSecret } = require("firebase-functions/params");

const isEmulator = process.env.FUNCTIONS_EMULATOR === "true";

const secrets = {
  TAP_SECRET_KEY_LIVE: defineSecret("TAP_SECRET_KEY_LIVE"),
  TAP_PUBLIC_KEY_LIVE: defineSecret("TAP_PUBLIC_KEY_LIVE"),
  TAP_MERCHANT_ID: defineSecret("TAP_MERCHANT_ID"),
  TAP_USERNAME: defineSecret("TAP_USERNAME"),
  TAP_PASSWORD: defineSecret("TAP_PASSWORD"),
  TAP_API_KEY: defineSecret("TAP_API_KEY"),
  STORAGE_BUCKET: defineSecret("STORAGE_BUCKET"),
  TAP_REDIRECT_URL: defineSecret("TAP_REDIRECT_URL"),
  SENDGRID_API_KEY: defineSecret("SENDGRID_API_KEY"),
  TAP_SECRET_KEY_TEST: defineSecret("TAP_SECRET_KEY_TEST"),
  RECAPTCHA_SECRET_KEY: defineSecret("RECAPTCHA_SECRET_KEY"),
  RECAPTCHA_SITE_KEY: defineSecret("RECAPTCHA_SITE_KEY"),
  API_KEY: defineSecret("API_KEY"),
  API_SECRET: defineSecret("API_SECRET"),
  ENCRYPTION_KEY: defineSecret("ENCRYPTION_KEY"),
  ALGOLIA_APP_ID: defineSecret("ALGOLIA_APP_ID"),
  ALGOLIA_ADMIN_KEY: defineSecret("ALGOLIA_ADMIN_KEY"),
  ALGOLIA_APPLICATION_INDEX: defineSecret("ALGOLIA_APPLICATION_INDEX"),
};

const getSecrets = async (requestedKeys) => {
  const keys = Array.isArray(requestedKeys) && requestedKeys.length > 0
    ? requestedKeys
    : Object.keys(secrets);

  const resolvedEntries = [];

  for (const key of keys) {
    if (!(key in secrets)) {
      continue;
    }

    if (process.env[key]) {
      resolvedEntries.push([key, process.env[key]]);
      continue;
    }

    if (isEmulator) {
      resolvedEntries.push([key, process.env[key]]);
      continue;
    }

    const value = await secrets[key].value();
    resolvedEntries.push([key, value]);
  }

  return Object.fromEntries(resolvedEntries);
};

module.exports = {
  secrets,       
  getSecrets     
};
