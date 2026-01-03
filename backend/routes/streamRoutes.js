import express from 'express';
import { streamVideo, getThumbnail } from '../controllers/streamController.js';

const router = express.Router();

// Public routes - no authentication required for streaming
router.get('/:id', streamVideo);
router.get('/:id/thumbnail', getThumbnail);

export default router;