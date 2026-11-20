import express from 'express';
import {
  createTicket,
  getCandidateTickets,
  getAllTicketsAdmin,
  replyTicket,
  submitContactForm,
} from '../controllers/supportController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public contact inquiry
router.post('/contact', submitContactForm);

// Candidate routes
router.post('/tickets', authenticate, createTicket);
router.get('/my-tickets', authenticate, getCandidateTickets);

// Admin routes
router.get('/admin/tickets', authenticate, requireAdmin, getAllTicketsAdmin);
router.post('/admin/tickets/:id/reply', authenticate, requireAdmin, replyTicket);

export default router;

