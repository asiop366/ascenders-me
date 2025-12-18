'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'
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
  MoreHorizontal,
  Shield,
} from 'lucide-react'
import { routes } from '@/config/routes'

interface SidebarProps {
  user: {
    id?: string
    username?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  }
}

const navigation = [
  { name: 'Home', href: routes.app, icon: Home },
  { name: 'Topics', href: routes.topics, icon: Folder },
  { name: 'Trending', href: routes.trending, icon: TrendingUp },
  { name: 'Bookmarks', href: routes.bookmarks, icon: Bookmark },
  { name: 'Notifications', href: routes.notifications, icon: Bell },
]

const topTopics = [
  { name: 'General', slug: 'general', count: 1234 },
  { name: 'Tech', slug: 'tech', count: 856 },
  { name: 'Gaming', slug: 'gaming', count: 642 },
  { name: 'Music', slug: 'music', count: 421 },
]

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const isAdmin = user.role === 'ADMIN'
  const isMod = user.role === 'MODERATOR'

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false)
      }
    }

    if (userMenuOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [userMenuOpen])

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <Link href={routes.app} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
            A
          </div>
          <div>
            <h1 className="font-bold text-lg">Ascenders</h1>
            <p className="text-xs text-zinc-400">Welcome back!</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${
                  isActive
                    ? 'bg-zinc-800 text-white font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }
              `}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          )
        })}

        {/* Top Topics Section */}
        <div className="pt-6 pb-2">
          <div className="px-3 mb-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Top Topics
            </h3>
            <button className="text-zinc-500 hover:text-white transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <div className="space-y-1">
            {topTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={routes.topic(topic.slug)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
              >
                <span className="text-sm">#{topic.name}</span>
                <span className="text-xs text-zinc-600">{topic.count}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Admin Section */}
        {(isAdmin || isMod) && (
          <div className="pt-4 border-t border-zinc-800 mt-4">
            <div className="px-3 mb-2">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Shield size={14} />
                Admin
              </h3>
            </div>
            <Link
              href={routes.admin}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${
                  pathname.startsWith('/app/admin')
                    ? 'bg-red-900/20 text-red-400 font-medium'
                    : 'text-zinc-400 hover:text-red-400 hover:bg-red-900/10'
                }
              `}
            >
              <Shield size={20} />
              <span>Admin Panel</span>
            </Link>
          </div>
        )}
      </nav>

      {/* User Card */}
      <div className="p-3 border-t border-zinc-800" ref={menuRef}>
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-700 overflow-hidden flex-shrink-0">
              {user.image ? (
                <img src={user.image} alt={user.username || 'User'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm font-medium">
                  {user.username?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-medium truncate">
                {user.username || 'User'}
              </div>
              <div className="text-xs text-zinc-500 truncate">
                {user.role === 'ADMIN' && '👑 Admin'}
                {user.role === 'MODERATOR' && '🛡️ Moderator'}
                {user.role !== 'ADMIN' && user.role !== 'MODERATOR' && 'Member'}
              </div>
            </div>
            <ChevronDown
              size={16}
              className={`text-zinc-500 transition-transform ${
                userMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* User Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl overflow-hidden">
              <Link
                href={routes.user(user.username || '')}
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-700 transition-colors"
              >
                <User size={16} />
                <span className="text-sm">Profile</span>
              </Link>
              <Link
                href={routes.settings}
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-700 transition-colors"
              >
                <Settings size={16} />
                <span className="text-sm">Settings</span>
              </Link>
              <button
                onClick={() => {
                  setUserMenuOpen(false)
                  signOut()
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-700 transition-colors text-red-400"
              >
                <LogOut size={16} />
                <span className="text-sm">Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
