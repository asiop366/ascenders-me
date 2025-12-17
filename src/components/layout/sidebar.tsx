'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { 
  Home, 
  Folder, 
  TrendingUp, 
  Bookmark, 
  Bell, 
  Settings,
  LogOut,
  ChevronDown,
  User,
  MoreHorizontal
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface SidebarProps {
  user: {
    id?: string | null
    username?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  }
}

const navigation = [
  { name: 'Home', href: '/app', icon: Home },
  { name: 'Topics', href: '/app/topics', icon: Folder },
  { name: 'Trending', href: '/app/trending', icon: TrendingUp },
  { name: 'Bookmarks', href: '/app/bookmarks', icon: Bookmark },
  { name: 'Notifications', href: '/app/notifications', icon: Bell },
]

const topTopics = [
  { name: 'General', slug: 'general', threads: 1243 },
  { name: 'Build Logs', slug: 'build-logs', threads: 892 },
  { name: 'Guides', slug: 'guides', threads: 567 },
  { name: 'Feedback', slug: 'feedback', threads: 234 },
  { name: 'Off-topic', slug: 'off-topic', threads: 1891 },
]

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu on ESC
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setUserMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const isAdmin = user.role === 'ADMIN'
  const isMod = user.role === 'MODERATOR' || isAdmin

  return (
    <aside className="w-70 h-screen bg-asc-surface border-r border-asc-border flex flex-col">
      {/* Header - Logo & Welcome */}
      <div className="p-5 border-b border-asc-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-asc-text rounded-asc flex items-center justify-center">
            <span className="text-asc-bg font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="font-semibold text-asc-text">Ascenders</h1>
            <p className="text-xs text-asc-muted">Welcome back</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        {/* Main Nav */}
        <div className="space-y-1 mb-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
                {item.name === 'Notifications' && (
                  <span className="ml-auto w-5 h-5 bg-asc-text text-asc-bg text-xs font-medium rounded-full flex items-center justify-center">
                    3
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Top Topics */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-medium text-asc-muted uppercase tracking-wider">
              Top Topics
            </span>
            <Link href="/app/topics" className="text-xs text-asc-muted hover:text-asc-text transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-1">
            {topTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/app/topics/${topic.slug}`}
                className="nav-item group"
              >
                <span className="w-2 h-2 bg-asc-muted rounded-full group-hover:bg-asc-text transition-colors" />
                <span className="flex-1 truncate">{topic.name}</span>
                <span className="text-xs text-asc-muted">{topic.threads}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mod/Admin Section */}
        {isMod && (
          <div className="mb-6">
            <div className="px-3 mb-2">
              <span className="text-xs font-medium text-asc-muted uppercase tracking-wider">
                Moderation
              </span>
            </div>
            <div className="space-y-1">
              <Link href="/app/admin" className="nav-item">
                <Settings size={18} />
                <span>Admin Panel</span>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* User Card */}
      <div className="p-3 border-t border-asc-border" ref={menuRef}>
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center gap-3 p-2 rounded-asc hover:bg-asc-hover transition-all duration-120"
            aria-expanded={userMenuOpen}
            aria-haspopup="true"
          >
            {/* Avatar */}
            <div className="w-9 h-9 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-semibold text-sm">
              {user.username?.[0]?.toUpperCase() || 'U'}
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-asc-text truncate">
                {user.username || 'User'}
              </p>
              <p className="text-xs text-asc-muted truncate">
                {user.role === 'ADMIN' ? 'Administrator' : user.role === 'MODERATOR' ? 'Moderator' : 'Member'}
              </p>
            </div>
            
            {/* Chevron */}
            <ChevronDown 
              size={16} 
              className={`text-asc-muted transition-transform duration-120 ${userMenuOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {/* User Menu Dropdown */}
          {userMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-asc-surface border border-asc-border rounded-asc-lg shadow-lg py-1 animate-fade-in">
              <Link
                href={`/app/u/${user.username}`}
                className="dropdown-item"
                onClick={() => setUserMenuOpen(false)}
              >
                <User size={16} />
                <span>Profile</span>
              </Link>
              <Link
                href="/app/settings"
                className="dropdown-item"
                onClick={() => setUserMenuOpen(false)}
              >
                <Settings size={16} />
                <span>Settings</span>
              </Link>
              <div className="border-t border-asc-border my-1" />
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="dropdown-item w-full text-red-400 hover:text-red-300"
              >
                <LogOut size={16} />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
