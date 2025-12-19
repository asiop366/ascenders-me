'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { 
  Home, 
  Layers, 
  TrendingUp, 
  Bookmark, 
  Bell, 
  Settings, 
  LogOut,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

const navItems = [
  { label: 'Home', href: '/app', icon: Home },
  { label: 'Topics', href: '/app/topics', icon: Layers },
  { label: 'Trending', href: '/app/trending', icon: TrendingUp },
  { label: 'Bookmarks', href: '/app/bookmarks', icon: Bookmark },
  { label: 'Notifications', href: '/app/notifications', icon: Bell, badge: 3 },
]

const topTopics = [
  { name: '#Looksmaxxing', count: 2847, slug: 'looksmaxxing', color: '#8B5CF6' },
  { name: '#Blackpill', count: 1923, slug: 'blackpill', color: '#EF4444' },
  { name: '#Redpill', count: 1456, slug: 'redpill', color: '#F59E0B' },
  { name: '#Bluepill', count: 892, slug: 'bluepill', color: '#3B82F6' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-dark-900 border-r border-white/5 flex flex-col z-20">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Image 
              src="/logo.png" 
              alt="Ascenders" 
              width={36} 
              height={36}
              className="rounded-lg group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
          </div>
          <div>
            <div className="font-bold text-white text-lg">Ascenders</div>
            <div className="text-xs text-dark-300">Welcome back!</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all
                ${isActive 
                  ? 'bg-gradient-primary text-white shadow-glow' 
                  : 'text-dark-200 hover:bg-dark-800 hover:text-white'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 bg-primary rounded-full text-xs font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}

        {/* Divider */}
        <div className="h-px bg-white/5 my-4" />

        {/* Top Topics */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-dark-300 uppercase tracking-wider">
              Top Topics
            </span>
            <button className="text-dark-400 hover:text-white transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {topTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/app/topics/${topic.slug}`}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-dark-800 transition-all group"
              >
                <span 
                  className="text-sm font-medium transition-colors"
                  style={{ color: topic.color }}
                >
                  {topic.name}
                </span>
                <span className="text-xs text-dark-400 group-hover:text-dark-200 transition-colors">
                  {topic.count.toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* User Card */}
      <div className="p-4 border-t border-white/5 relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-dark-800 transition-all"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-white">
              {session?.user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-900" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-white text-sm">
              {session?.user?.username || 'Guest'}
            </div>
            <div className="text-xs text-dark-300 truncate">
              {session?.user?.email || 'Not signed in'}
            </div>
          </div>
          <ChevronDown 
            size={18} 
            className={`text-dark-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* User Menu Dropdown */}
        {userMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setUserMenuOpen(false)}
            />
            <div className="absolute bottom-full left-4 right-4 mb-2 glass rounded-xl overflow-hidden shadow-card z-20">
              <Link
                href={`/u/${session?.user?.username}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-dark-800 transition-colors text-dark-100 hover:text-white"
                onClick={() => setUserMenuOpen(false)}
              >
                <Home size={18} />
                <span className="text-sm font-medium">View Profile</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-3 hover:bg-dark-800 transition-colors text-dark-100 hover:text-white"
                onClick={() => setUserMenuOpen(false)}
              >
                <Settings size={18} />
                <span className="text-sm font-medium">Settings</span>
              </Link>
              <div className="h-px bg-white/5" />
              <button
                onClick={() => {
                  setUserMenuOpen(false)
                  signOut({ callbackUrl: '/' })
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-dark-800 transition-colors text-red-400 hover:text-red-300"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
