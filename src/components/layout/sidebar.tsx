'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Hash, Settings, Crown, Shield } from 'lucide-react'
import { clsx } from 'clsx'

interface Space {
  id: string
  name: string
  slug: string
  icon?: string
}

interface SidebarProps {
  spaces: Space[]
  userRole: string
}

export function Sidebar({ spaces, userRole }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="w-20 bg-dark-surface border-r border-dark-border flex flex-col items-center py-4 gap-2">
      {/* Home */}
      <SidebarIcon
        href="/app"
        icon={<Home className="w-6 h-6" />}
        label="Home"
        active={pathname === '/app'}
      />

      <div className="w-10 h-px bg-dark-border my-2" />

      {/* Spaces */}
      {spaces.map((space) => (
        <SidebarIcon
          key={space.id}
          href={`/app/${space.slug}`}
          icon={space.icon ? <span className="text-2xl">{space.icon}</span> : <Hash className="w-6 h-6" />}
          label={space.name}
          active={pathname.includes(`/app/${space.slug}`)}
        />
      ))}

      <div className="flex-1" />

      {/* Bottom Icons */}
      <SidebarIcon
        href="/pricing"
        icon={<Crown className="w-6 h-6" />}
        label="Pricing"
        active={pathname === '/pricing'}
      />

      {userRole === 'ADMIN' && (
        <SidebarIcon
          href="/admin"
          icon={<Shield className="w-6 h-6" />}
          label="Admin"
          active={pathname.includes('/admin')}
        />
      )}

      <SidebarIcon
        href="/settings"
        icon={<Settings className="w-6 h-6" />}
        label="Settings"
        active={pathname === '/settings'}
      />
    </div>
  )
}

function SidebarIcon({
  href,
  icon,
  label,
  active,
}: {
  href: string
  icon: React.ReactNode
  label: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'w-12 h-12 rounded-xl flex items-center justify-center transition-all group relative',
        active
          ? 'bg-accent-primary text-white'
          : 'bg-dark-hover text-dark-muted hover:bg-dark-border hover:text-dark-text'
      )}
      title={label}
    >
      {icon}
      <span className="absolute left-full ml-4 px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
        {label}
      </span>
    </Link>
  )
}

