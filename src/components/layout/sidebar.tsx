'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { 
  Home, 
  Compass, 
  TrendingUp, 
  Bookmark, 
  Bell, 
  Settings,
  LogOut,
  ChevronDown,
  Hash
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

const navItems = [
  { label: 'Home', href: '/app', icon: Home },
  { label: 'Topics', href: '/app/topics', icon: Compass },
  { label: 'Trending', href: '/app/trending', icon: TrendingUp },
  { label: 'Bookmarks', href: '/app/bookmarks', icon: Bookmark },
  { label: 'Notifications', href: '/app/notifications', icon: Bell, badge: 3 },
]

const topTopics = [
  { name: 'Looksmaxxing', count: 2847, color: '#6366F1', slug: 'looksmaxxing' },
  { name: 'Blackpill', count: 1923, color: '#EF4444', slug: 'blackpill' },
  { name: 'Redpill', count: 1456, color: '#F59E0B', slug: 'redpill' },
  { name: 'Bluepill', count: 892, color: '#3B82F6', slug: 'bluepill' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  return (
    <aside className="w-64 h-screen bg-dark-900 border-r border-white/5 flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/app" className="flex items-center gap-3 group">
          <div className="relative">
            <Image 
              src="/logo.png" 
              alt="Ascenders" 
              width={40} 
              height={40}
              className="rounded-xl group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
          </div>
          <div>
            <div className="font-bold text-white text-lg">Ascenders</div>
            <div className="text-xs text-dark-200">Welcome back!</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center justify-between px-4 py-3 rounded-xl transition-all
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
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}

        {/* Top Topics */}
        <div className="pt-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <span className="text-xs font-semibold text-dark-300 uppercase tracking-wider">
              Top Topics
            </span>
          </div>
          <div className="space-y-1">
            {topTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/app/topics/${topic.slug}`}
                onClick={() => setSelectedTopic(topic.slug)}
                className={`
                  w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group
                  ${selectedTopic === topic.slug
                    ? 'bg-dark-800 text-white'
                    : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Hash size={16} style={{ color: topic.color }} />
                  <span className="font-medium">{topic.name}</span>
                </div>
                <span className="text-xs text-dark-400 group-hover:text-dark-200">
                  {topic.count.toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* User Card */}
      <div className="p-4 border-t border-white/5">
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-800 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-white">
              {session?.user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-white text-sm">
                {session?.user?.username || 'Guest'}
              </div>
              <div className="text-xs text-dark-300">
                Member
              </div>
            </div>
            <ChevronDown 
              size={18} 
              className={`text-dark-300 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsUserMenuOpen(false)}
              />
              <div className="absolute bottom-full left-0 right-0 mb-2 glass rounded-xl p-2 shadow-card z-50">
                <Link
                  href={`/u/${session?.user?.username}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-dark-800 text-dark-100 hover:text-white transition-colors"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Home size={18} />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-dark-800 text-dark-100 hover:text-white transition-colors"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
                <div className="my-2 border-t border-white/5" />
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
