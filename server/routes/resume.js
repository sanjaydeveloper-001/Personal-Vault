import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getResumes,
  uploadResume,
  deleteResume,
  getPublicResume,
} from '../controllers/resumeController.js';

const router = express.Router();

router.route('/')
  .get(protect, getResumes);

router.post('/upload', protect, uploadResume);

router.route('/:position')
  .delete(protect, deleteResume);

// Public route
router.get('/public/:token', getPublicResume);

export default router;