import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 🔒 SECURITY: Emergency cleanup of malicious localStorage entries
// This removes any XSS payloads that may have been persisted
try {
  localStorage.removeItem('__pwned');
  localStorage.removeItem('__payload');
  localStorage.removeItem('__xss');
  localStorage.removeItem('__malicious');
  
  // Clean up any localStorage keys that contain suspicious patterns
  const suspiciousPatterns = /<script|javascript:|onerror|onload/i;
  Object.keys(localStorage).forEach(key => {
    const value = localStorage.getItem(key);
    if (value && suspiciousPatterns.test(value)) {
      console.warn(`🔒 Removed suspicious localStorage key: ${key}`);
      localStorage.removeItem(key);
    }
  });
} catch (error) {
  console.error('Error during localStorage cleanup:', error);
}

createRoot(document.getElementById("root")!).render(<App />);
