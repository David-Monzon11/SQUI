import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

/**
 * Firebase client configuration for SQUI (project: squi-f5c53).
 * Firebase web config values are identifiers, not secrets — data is
 * protected by Firestore Security Rules. EXPO_PUBLIC_FIREBASE_* env vars
 * (see mobile/.env.example) override these defaults when set.
 *
 * NOTE: `firebase/analytics` is intentionally NOT used — getAnalytics()
 * is browser-only and crashes React Native at startup.
 */
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'AIzaSyAd1ZgIIgZxFedEbI3QsPasLpcenIu0WhM',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'squi-f5c53.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'squi-f5c53',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'squi-f5c53.firebasestorage.app',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '977627871062',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:977627871062:web:e20586450a6fad46c408f7',
};

// Initialize once (safe across Fast Refresh)
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db: Firestore = getFirestore(app);
