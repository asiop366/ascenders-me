'use client'

import { useState, useEffect } from 'react'
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
  { name: 'Looksmaxxing', count: 2847, color: '#6366F1' },
  { name: 'Blackpill', count: 1923, color: '#EF4444' },
  { name: 'Redpill', count: 1456, color: '#F59E0B' },
  { name: 'Bluepill', count: 892, color: '#3B82F6' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
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
              <button
                key={topic.name}
                onClick={() => setSelectedTopic(selectedTopic === topic.name ? null : topic.name)}
                className={`
                  w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all
                  ${selectedTopic === topic.name
                    ? 'bg-dark-800 text-white'
                    : 'text-dark-300 hover:bg
