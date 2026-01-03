export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

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

export const MAX_FILE_SIZE = 500 * 1024 * 1024;

export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/avi', 'video/mkv', 'video/mov'];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  UPLOAD: '/upload',
  LIBRARY: '/library',
  VIDEO_DETAIL: '/video',
  ADMIN: '/admin'
};