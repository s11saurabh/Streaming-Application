import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize('admin', 'editor'), getAllUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, authorize('admin', 'editor'), updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

export default router;