import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize App Check for security (prevents unauthorized API access)
// Note: App Check temporarily disabled. To re-enable:
// 1) Configure reCAPTCHA v3 site key in Firebase Console → App Check
// 2) Uncomment the code below
//
// if (import.meta.env.VITE_RECAPTCHA_SITE_KEY) {
//   try {
//     initializeAppCheck(app, {
//       provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
//       isTokenAutoRefreshEnabled: true,
//     });
//     console.log('✅ Firebase App Check initialized');
//   } catch (error) {
//     console.warn('⚠️ App Check initialization failed:', error);
//   }
// } else {
//   console.warn('⚠️ VITE_RECAPTCHA_SITE_KEY not found - App Check disabled');
// }

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;

