export const routes = {
  // Public
  home: '/',
  features: '/#features',
  community: '/#community',
  pricing: '/pricing',
  about: '/about',
  terms: '/terms',
  privacy: '/privacy',
  
  // Auth
  login: '/login',
  register: '/register',
  
  // App
  app: '/app',
  createThread: '/app/new-thread',
  thread: (id: string) => `/thread/${id}`,
  
  // User
  user: (username: string) => `/u/${username}`,
  settings: '/settings',
  
  // Topics
  topics: '/app/topics',
  topic: (slug: string) => `/app/topics/${slug}`,
  trending: '/app/trending',
  bookmarks: '/app/bookmarks',
  notifications: '/app/notifications',
  
  // Admin
  admin: '/admin',
  adminReports: '/admin/reports',
  adminUsers: '/admin/users',
}
