import * as fs from 'fs'
import * as path from 'path'

/**
 * Script pour vérifier que toutes les routes définies existent réellement
 * Usage: npx tsx scripts/check-routes.ts
 */

const APP_DIR = path.join(process.cwd(), 'src', 'app')

// Routes à vérifier (basées sur routes.ts)
const routesToCheck = {
  // Public routes
  home: '/',
  pricing: '/pricing',
  terms: '/terms',
  privacy: '/privacy',
  about: '/about',

  // Auth routes (groupées dans (auth))
  login: '/login',
  register: '/register',

  // App routes (groupées dans (main)/app)
  app: '/app',
  topics: '/app/topics',
  trending: '/app/trending',
  bookmarks: '/app/bookmarks',
  notifications: '/app/notifications',
  search: '/app/search',

  // Settings routes
  settings: '/app/settings',
  settingsProfile: '/app/settings/profile',
  settingsAccount: '/app/settings/account',
  settingsBilling: '/app/settings/billing',
  settingsNotifications: '/app/settings/notifications',
  settingsAppearance: '/app/settings/appearance',
  settingsSecurity: '/app/settings/security',

  // Admin routes
  admin: '/app/admin',
  adminUsers: '/app/admin/users',
  adminSpaces: '/app/admin/spaces',
  adminAnalytics: '/app/admin/analytics',
  adminSettings: '/app/admin/settings',
  adminReports: '/app/admin/reports',

  // Actions
  newThread: '/app/new/thread',
  newSpace: '/app/new/space',
  new: '/app/new',
}

// Routes dynamiques à vérifier (dossiers avec [param])
const dynamicRoutesToCheck = [
  '/u/[username]',
  '/thread/[id]',
  '/app/topics/[slug]',
  '/app/[spaceSlug]',
  '/app/[spaceSlug]/[channelSlug]',
]

function routeToFilePath(route: string): string {
  if (route === '/') {
    return path.join(APP_DIR, '(landing)', 'page.tsx')
  }

  // Auth routes
  if (route === '/login') {
    return path.join(APP_DIR, '(auth)', 'login', 'page.tsx')
  }
  if (route === '/register') {
    return path.join(APP_DIR, '(auth)', 'register', 'page.tsx')
  }

  // Landing pages
  if (['/pricing', '/terms', '/privacy', '/about'].includes(route)) {
    const pageName = route.slice(1) // remove leading /
    return path.join(APP_DIR, '(landing)', pageName, 'page.tsx')
  }

  // App routes (dans (main)/app)
  if (route.startsWith('/app')) {
    const appPath = route.replace('/app', '')
    if (appPath === '') {
      return path.join(APP_DIR, '(main)', 'app', 'page.tsx')
    }
    return path.join(APP_DIR, '(main)', 'app', appPath.slice(1), 'page.tsx')
  }

  // Thread routes (dans (main)/thread)
  if (route.startsWith('/thread')) {
    return path.join(APP_DIR, '(main)', 'thread', route.replace('/thread/', ''), 'page.tsx')
  }

  // User routes (dans (main)/u)
  if (route.startsWith('/u')) {
    return path.join(APP_DIR, '(main)', 'u', route.replace('/u/', ''), 'page.tsx')
  }

  return path.join(APP_DIR, route.slice(1), 'page.tsx')
}

function dynamicRouteToFilePath(route: string): string {
  // Thread routes
  if (route.startsWith('/thread/[id]')) {
    return path.join(APP_DIR, '(main)', 'thread', '[id]', 'page.tsx')
  }

  // User routes
  if (route.startsWith('/u/[username]')) {
    return path.join(APP_DIR, '(main)', 'u', '[username]', 'page.tsx')
  }

  // Topics dynamic route
  if (route === '/app/topics/[slug]') {
    return path.join(APP_DIR, '(main)', 'app', 'topics', '[slug]', 'page.tsx')
  }

  // Space routes
  if (route === '/app/[spaceSlug]') {
    return path.join(APP_DIR, '(main)', 'app', '[spaceSlug]', 'page.tsx')
  }

  // Channel routes
  if (route === '/app/[spaceSlug]/[channelSlug]') {
    return path.join(APP_DIR, '(main)', 'app', '[spaceSlug]', '[channelSlug]', 'page.tsx')
  }

  return ''
}

function checkRoute(name: string, route: string): boolean {
  const filePath = routeToFilePath(route)
  const exists = fs.existsSync(filePath)

  if (exists) {
    console.log(`✅ ${name.padEnd(30)} ${route.padEnd(40)} → ${path.relative(process.cwd(), filePath)}`)
  } else {
    console.log(`❌ ${name.padEnd(30)} ${route.padEnd(40)} → MISSING: ${path.relative(process.cwd(), filePath)}`)
  }

  return exists
}

function checkDynamicRoute(route: string): boolean {
