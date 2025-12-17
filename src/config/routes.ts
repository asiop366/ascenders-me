// src/config/routes.ts
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
  signIn: "/sign-in",
  signUp: "/sign-up",
  signOut: "/sign-out",
  
  // App routes
  app: "/app",
  appHome: "/app",
  
  // Settings routes
  settings: "/settings",
  settingsProfile: "/settings/profile",
  settingsAccount: "/settings/account",
  settingsBilling: "/settings/billing",
  settingsNotifications: "/settings/notifications",
  settingsAppearance: "/settings/appearance",
  settingsSecurity: "/settings/security",
  
  // Admin routes
  admin: "/admin",
  adminUsers: "/admin/users",
  adminSpaces: "/admin/spaces",
  adminAnalytics: "/admin/analytics",
  adminSettings: "/admin/settings",
  
  // Dynamic routes helpers
  user: (username: string) => `/u/${username}`,
  thread: (id: string) => `/thread/${id}`,
  channel: (spaceSlug: string, channelSlug: string) => `/app/${spaceSlug}/${channelSlug}`,
  space: (spaceSlug: string) => `/app/${spaceSlug}`,
  
  // Actions
  newThread: "/app/new/thread",
  newSpace: "/app/new/space",
  newChannel: (spaceSlug: string) => `/app/${spaceSlug}/new/channel`,
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
