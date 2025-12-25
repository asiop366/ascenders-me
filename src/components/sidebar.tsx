'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  Flame,
  MessageSquare,
  Shield,
  Plus,
  Search,
  Mail
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
    color?: string
  }[]
  userGrade?: {
    name: string
    color: string
  } | null
  isOpen?: boolean
  onClose?: () => void
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
    label: 'Messages',
    href: '/app/messages',
    icon: Mail
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
  { name: 'Fitness', slug: 'fitness', count: 1234, color: '#FF6B6B' },
  { name: 'Skincare', slug: 'skincare', count: 892, color: '#4ECDC4' },
  { name: 'Style', slug: 'style', count: 756, color: '#95E1D3' },
  { name: 'Nutrition', slug: 'nutrition', count: 623, color: '#FFE66D' },
  { name: 'Grooming', slug: 'grooming', count: 512, color: '#C7CEEA' },
]

export function Sidebar({ spaces = [], topTopics = defaultTopTopics, userGrade, isOpen, onClose }: SidebarProps) {
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
    if (onClose) onClose()
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "w-72 h-screen bg-dark-900 border-r border-white/5 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/app" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Ascenders"
                width={40}
                height={40}
                className="rounded-xl group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
            </div>
            <div>
              <div className="font-bold text-white text-lg tracking-tight">Ascenders</div>
              <div className="text-xs text-dark-400">Level up yourself</div>
            </div>
          </Link>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <Link
            href="/app/search"
            className="flex items-center gap-3 w-full px-4 py-2.5 bg-dark-800/50 border border-white/5 rounded-xl text-dark-400 text-sm hover:bg-dark-800 hover:border-white/10 transition-all shadow-inner"
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
            className="flex items-center justify-center gap-2 w-full py-3 btn-primary text-white font-semibold hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300"
          >
            <Plus size={20} />
            Create Thread
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="px-3 pb-4 border-b border-white/5 overflow-y-auto scrollbar-hide">
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
                        ? "bg-gradient-to-r from-primary/20 to-secondary/10 text-white border border-primary/20 shadow-glow"
                        : "text-dark-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon size={20} className={active ? "text-primary" : ""} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto flex items-center justify-center w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full text-xs font-bold text-white shadow-glow">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Top Topics */}
          <div className="mt-6">
            <div className="flex items-center justify-between px-3 mb-3">
              <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Top Topics</p>
              <Flame size={14} className="text-orange-500 animate-pulse" />
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
                    {topic.color ? (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: topic.color }} />
                    ) : (
                      <Hash size={16} className={selectedTopic === topic.slug ? "text-primary" : "text-dark-500"} />
                    )}
                    <span className="flex-1 text-left line-clamp-1">{topic.name}</span>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-bold",
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
          </div>

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
                      <span className="flex-1 text-left font-medium line-clamp-1">{space.name}</span>
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
                              onClick={() => onClose?.()}
                              className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all",
                                pathname === `/app/${space.slug}/${channel.slug}`
                                  ? "text-primary bg-primary/10"
                                  : "text-dark-400 hover:text-white hover:bg-white/5"
                              )}
                            >
                              <Hash size={14} />
                              <span className="line-clamp-1">{channel.name}</span>
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
        </nav>

        {/* Admin Link (if admin) */}
        {session?.user?.role === 'ADMIN' && (
          <div className="px-3 py-2 border-t border-white/5">
            <Link
              href="/app/admin"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                pathname.startsWith('/app/admin')
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 shadow-glow-red"
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
              className="flex items-center gap-3 w-full p-3 rounded-xl glass border border-white/5 hover:border-white/10 transition-all duration-200 shadow-xl"
            >
              <Avatar
                src={session?.user?.image || undefined}
                alt={session?.user?.username || 'User'}
                size="md"
                className="ring-2 ring-primary/20 shadow-glow"
              />
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-white text-sm truncate">
                  {session?.user?.username || 'Guest'}
                </p>
                {userGrade ? (
                  <Badge
                    size="sm"
                    style={{
                      backgroundColor: userGrade.color + '20',
                      color: userGrade.color,
                      borderColor: userGrade.color + '40'
                    }}
                    className="mt-1"
                  >
                    {userGrade.name}
                  </Badge>
                ) : (
                  <p className="text-[10px] text-dark-500 truncate">{session?.user?.email || 'Not signed in'}</p>
                )}
              </div>
              <ChevronDown
                size={18}
                className={cn(
                  "text-dark-400 transition-transform duration-200 shrink-0",
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
                    href={`/u/${session?.user?.username || 'profile'}`}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-dark-200 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => {
                      setShowUserMenu(false)
                      onClose?.()
                    }}
                  >
                    <User size={18} />
                    View Profile
                  </Link>
                  <Link
                    href="/app/settings"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-dark-200 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => {
                      setShowUserMenu(false)
                      onClose?.()
                    }}
                  >
                    <Settings size={18} />
                    Settings
                  </Link>
                  <div className="border-t border-white/5">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        signOut({ callbackUrl: '/' });
                      }}
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
    </>
  )
}
