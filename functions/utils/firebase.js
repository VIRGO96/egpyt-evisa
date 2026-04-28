const admin = require("firebase-admin");
const serviceAccount = require("../ieta-uk-platform-firebase-adminsdk-fbsvc-c3ea1a8027.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
  });
}

const db = admin.firestore();

module.exports = { admin, db };
