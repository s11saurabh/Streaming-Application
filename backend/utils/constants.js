export const ROLES = {
    VIEWER: 'viewer',
    EDITOR: 'editor',
    ADMIN: 'admin'
  };
  
  export const VIDEO_STATUS = {
    UPLOADING: 'uploading',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed'
  };
  
  export const SENSITIVITY_STATUS = {
    PENDING: 'pending',
    SAFE: 'safe',
    FLAGGED: 'flagged'
  };
  
  export const ALLOWED_VIDEO_EXTENSIONS = ['.mp4', '.avi', '.mkv', '.mov'];
  
  export const MAX_FILE_SIZE = 500 * 1024 * 1024;
  
  export const ERROR_MESSAGES = {
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Forbidden access',
    NOT_FOUND: 'Resource not found',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Internal server error',
    INVALID_CREDENTIALS: 'Invalid credentials',
    USER_EXISTS: 'User already exists',
    VIDEO_NOT_FOUND: 'Video not found',
    UPLOAD_FAILED: 'Upload failed',
    PROCESSING_FAILED: 'Processing failed'
  };