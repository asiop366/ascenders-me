'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  Compass, 
  TrendingUp, 
  Bookmark, 
  Bell, 
  Settings,
  Hash,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  Crown,
  Flame,
  MessageSquare,
  Users,
  Shield,
  Plus,
  Search
} from 'lucide-react'

interface SidebarProps {
  spaces?: {
    id: string
    name: string
    slug: string
    icon?: string
    channels: {
      id: string
      name: string
      slug: string
    }[]
  }[]
  topTopics?: {
    name: string
    slug: string
    count: number
  }[]
  userGrade?: {
    name: string
    color: string
  } | null
}

const mainNavItems = [
  { 
    label: 'Home', 
    href: '/app', 
    icon: Home,
    exact: true
  },
  { 
    label: 'Topics', 
    href: '/app/topics', 
    icon: Compass 
  },
  { 
    label: 'Trending', 
    href: '/app/trending', 
    icon: TrendingUp 
  },
  { 
    label: 'Bookmarks', 
    href: '/app/bookmarks', 
    icon: Bookmark 
  },
  { 
    label: 'Notifications', 
    href: '/app/notifications', 
    icon: Bell,
    badge: 3
  },
]

const defaultTopTopics = [
  { name: 'Looksmaxxing', slug: 'looksmaxxing', count: 1247 },
  { name: 'Blackpill', slug: 'blackpill', count: 892 },
  { name: 'Fitness', slug: 'fitness', count: 756 },
  { name: 'Skincare', slug: 'skincare', count: 543 },
  { name: 'Fashion', slug: 'fashion', count: 421 },
  { name: 'Mewing', slug: 'mewing', count: 389 },
  { name: 'Surgery', slug: 'surgery', count: 267 },
]

export function Sidebar({ spaces = [], topTopics = defaultTopTopics, userGrade }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [expandedSpaces, setExpandedSpaces] = useState<string[]>([])
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const toggleSpace = (spaceId: string) => {
    setExpandedSpaces(prev => 
      prev.includes(spaceId) 
        ? prev.filter(id => id !== spaceId)
        : [...prev, spaceId]
    )
  }

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const handleTopicClick = (slug: string) => {
    setSelectedTopic(slug)
    router.push(`/app/topics/${slug}`)
  }

  return (
    <aside className="w-72 h-screen bg-dark-900 border-r border-white/5 flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
            <Crown size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">ASCENDERS</h1>
            <p className="text-xs text-dark-400">Level up yourself</p>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <Link 
          href="/app/search"
          className="flex items-center gap-3 w-full px-4 py-2.5 bg-dark-800/50 border border-white/5 rounded-xl text-dark-400 text-sm hover:bg-dark-800 hover:border-white/10 transition-all"
        >
          <Search size={18} />
          <span>Search...</span>
          <span className="ml-auto text-xs bg-dark-700 px-2 py-0.5 rounded">⌘K</span>
        </Link>
      </div>

      {/* Create Thread Button */}
      <div className="px-4 pb-4">
        <Link
          href="/app/new-thread"
          className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300"
        >
          <Plus size={20} />
          Create Thread
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 pb-4 border-b border-white/5">
        <p className="px-3 mb-2 text-xs font-semibold text-dark-500 uppercase tracking-wider">Menu</p>
        <ul className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href, item.exact)
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    active 
                      ? "bg-gradient-to-r from-primary/20 to-secondary/10 text-white border border-primary/20" 
                      : "text-dark-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon size={20} className={active ? "text-primary" : ""} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto flex items-center justify-center w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full text-xs font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Top Topics */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="flex items-center justify-between px-3 mb-3">
          <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Top Topics</p>
          <Flame size={14} className="text-orange-500" />
        </div>
        <ul className="space-y-1">
          {topTopics.map((topic) => (
            <li key={topic.slug}>
              <button
                onClick={() => handleTopicClick(topic.slug)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm transition-all duration-200",
                  selectedTopic === topic.slug
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-dark-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <Hash size={16} className={selectedTopic === topic.slug ? "text-primary" : "text-dark-500"} />
                <span className="flex-1 text-left">{topic.name}</span>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  selectedTopic === topic.slug
                    ? "bg-primary/30 text-primary"
                    : "bg-dark-700 text-dark-400"
                )}>
                  {topic.count.toLocaleString()}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Spaces / Categories */}
        {spaces.length > 0 && (
          <div className="mt-6">
            <p className="px-3 mb-3 text-xs font-semibold text-dark-500 uppercase tracking-wider">Spaces</p>
            <ul className="space-y-1">
              {spaces.map((space) => (
                <li key={space.id}>
                  <button
                    onClick={() => toggleSpace(space.id)}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-dark-300 hover:bg-white/5 hover:text-white transition-all"
                  >
                    <span className="text-lg">{space.icon || '📁'}</span>
                    <span className="flex-1 text-left font-medium">{space.name}</span>
                    <ChevronRight 
                      size={16} 
                      className={cn(
                        "text-dark-500 transition-transform duration-200",
                        expandedSpaces.includes(space.id) && "rotate-90"
                      )}
                    />
                  </button>
                  
                  {expandedSpaces.includes(space.id) && (
                    <ul className="ml-4 mt-1 space-y-1 border-l border-white/5 pl-4">
                      {space.channels.map((channel) => (
                        <li key={channel.id}>
                          <Link
                            href={`/app/${space.slug}/${channel.slug}`}
                            className={cn(
                              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all",
                              pathname === `/app/${space.slug}/${channel.slug}`
                                ? "text-primary bg-primary/10"
                                : "text-dark-400 hover:text-white hover:bg-white/5"
                            )}
                          >
                            <Hash size={14} />
                            {channel.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Admin Link (if admin) */}
      {session?.user?.role === 'ADMIN' && (
        <div className="px-3 py-2 border-t border-white/5">
          <Link
            href="/app/admin"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              pathname.startsWith('/app/admin')
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "text-dark-300 hover:bg-red-500/10 hover:text-red-400"
            )}
          >
            <Shield size={20} />
            Admin Panel
          </Link>
        </div>
      )}

      {/* User Card */}
      <div className="p-4 border-t border-white/5 mt-auto">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 w-full p-3 rounded-xl bg-dark-800/50 hover:bg-dark-800 border border-white/5 hover:border-white/10 transition-all duration-200"
          >
            <Avatar
              src={session?.user?.image || undefined}
              alt={session?.user?.username || 'User'}
              size="md"
              className="ring-2 ring-primary/20"
            />
            <div className="flex-1 text-left">
              <p className="font-semibold text-white text-sm">
                {session?.user?.username || 'Guest'}
              </p>
              {userGrade && (
                <Badge 
                  size="sm"
                  style={{ 
                    backgroundColor: userGrade.color + '20',
                    color: userGrade.color,
                  }}
                  className="mt-1"
                >
                  {userGrade.name}
                </Badge>
              )}
            </div>
            <ChevronDown 
              size={18} 
              className={cn(
                "text-dark-400 transition-transform duration-200",
                showUserMenu && "rotate-180"
              )}
            />
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-dark-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <Link
                  href={`/app/u/${session?.user?.username}`}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-dark-200 hover:bg-white/5 hover:text-white transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User size={18} />
                  View Profile
                </Link>
                <Link
                  href="/app/settings"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-dark-200 hover:bg-white/5 hover:text-white transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings size={18} />
                  Settings
                </Link>
                <div className="border-t border-white/5">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
