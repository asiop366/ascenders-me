'use client'

import { signOut, useSession } from 'next-auth/react'
import { Avatar } from '@/components/ui/avatar'
import { Dropdown, DropdownItem } from '@/components/ui/dropdown'
import { ChevronDown, User, LogOut } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface NavbarProps {
  channelName?: string
  gradeName?: string | null
  gradeColor?: string | null
}

export function Navbar({ channelName, gradeName, gradeColor }: NavbarProps) {
  const { data: session } = useSession()

  return (
    <div className="h-16 bg-dark-surface border-b border-dark-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {channelName && (
          <>
            <span className="text-dark-muted">#</span>
            <h1 className="font-semibold text-lg">{channelName}</h1>
          </>
        )}
      </div>

      <Dropdown
        trigger={
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-dark-hover transition-colors">
            <Avatar
              src={session?.user?.image || undefined}
              alt={session?.user?.username || 'User'}
              size="sm"
            />
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">
                {session?.user?.username || 'Guest'}
              </span>
              {gradeName && (
                <Badge
                  variant="secondary"
                  style={{ borderColor: gradeColor || undefined }}
                  className="text-xs"
                >
                  {gradeName}
                </Badge>
              )}
              <ChevronDown size={16} className="text-dark-muted" />
            </div>
          </button>
        }
      >
        <DropdownItem>
          <Link 
            href={`/u/${session?.user?.username || ''}`} 
            className="flex items-center gap-2 w-full"
          >
            <User size={16} />
            <span>Profile</span>
          </Link>
        </DropdownItem>
        <DropdownItem onClick={() => signOut()}>
          <div className="flex items-center gap-2 w-full">
            <LogOut size={16} />
            <span>Sign out</span>
          </div>
        </DropdownItem>
      </Dropdown>
    </div>
  )
}
