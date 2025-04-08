// src/lib/firebase/config.ts

// Ensure environment variables are loaded (e.g., in .env.local)
// Example variables - replace with your actual project config names if different
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAvgAyrw6bv5QSvTrPfrgMkvbQII9YjlUk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "final-side.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "final-side",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "final-side.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "379438193426",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:379438193426:web:68359f60631851e70ab1cb",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-QLTX8D1N6R"
};

// Basic validation to ensure config values are present (optional but helpful)
export function validateFirebaseConfig() {
  const requiredFields = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];
  
  const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
  
  if (missingFields.length > 0) {
    console.error(`Missing required Firebase config fields: ${missingFields.join(', ')}`);
    return false;
  }
  
  return true;
}

export default firebaseConfig;