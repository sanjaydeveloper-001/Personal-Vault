import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateUsername,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { initForgotPassword, resetPassword, setSecurityQuestions, verifyAnswer } from '../controllers/securityController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);
router.get('/profile', protect, getProfile);
router.put('/update-username', protect, updateUsername);


router.post('/security-questions', protect, setSecurityQuestions);

// Forgot password flow
router.post('/forgot-password/init', initForgotPassword);
router.post('/forgot-password/verify', verifyAnswer);
router.post('/reset-password', resetPassword);

export default router;