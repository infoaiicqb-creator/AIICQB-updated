import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Official Firebase Web Configuration for AIICQB Project
export const firebaseConfig = {
  apiKey: "AIzaSyDNEP9BQ0WDwiVm7tgyZg5cGHwTz4zBFwg",
  authDomain: "aiicqb.firebaseapp.com",
  projectId: "aiicqb",
  storageBucket: "aiicqb.firebasestorage.app",
  messagingSenderId: "264513188105",
  appId: "1:264513188105:web:898df76665fde15ee7a3d8",
  measurementId: "G-TJLMTN5XT5"
};

// Initialize Firebase App instance singleton
export const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase Core Services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

export default app;
