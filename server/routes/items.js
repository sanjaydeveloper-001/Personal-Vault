import express from 'express';
import {
  getItems,
  getTrashItems,
  createItem,
  getItemById,
  verifyItemPassword,
  updateItem,
  deleteItem,
  restoreItem,
  permanentDeleteItem,
  emptyTrash,
} from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getItems)
  .post(protect, createItem);

router.get('/trash', protect, getTrashItems);

router.route('/:id')
  .get(protect, getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

router.put('/:id/restore', protect, restoreItem);
router.delete('/:id/permanent', protect, permanentDeleteItem);

router.post('/:id/verify', protect, verifyItemPassword);
router.delete('/trash/empty', protect, emptyTrash);

export default router;