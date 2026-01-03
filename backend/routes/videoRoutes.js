import express from 'express';
import { uploadVideo, getVideos, getVideoById, updateVideo, deleteVideo, analyzeVideo } from '../controllers/videoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { uploadVideo as uploadMiddleware } from '../middleware/uploadMiddleware.js';
import { videoUploadValidation } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('editor', 'admin'), uploadMiddleware, videoUploadValidation, uploadVideo);
router.get('/', protect, getVideos);
router.get('/:id', protect, getVideoById);
router.put('/:id', protect, authorize('editor', 'admin'), updateVideo);
router.delete('/:id', protect, authorize('editor', 'admin'), deleteVideo);
router.post('/:id/analyze', protect, authorize('editor', 'admin'), analyzeVideo);

export default router;