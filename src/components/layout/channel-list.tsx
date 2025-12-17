'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Hash, Lock } from 'lucide-react'
import { clsx } from 'clsx'

interface Channel {
  id: string
  name: string
  slug: string
  type: string
  minGrade?: {
    name: string
  } | null
}

interface ChannelListProps {
  spaceSlug: string
  channels: Channel[]
  spaceName: string
}

export function ChannelList({ spaceSlug, channels, spaceName }: ChannelListProps) {
  const pathname = usePathname()

  return (
    <div className="w-60 bg-dark-surface border-r border-dark-border flex flex-col">
      {/* Header */}
      <div className="h-16 px-4 border-b border-dark-border flex items-center">
        <h2 className="font-semibold text-lg truncate">{spaceName}</h2>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
        <div className="mb-4">
          <h3 className="px-2 py-1 text-xs font-semibold text-dark-muted uppercase tracking-wider">
            Channels
          </h3>
          <div className="space-y-0.5">
            {channels.map((channel) => {
              const isActive = pathname.includes(`/${spaceSlug}/${channel.slug}`)
              const isLocked = channel.minGrade !== null

              return (
                <Link
                  key={channel.id}
                  href={`/app/${spaceSlug}/${channel.slug}`}
                  className={clsx(
                    'flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors group',
                    isActive
                      ? 'bg-dark-hover text-white'
                      : 'text-dark-muted hover:bg-dark-hover hover:text-dark-text'
                  )}
                >
                  {isLocked ? (
                    <Lock className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <Hash className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span className="truncate text-sm">{channel.name}</span>
                  {isLocked && (
                    <span className="ml-auto text-xs text-accent-warning">
                      {channel.minGrade?.name}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

