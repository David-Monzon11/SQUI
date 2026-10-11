import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

/**
 * Firebase client configuration for SQUI (project: squi-712f8).
 * Firebase web config values are identifiers, not secrets — data is
 * protected by Firestore Security Rules. EXPO_PUBLIC_FIREBASE_* env vars
 * (see mobile/.env.example) override these defaults when set.
 *
 * NOTE: `firebase/analytics` is intentionally NOT used — getAnalytics()
 * is browser-only and crashes React Native at startup.
 */
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBaQ3uWsfTcbReU9PeLi1f4tdPUjIGiu7c',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'squi-712f8.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'squi-712f8',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'squi-712f8.firebasestorage.app',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '781555104791',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:781555104791:web:7cb5343a6aab1581577052',
};

// Initialize once (safe across Fast Refresh)
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db: Firestore = getFirestore(app);
