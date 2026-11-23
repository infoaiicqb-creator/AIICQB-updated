import express from 'express';
import {
  createOrder,
  verifyPayment,
  handleTestQrScan,
  getPaymentStatus,
  handleWebhook,
  getCandidatePayments,
  getPaymentById,
  processRefund,
  getAllPaymentsAdmin,
  updatePaymentAdmin,
  deletePaymentAdmin,
  createPaymentAdmin,
} from '../controllers/paymentController.js';
import { authenticate, optionalAuthenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Candidate / Authenticated & Guest routes
router.post('/create-order', optionalAuthenticate, createOrder);
router.post('/verify', optionalAuthenticate, verifyPayment);
router.all('/test-qr-scan', handleTestQrScan);
router.get('/status/:paymentId', getPaymentStatus);
router.get('/:paymentId', authenticate, getPaymentById);
router.get('/candidate/:candidateId', authenticate, getCandidatePayments);

// Webhook endpoint (verified via HMAC signature)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Admin routes
router.get('/admin/all', authenticate, requireAdmin, getAllPaymentsAdmin);
router.post('/admin/create', authenticate, requireAdmin, createPaymentAdmin);
router.put('/admin/:id', authenticate, requireAdmin, updatePaymentAdmin);
router.delete('/admin/:id', authenticate, requireAdmin, deletePaymentAdmin);
router.post('/refund', authenticate, requireAdmin, processRefund);

export default router;

