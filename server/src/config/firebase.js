import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

let firebaseApp = null;
let firestoreDb = null;
let firebaseAuth = null;
let connectionStatus = {
  isConfigured: false,
  isConnected: false,
  mode: 'Local Persistent Hybrid Storage',
  projectId: process.env.FIREBASE_PROJECT_ID || 'aicqb-prod',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
  lastSyncAt: null,
  syncedCollectionsCount: 0,
  error: null,
};

export function initFirebase(customConfig = null) {
  try {
    const serviceAccountPath = path.resolve('server/src/config/serviceAccountKey.json');
    let credential = null;
    let projectId = customConfig?.projectId || process.env.FIREBASE_PROJECT_ID || 'aicqb-prod';
    let clientEmail = customConfig?.clientEmail || process.env.FIREBASE_CLIENT_EMAIL || '';
    let privateKey = customConfig?.privateKey || process.env.FIREBASE_PRIVATE_KEY || '';

    // If customConfig has serviceAccountJson string or object
    if (customConfig?.serviceAccountJson) {
      try {
        const saObj = typeof customConfig.serviceAccountJson === 'string'
          ? JSON.parse(customConfig.serviceAccountJson)
          : customConfig.serviceAccountJson;
        
        fs.writeFileSync(serviceAccountPath, JSON.stringify(saObj, null, 2), 'utf-8');
        credential = admin.credential.cert(saObj);
        projectId = saObj.project_id || projectId;
        clientEmail = saObj.client_email || clientEmail;
      } catch (saErr) {
        console.warn('[Firebase] Failed to parse provided serviceAccountJson:', saErr.message);
      }
    }

    // Handle escaped newlines in private key
    if (privateKey && privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    // Check if serviceAccountKey.json exists on disk
    if (!credential && fs.existsSync(serviceAccountPath)) {
      try {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
        if (serviceAccount.private_key && serviceAccount.client_email) {
          credential = admin.credential.cert(serviceAccount);
          projectId = serviceAccount.project_id || projectId;
          clientEmail = serviceAccount.client_email || clientEmail;
        }
      } catch (e) {
        console.warn('Failed to parse serviceAccountKey.json:', e.message);
      }
    }

    // Check manual private key & client email
    if (!credential && privateKey && privateKey.length > 30 && clientEmail) {
      credential = admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      });
    }

    // Check if Google Application Credentials file explicitly set in env
    if (!credential && process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
      credential = admin.credential.applicationDefault();
    }

    connectionStatus.projectId = projectId;
    connectionStatus.clientEmail = clientEmail;

    if (credential) {
      // Re-initialize app if already exists
      if (admin.apps.length > 0) {
        const existingApp = admin.app();
        existingApp.delete().catch(() => {});
      }

      firebaseApp = admin.initializeApp({
        credential,
        projectId,
      });

      firestoreDb = admin.firestore(firebaseApp);
      firebaseAuth = admin.auth(firebaseApp);

      connectionStatus.isConfigured = true;
      connectionStatus.isConnected = true;
      connectionStatus.mode = 'Live Google Cloud Firestore';
      connectionStatus.error = null;
      console.log(`[Firebase] Initialized dynamic Firebase Admin SDK for project: ${connectionStatus.projectId}`);
    } else {
      connectionStatus.isConfigured = !!projectId;
      connectionStatus.isConnected = false;
      connectionStatus.mode = 'Local Persistent Hybrid Storage';
      connectionStatus.error = 'Awaiting Service Account private key or serviceAccountKey.json configuration.';
      firestoreDb = null;
      firebaseAuth = null;
      console.log(`[Firebase] Running in Local Persistent Hybrid Storage (Awaiting Cloud Credentials for ${projectId})`);
    }
  } catch (err) {
    connectionStatus.isConfigured = !!(process.env.FIREBASE_PROJECT_ID || customConfig?.projectId);
    connectionStatus.isConnected = false;
    connectionStatus.mode = 'Local Persistent Hybrid Storage';
    connectionStatus.error = err.message;
    firestoreDb = null;
    firebaseAuth = null;
    console.warn(`[Firebase] Running in local hybrid mode: ${err.message}`);
  }

  return { firebaseApp, firestoreDb, firebaseAuth, status: connectionStatus };
}

// Initial bootstrap
initFirebase();

export function getFirestore() {
  if (!firestoreDb && connectionStatus.isConfigured) {
    initFirebase();
  }
  return firestoreDb;
}

export function getAuth() {
  if (!firebaseAuth && connectionStatus.isConfigured) {
    initFirebase();
  }
  return firebaseAuth;
}

export function getFirebaseStatus() {
  return {
    ...connectionStatus,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Sync a single document to Firebase Firestore in real-time
 */
export async function syncDocToFirestore(collectionName, docId, data) {
  if (!firestoreDb || !connectionStatus.isConnected) return false;
  try {
    const docRef = firestoreDb.collection(collectionName).doc(String(docId));
    await docRef.set(
      {
        ...data,
        syncedToFirestoreAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    connectionStatus.lastSyncAt = new Date().toISOString();
    return true;
  } catch (err) {
    console.error(`[Firebase] Error syncing ${collectionName}/${docId} to Firestore:`, err.message);
    return false;
  }
}

/**
 * Delete a document from Firebase Firestore in real-time
 */
export async function deleteDocFromFirestore(collectionName, docId) {
  if (!firestoreDb || !connectionStatus.isConnected) return false;
  try {
    await firestoreDb.collection(collectionName).doc(String(docId)).delete();
    return true;
  } catch (err) {
    console.error(`[Firebase] Error deleting ${collectionName}/${docId} from Firestore:`, err.message);
    return false;
  }
}

/**
 * Fully sync an entire collection to Firebase Firestore
 */
export async function syncCollectionToFirestore(collectionName, items) {
  if (!firestoreDb || !connectionStatus.isConnected) {
    return { success: false, message: 'Firebase Firestore is not connected', count: 0 };
  }
  try {
    const batch = firestoreDb.batch();
    const colRef = firestoreDb.collection(collectionName);
    let count = 0;

    for (const item of items) {
      const docId = String(item.id || item.uid || item.candidateId || item.certificateNo || `item_${count}`);
      const docRef = colRef.doc(docId);
      batch.set(
        docRef,
        {
          ...item,
          syncedToFirestoreAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      count++;
    }

    await batch.commit();
    connectionStatus.lastSyncAt = new Date().toISOString();
    connectionStatus.syncedCollectionsCount = (connectionStatus.syncedCollectionsCount || 0) + 1;
    return { success: true, count, collection: collectionName };
  } catch (err) {
    console.error(`[Firebase] Bulk sync failed for ${collectionName}:`, err.message);
    return { success: false, error: err.message, count: 0 };
  }
}

/**
 * Test Firebase Connection and Firestore responsiveness
 */
export async function testFirebaseConnection() {
  const status = getFirebaseStatus();
  if (!firestoreDb) {
    return {
      connected: false,
      status: 'Standby / Local Fallback Mode',
      projectId: status.projectId,
      message: 'Firebase is running in local persistent JSON mode. To connect to live cloud Firestore, enter valid Service Account credentials in System Settings.',
    };
  }

  try {
    const start = Date.now();
    const pingRef = firestoreDb.collection('_system_health').doc('ping');
    await pingRef.set({
      pingAt: admin.firestore.FieldValue.serverTimestamp(),
      platform: 'AICQB Executive System',
      version: '2026.1.0-PROD',
    });
    const latencyMs = Date.now() - start;

    return {
      connected: true,
      status: 'Live & Synchronized',
      projectId: status.projectId,
      latencyMs,
      message: `Successfully connected to Firebase Firestore (${status.projectId}) in ${latencyMs}ms.`,
    };
  } catch (err) {
    return {
      connected: false,
      status: 'Configuration Error',
      projectId: status.projectId,
      error: err.message,
      message: `Firebase connection test failed: ${err.message}`,
    };
  }
}

export default {
  initFirebase,
  getFirestore,
  getAuth,
  getFirebaseStatus,
  syncDocToFirestore,
  deleteDocFromFirestore,
  syncCollectionToFirestore,
  testFirebaseConnection,
};
