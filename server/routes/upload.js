import express from 'express';
import { getUploadSignature } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/signature', protect, getUploadSignature);

export default router;