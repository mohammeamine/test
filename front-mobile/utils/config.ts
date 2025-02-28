// API Configuration
export const API_URL = 'http://localhost:3000/api';
// export const API_URL = 'http://10.0.2.2:3000/api'; // Android Emulator

// File Upload Configuration
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/jpeg',
  'image/png',
  'text/plain',
];

// Authentication Configuration
export const AUTH_STORAGE_KEY = 'authToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

// Cache Configuration
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
export const MAX_CACHE_SIZE = 100; // Maximum number of items to cache

// UI Configuration
export const TOAST_DURATION = 3000; // 3 seconds
export const DEFAULT_ANIMATION_DURATION = 300; // 300ms

// Feature Flags
export const FEATURES = {
  OFFLINE_MODE: true,
  DOCUMENT_PREVIEW: true,
  FILE_SHARING: true,
  PUSH_NOTIFICATIONS: true,
  enableBackend: false, // Set to false to use placeholder data
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'File type not supported.',
  UPLOAD_FAILED: 'Failed to upload file. Please try again.',
  DOWNLOAD_FAILED: 'Failed to download file. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
}; 