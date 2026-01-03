import { upload } from '../config/multer.js';
import { errorResponse } from '../utils/responseHandler.js';
import { validateVideoFile } from '../utils/fileValidator.js';

export const uploadVideo = (req, res, next) => {
  upload.single('video')(req, res, (err) => {
    if (err) {
      return errorResponse(res, err.message, 400);
    }

    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400);
    }

    const validation = validateVideoFile(req.file);
    if (!validation.valid) {
      return errorResponse(res, validation.error, 400);
    }

    next();
  });
};