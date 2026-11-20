import express from 'express';
import {
  getDashboardStats,
  getCandidates,
  getCandidateDetails,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getPartners,
  addPartner,
  updatePartner,
  deletePartner,
  getMemberships,
  addMembership,
  updateMembership,
  deleteMembership,
  getLMSCourses,
  addLMSCourse,
  updateLMSCourse,
  deleteLMSCourse,
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAuditLogs,
  getSystemSettings,
  updateSystemSettings,
  getFirebaseStatusEndpoint,
  testFirebaseEndpoint,
  syncFirebaseEndpoint,
  updateFirebaseConfigEndpoint,
  getFirebaseCollectionsEndpoint,
  syncFirebaseSingleCollectionEndpoint,
  getFirebaseCollectionDataEndpoint,
} from '../controllers/adminController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate, requireAdmin);

router.get('/dashboard', getDashboardStats);

// Candidates CRUD
router.get('/candidates', getCandidates);
router.post('/candidates', createCandidate);
router.get('/candidates/:candidateId', getCandidateDetails);
router.put('/candidates/:candidateId', updateCandidate);
router.delete('/candidates/:candidateId', deleteCandidate);

// Training Partners CRUD
router.get('/partners', getPartners);
router.post('/partners', addPartner);
router.put('/partners/:id', updatePartner);
router.delete('/partners/:id', deletePartner);

// Memberships CRUD
router.get('/memberships', getMemberships);
router.post('/memberships', addMembership);
router.put('/memberships/:id', updateMembership);
router.delete('/memberships/:id', deleteMembership);

// LMS Courses CRUD
router.get('/lms-courses', getLMSCourses);
router.post('/lms-courses', addLMSCourse);
router.put('/lms-courses/:id', updateLMSCourse);
router.delete('/lms-courses/:id', deleteLMSCourse);

// Announcements CRUD
router.get('/announcements', getAnnouncements);
router.post('/announcements', createAnnouncement);
router.put('/announcements/:id', updateAnnouncement);
router.delete('/announcements/:id', deleteAnnouncement);

router.get('/audit-logs', getAuditLogs);
router.get('/settings', getSystemSettings);
router.post('/settings', updateSystemSettings);

// Firebase Dynamic Cloud Integration Endpoints
router.get('/firebase/status', getFirebaseStatusEndpoint);
router.get('/firebase/collections', getFirebaseCollectionsEndpoint);
router.post('/firebase/test', testFirebaseEndpoint);
router.post('/firebase/sync', syncFirebaseEndpoint);
router.post('/firebase/sync/:name', syncFirebaseSingleCollectionEndpoint);
router.get('/firebase/collection-data/:name', getFirebaseCollectionDataEndpoint);
router.post('/firebase/config', updateFirebaseConfigEndpoint);

export default router;

