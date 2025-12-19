'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Home, TrendingUp, Bookmark, Bell, Search, Settings, LogOut, ChevronDown, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

const navItems = [
  { icon: Home, label: 'Home', href: '/app', badge: null },
  { icon: TrendingUp, label: 'Trending', href: '/app/trending', badge: null },
  { icon: Bookmark, label: 'Bookmarks', href: '/app/bookmarks', badge: null },
  { icon: Mail, label: 'Messages', href: '/app/messages', badge: null },  // ← AJOUTE CETTE LIGNE
  { icon: Bell, label: 'Notifications', href: '/app/notifications', badge: 3 },
  { icon: Search, label: 'Search', href: '/app/search', badge: null },
]

const topTopics = [
  { name: 'Fitness', count: 1234, color: '#FF6B6B' },
  { name: 'Skincare', count: 892, color: '#4ECDC4' },
  { name: 'Style', count: 756, color: '#95E1D3' },
  { name: 'Nutrition', count: 623, color: '#FFE66D' },
  { name: 'Grooming', count: 512, color: '#C7CEEA' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  return (
    <aside className="w-64 h-screen bg-dark-900 border-r border-white/5 flex flex-col fixed left-0 top-0">
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
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-gradient-primary text-white shadow-glow' 
                  : 'text-dark-200 hover:bg-dark-800 hover:text-white'
              }`}
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
              <button
                key={topic.name}
                onClick={() => setSelectedTopic(selectedTopic === topic.name ? null : topic.name)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${
                  selectedTopic === topic.name
                    ? 'bg-dark-800 text-white'
                    : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: topic.color }}
                  />
                  <span className="text-sm font-medium">{topic.name}</span>
                </div>
                <span className="text-xs text-dark-400">{topic.count}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* User Menu */}
      <div className="p-4 border-t border-white/5">
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-dark-800 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
              {session?.user?.username?.[0]?.toUpperCase() || 'G'}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white">
                {session?.user?.username || 'Guest'}
              </p>
              <p className="text-xs text-dark-300">
                {session?.user?.email || 'Not signed in'}
              </p>
            </div>
            <ChevronDown
              size={16}
              className={`text-dark-400 transition-transform ${
                userMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-dark-800 border border-white/10 rounded-xl shadow-xl overflow-hidden">
              <Link
                href={`/app/u/${session?.user?.username || 'profile'}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-dark-700 transition-colors"
                onClick={() => setUserMenuOpen(false)}
              >
                <User size={18} className="text-dark-300" />
                <span className="text-sm text-white">Profile</span>
              </Link>
              <Link
                href="/app/settings"
                className="flex items-center gap-3 px-4 py-3 hover:bg-dark-700 transition-colors"
                onClick={() => setUserMenuOpen(false)}
              >
                <Settings size={18} className="text-dark-300" />
                <span className="text-sm text-white">Settings</span>
              </Link>
              <button
                onClick={() => {
                  setUserMenuOpen(false)
                  signOut({ callbackUrl: '/' })
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-colors border-t border-white/5"
              >
                <LogOut size={18} className="text-red-400" />
                <span className="text-sm text-red-400">Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
