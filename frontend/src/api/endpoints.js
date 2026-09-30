/**
 * API endpoint configuration — change paths here to match actual backend routes.
 * The frontend reads from this single file, so nothing breaks if the backend renames endpoints.
 */
export const API_ENDPOINTS = {
  // Auth
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    me: '/api/auth/me',
  },

  // User / Profile
  user: {
    profile: '/api/user/profile',
    update: '/api/user/profile',
    onboarding: '/api/user/onboarding',
    onboardingComplete: '/api/user/onboarding/complete',
  },

  // Chat / ATHENA
  chat: {
    send: '/api/chat',
    history: '/api/chat/history',
  },

  // Tasks
  tasks: {
    list: '/api/tasks',
    create: '/api/tasks',
    update: (id) => `/api/tasks/${id}`,
    delete: (id) => `/api/tasks/${id}`,
    complete: (id) => `/api/tasks/${id}/complete`,
  },

  // Reminders
  reminders: {
    list: '/api/reminders',
    create: '/api/reminders',
    update: (id) => `/api/reminders/${id}`,
    delete: (id) => `/api/reminders/${id}`,
  },

  // Memory
  memory: {
    get: '/api/memory',
    add: '/api/memory',
    update: (id) => `/api/memory/${id}`,
    delete: (id) => `/api/memory/${id}`,
  },

  // Behavior / Digital Twin
  behavior: {
    patterns: '/api/behavior/patterns',
    insights: '/api/behavior/insights',
  },

  // Wellness
  wellness: {
    get: '/api/wellness',
    update: '/api/wellness',
    period: '/api/wellness/period',
    sleep: '/api/wellness/sleep',
    workout: '/api/wellness/workout',
  },

  // Lifestyle
  lifestyle: {
    get: '/api/lifestyle',
    update: '/api/lifestyle',
    spotify: '/api/lifestyle/spotify',
    youtube: '/api/lifestyle/youtube',
    pets: '/api/lifestyle/pets',
  },

  // Safety
  safety: {
    contacts: '/api/safety/contacts',
    sos: '/api/safety/sos',
    checkIn: '/api/safety/check-in',
    settings: '/api/safety/settings',
  },

  // Rewards
  rewards: {
    get: '/api/rewards',
    history: '/api/rewards/history',
    redeem: (id) => `/api/rewards/${id}/redeem`,
  },

  // Feedback
  feedback: {
    submit: '/api/feedback',
  },
};
