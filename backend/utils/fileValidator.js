import path from 'path';
import { ALLOWED_VIDEO_EXTENSIONS, MAX_FILE_SIZE } from './constants.js';

export const validateVideoFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_VIDEO_EXTENSIONS.includes(ext)) {
    return { valid: false, error: 'Invalid file type' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size exceeds limit' };
  }

  return { valid: true };
};

export const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
};