/**
 * Centralisation de toutes les routes de l'application
 * Utiliser ces helpers partout pour éviter les routes hardcodées
 */

export const routes = {
  // Public routes
  home: "/",
  pricing: "/pricing",
  terms: "/terms",
  privacy: "/privacy",
  about: "/about",
  
  // Auth routes
  signIn: "/login",
  signUp: "/register",
  signOut: "/sign-out",
  login: "/login",
  register: "/register",
  
  // App routes
  app: "/app",
  appHome: "/app",
  topics: "/app/topics",
  trending: "/app/trending",
  bookmarks: "/app/bookmarks",
  notifications: "/app/notifications",
  search: "/app/search",
  
  // Settings routes - TOUTES CORRIGÉES AVEC /app/settings
  settings: "/app/settings",
  settingsProfile: "/app/settings/profile",
  settingsAccount: "/app/settings/account",
  settingsBilling: "/app/settings/billing",
  settingsNotifications: "/app/settings/notifications",
  settingsAppearance: "/app/settings/appearance",
  settingsSecurity: "/app/settings/security",
  
  // Admin routes - TOUTES AVEC /app/admin
  admin: "/app/admin",
  adminUsers: "/app/admin/users",
  adminSpaces: "/app/admin/spaces",
  adminAnalytics: "/app/admin/analytics",
  adminSettings: "/app/admin/settings",
  adminReports: "/app/admin/reports",
  adminReportsGrades: "/app/admin/reports/grades",
  
  // Dynamic routes helpers
  user: (username: string) => `/u/${username}`,
  thread: (id: string) => `/thread/${id}`,
  channel: (spaceSlug: string, channelSlug: string) => `/app/${spaceSlug}/${channelSlug}`,
  space: (spaceSlug: string) => `/app/${spaceSlug}`,
  topic: (slug: string) => `/app/topics/${slug}`,
  
  // Actions
  newThread: "/app/new/thread",
  newSpace: "/app/new/space",
  newChannel: (spaceSlug: string) => `/app/${spaceSlug}/new/channel`,
  new: "/app/new",
} as const;

// Type helper pour autocomplétion
export type Route = typeof routes[keyof typeof routes];

// Helper pour vérifier si une route est externe
export const isExternalUrl = (url: string): boolean => {
  return url.startsWith("http://") || url.startsWith("https://");
};

// Helper pour construire des URLs avec query params
export const buildUrl = (path: string, params?: Record<string, string>): string => {
  if (!params) return path;
  const query = new URLSearchParams(params).toString();
  return `${path}?${query}`;
};
