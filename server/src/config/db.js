import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { syncDocToFirestore, deleteDocFromFirestore, syncCollectionToFirestore } from './firebase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory cache + file sync
const cache = {};

function getFilePath(collectionName) {
  return path.join(DATA_DIR, `${collectionName}.json`);
}

function loadCollection(collectionName) {
  if (cache[collectionName]) {
    return cache[collectionName];
  }
  const filePath = getFilePath(collectionName);
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      cache[collectionName] = JSON.parse(content || '[]');
    } catch (err) {
      console.error(`Error reading ${collectionName}.json:`, err);
      cache[collectionName] = [];
    }
  } else {
    cache[collectionName] = [];
    saveCollection(collectionName, []);
  }
  return cache[collectionName];
}

function saveCollection(collectionName, data) {
  cache[collectionName] = data;
  const filePath = getFilePath(collectionName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${collectionName}.json:`, err);
  }
}

export const db = {
  getCollection(name) {
    return [...loadCollection(name)];
  },

  getDoc(name, id) {
    const list = loadCollection(name);
    return list.find(item => item.id === id || item._id === id || item.uid === id || item.candidateId === id) || null;
  },

  find(name, predicate) {
    const list = loadCollection(name);
    return list.filter(predicate);
  },

  findOne(name, predicate) {
    const list = loadCollection(name);
    return list.find(predicate) || null;
  },

  setDoc(name, id, data) {
    const list = loadCollection(name);
    const index = list.findIndex(item => item.id === id || item._id === id || item.uid === id || item.candidateId === id);
    const docData = { ...data, id: id || data.id, updatedAt: new Date().toISOString() };
    if (!docData.createdAt) {
      docData.createdAt = new Date().toISOString();
    }
    if (index >= 0) {
      list[index] = { ...list[index], ...docData };
    } else {
      list.push(docData);
    }
    saveCollection(name, list);
    // Real-time asynchronous Firebase Firestore mirror
    syncDocToFirestore(name, docData.id, docData).catch(() => {});
    return docData;
  },

  addDoc(name, data) {
    const list = loadCollection(name);
    const id = data.id || `${name}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const docData = {
      ...data,
      id,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.push(docData);
    saveCollection(name, list);
    // Real-time asynchronous Firebase Firestore mirror
    syncDocToFirestore(name, docData.id, docData).catch(() => {});
    return docData;
  },

  updateDoc(name, id, updates) {
    const list = loadCollection(name);
    const index = list.findIndex(item => item.id === id || item._id === id || item.uid === id || item.candidateId === id);
    if (index >= 0) {
      list[index] = {
        ...list[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      saveCollection(name, list);
      // Real-time asynchronous Firebase Firestore mirror
      syncDocToFirestore(name, list[index].id || id, list[index]).catch(() => {});
      return list[index];
    }
    return null;
  },

  deleteDoc(name, id) {
    const list = loadCollection(name);
    const target = list.find(item => item.id === id || item._id === id || item.uid === id || item.candidateId === id);
    const filtered = list.filter(item => item.id !== id && item._id !== id && item.uid !== id && item.candidateId !== id);
    saveCollection(name, filtered);
    // Real-time asynchronous Firebase Firestore mirror
    const targetId = target?.id || id;
    deleteDocFromFirestore(name, targetId).catch(() => {});
    return true;
  },

  async syncAllToFirestore() {
    const collections = [
      'candidates',
      'certifications',
      'certificates',
      'exams',
      'examAttempts',
      'examSchedules',
      'results',
      'payments',
      'enrollments',
      'trainingPartners',
      'memberships',
      'auditLogs',
      'systemSettings',
    ];

    const results = {};
    for (const col of collections) {
      const items = loadCollection(col);
      const res = await syncCollectionToFirestore(col, items);
      results[col] = res;
    }
    return results;
  },
};

export default db;

