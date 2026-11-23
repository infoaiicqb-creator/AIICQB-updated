import express from 'express';
import { register, login, googleLogin, getMe, updateProfile, verifyEmail, forgotPassword, changePassword } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateProfile);
router.put('/change-password', authenticate, changePassword);
router.post('/verify-email', authenticate, verifyEmail);
router.post('/forgot-password', forgotPassword);

export default router;

