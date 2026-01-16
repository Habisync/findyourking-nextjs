/**
 * FindYourKing - App Constants
 * Royal purple/cyan/gold branding and configuration
 */

// Brand Colors
export const COLORS = {
  primary: {
    purple: '#6B46C1',    // Royal Purple
    cyan: '#06B6D4',      // Cyan
    gold: '#F59E0B',      // Gold
  },
  secondary: {
    darkPurple: '#553C9A',
    lightCyan: '#22D3EE',
    darkGold: '#D97706',
  },
  neutral: {
    dark: '#1F2937',
    light: '#F9FAFB',
    gray: '#6B7280',
  },
  status: {
    online: '#10B981',
    away: '#F59E0B',
    offline: '#6B7280',
  },
} as const;

// App Configuration
export const APP_CONFIG = {
  name: 'FindYourKing',
  tagline: 'Royal Dating for Kings',
  description: 'Premium LGBTQ+ dating app combining the best features of MachoBB and ROMEO',
  version: '1.0.0',
  author: 'Habisync',
} as const;

// Feature Flags
export const FEATURES = {
  geolocationRadar: true,
  streamChat: true,
  premiumSubscription: true,
  events: true,
  groups: true,
  videoChat: true,
  voiceMessages: true,
  stories: true,
} as const;

// Geolocation Settings
export const GEO_CONFIG = {
  defaultRadius: 50,        // km
  maxRadius: 500,          // km
  minRadius: 1,            // km
  updateInterval: 30000,   // ms (30 seconds)
} as const;

// Chat Configuration
export const CHAT_CONFIG = {
  maxMessageLength: 5000,
  typingIndicatorTimeout: 3000, // ms
  messageLoadLimit: 50,
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxFileSize: 10 * 1024 * 1024, // 10MB
} as const;

// Profile Configuration
export const PROFILE_CONFIG = {
  minAge: 18,
  maxAge: 99,
  maxPhotos: 9,
  maxBio: 500,
  maxInterests: 20,
  requiredFields: ['displayName', 'dateOfBirth', 'location'],
} as const;

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'Basic profile',
      'Limited messages',
      'View nearby users',
      'Basic filters',
    ],
  },
  plus: {
    name: 'Plus',
    price: 9.99,
    interval: 'month',
    features: [
      'Unlimited messages',
      'Advanced filters',
      'See who viewed you',
      'Read receipts',
      'Priority support',
    ],
  },
  premium: {
    name: 'Premium',
    price: 19.99,
    interval: 'month',
    features: [
      'All Plus features',
      'Unlimited rewinds',
      'Boost profile',
      'Incognito mode',
      'Travel mode',
      'Video chat',
    ],
  },
} as const;

// Match Configuration
export const MATCH_CONFIG = {
  dailyLikeLimit: 100,      // free users
  premiumLikeLimit: -1,     // unlimited
  matchExpirationDays: 30,
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  NEW_MATCH: 'new_match',
  NEW_MESSAGE: 'new_message',
  PROFILE_VIEW: 'profile_view',
  LIKE_RECEIVED: 'like_received',
  EVENT_REMINDER: 'event_reminder',
  GROUP_INVITE: 'group_invite',
} as const;

// Navigation Routes
export const ROUTES = {
  home: '/',
  browse: '/browse',
  discover: '/radar/discover',
  matches: '/matches',
  messages: '/messages',
  chat: '/chat',
  profile: '/profile',
  settings: '/settings',
  premium: '/premium',
  events: '/events',
  groups: '/groups',
  nearby: '/nearby',
  liked: '/liked',
  favorites: '/favorites',
  visitors: '/visitors',
  notifications: '/notifications',
  help: '/help',
  about: '/about',
  privacy: '/privacy',
  terms: '/terms',
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  auth: '/api/auth',
  users: '/api/users',
  profiles: '/api/profiles',
  matches: '/api/matches',
  messages: '/api/messages',
  likes: '/api/likes',
  events: '/api/events',
  groups: '/api/groups',
  notifications: '/api/notifications',
  geolocation: '/api/geolocation',
  upload: '/api/upload',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  authToken: 'fyk_auth_token',
  refreshToken: 'fyk_refresh_token',
  userId: 'fyk_user_id',
  preferences: 'fyk_preferences',
  theme: 'fyk_theme',
  location: 'fyk_location',
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/findyourking',
  twitter: 'https://twitter.com/findyourking',
  discord: 'https://discord.gg/findyourking',
} as const;

// Regex Patterns
export const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  username: /^[a-zA-Z0-9_]{3,20}$/,
  url: /^https?:\/\/.+/,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_ERROR: 'Authentication failed. Please log in again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  PERMISSION_DENIED: 'You do not have permission to perform this action.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully!',
  MESSAGE_SENT: 'Message sent!',
  MATCH_CREATED: 'It\'s a match! 👑',
  PHOTO_UPLOADED: 'Photo uploaded successfully!',
  SETTINGS_SAVED: 'Settings saved!',
} as const;
