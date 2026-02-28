// Item types
export const ITEM_TYPES = {
  NOTE: 'note',
  LINK: 'link',
  FILE: 'file',
};

// Human-readable labels for item types
export const ITEM_TYPE_LABELS = {
  [ITEM_TYPES.NOTE]: 'Note',
  [ITEM_TYPES.LINK]: 'Link',
  [ITEM_TYPES.FILE]: 'File',
};

// Color mappings for item types (for UI)
export const ITEM_TYPE_COLORS = {
  [ITEM_TYPES.NOTE]: 'yellow',
  [ITEM_TYPES.LINK]: 'green',
  [ITEM_TYPES.FILE]: 'blue',
};

// Default pagination
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE = 1;

// Trash / restore actions
export const TRASH_ACTIONS = {
  RESTORE: 'restore',
  PERMANENT_DELETE: 'permanent_delete',
};

// Modal types (if using a modal manager)
export const MODAL_TYPES = {
  CREATE_ITEM: 'CREATE_ITEM',
  EDIT_ITEM: 'EDIT_ITEM',
  PASSWORD_PROMPT: 'PASSWORD_PROMPT',
  CONFIRM_DELETE: 'CONFIRM_DELETE',
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'vaultnotes-theme',
  SIDEBAR_COLLAPSED: 'vaultnotes-sidebar-collapsed',
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
};

// App info
export const APP_NAME = 'VaultNotes';
export const APP_VERSION = '1.0.0';

// Cloudinary upload settings
export const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/';
export const CLOUDINARY_UPLOAD_PRESET = 'vaultnotes'; // optional, if using unsigned uploads

// File size limits (in bytes)
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  // add more as needed
];