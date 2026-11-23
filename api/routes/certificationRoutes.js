import express from 'express';
import {
  getCertifications,
  getCertificationById,
  getCandidateCertificationStatus,
  createCertification,
  updateCertification,
  toggleStatus,
  deleteCertification,
} from '../controllers/certificationController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCertifications);
router.get('/candidate-status', authenticate, getCandidateCertificationStatus);
router.get('/:id', getCertificationById);

// Admin routes
router.post('/', authenticate, requireAdmin, createCertification);
router.put('/:id', authenticate, requireAdmin, updateCertification);
router.delete('/:id', authenticate, requireAdmin, deleteCertification);
router.patch('/:id/toggle-status', authenticate, requireAdmin, toggleStatus);

export default router;

