'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronDown, 
  User, 
  LogOut, 
  Settings, 
  Bell,
  Bookmark,
  Search
} from 'lucide-react'
import Link from 'next/link'

interface NavbarProps {
  channelName?: string
  gradeName?: string | null
  gradeColor?: string | null
}

export function Navbar({ channelName, gradeName, gradeColor }: NavbarProps) {
  const { data: session } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="h-16 bg-dark-900/80 backdrop-blur-xl border-b border-white/5 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left - Channel Name */}
      <div className="flex items-center gap-3">
        {channelName && (
          <>
            <span className="text-dark-400">#</span>
            <h1 className="font-semibold text-lg text-white">{channelName}</h1>
          </>
        )}
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search threads, users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-800/50 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Right - Actions & User */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Link 
          href="/app/notifications"
          className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <Bell size={20} className="text-dark-300 hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full text-xs font-bold flex items-center justify-center text-white">
            3
          </span>
        </Link>

        {/* Bookmarks */}
        <Link 
          href="/app/bookmarks"
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <Bookmark size={20} className="text-dark-300 hover:text-white transition-colors" />
        </Link>

        {/* User Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all duration-200"
          >
            <Avatar
              src={session?.user?.image || undefined}
              alt={session?.user?.username || 'User'}
              size="sm"
            />
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-white">
                {session?.user?.username || 'Guest'}
              </span>
              {gradeName && (
                <Badge
                  variant="secondary"
                  style={{ 
                    backgroundColor: `${gradeColor}20`,
                    color: gradeColor || undefined,
                    borderColor: gradeColor || undefined 
                  }}
                  className="text-xs"
                >
                  {gradeName}
                </Badge>
              )}
            </div>
            <ChevronDown 
              size={16} 
              className={`text-dark-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)}
              />
              
              {/* Menu */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-dark-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-medium text-white">{session?.user?.username}</p>
                  <p className="text-xs text-dark-400">{session?.user?.email}</p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link 
                    href={`/app/u/${session?.user?.username || ''}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-200 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User size={16} />
                    <span>My Profile</span>
                  </Link>
                  
                  <Link 
                    href="/app/settings"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-200 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>

                  <Link 
                    href="/app/bookmarks"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-200 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Bookmark size={16} />
                    <span>Saved Posts</span>
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-white/5 py-2">
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
