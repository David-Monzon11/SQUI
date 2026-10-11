import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

/**
 * Firebase client configuration for SQUI.
 * Values come from EXPO_PUBLIC_* env vars (see mobile/.env.example).
 * Note: Firebase web config keys are identifiers, not secrets —
 * data is protected by Firestore Security Rules.
 */
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured: boolean = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

if (!isFirebaseConfigured) {
  console.warn(
    '[Firebase] Missing EXPO_PUBLIC_FIREBASE_* env vars. Firestore features are disabled until configured.'
  );
}

// Initialize once (safe across Fast Refresh)
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db: Firestore = getFirestore(app);
