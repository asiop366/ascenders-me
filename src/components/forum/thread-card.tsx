'use client'

import Link from 'next/link'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getTimeAgo } from '@/lib/utils'
import { MessageSquare, Eye, Heart, Pin, Lock } from 'lucide-react'

interface ThreadCardProps {
  thread: {
    id: string
    title: string
    content: string
    pinned: boolean
    locked: boolean
    viewCount: number
    createdAt: Date | string
    author: {
      id: string
      username: string
      image: string | null
      grade?: { name: string; color: string } | null
    }
    channel: {
      name: string
      slug: string
      space: { name: string; slug: string }
    }
    _count: {
      posts: number
      reactions: number
    }
  }
}

export function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <Link href={`/app/thread/${thread.id}`} className="block">
      <article className="card-interactive">
        <div className="flex gap-4">
          {/* Avatar */}
          <Avatar 
            src={thread.author.image} 
            alt={thread.author.username} 
            size="md"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-asc-text">
                  {thread.author.username}
                </span>
                {thread.author.grade && (
                  <Badge 
                    size="sm"
                    style={{ backgroundColor: thread.author.grade.color + '20', color: thread.author.grade.color }}
                  >
                    {thread.author.grade.name}
                  </Badge>
                )}
                <span className="text-sm text-asc-muted">
                  {getTimeAgo(new Date(thread.createdAt))}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {thread.pinned && (
                  <Pin size={14} className="text-asc-text" />
                )}
                {thread.locked && (
                  <Lock size={14} className="text-asc-muted" />
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-asc-text mb-1 line-clamp-1">
              {thread.title}
            </h3>

            {/* Preview */}
            <p className="text-sm text-asc-secondary line-clamp-2 mb-3">
              {thread.content}
            </p>

            {/* Footer */}
            <div className="flex items-center gap-4 text-xs text-asc-muted">
              <span className="flex items-center gap-1">
                <MessageSquare size={14} />
                {thread._count.posts}
              </span>
              <span className="flex items-center gap-1">
                <Heart size={14} />
                {thread._count.reactions}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {thread.viewCount}
              </span>
              <span className="text-asc-border">•</span>
              <span>
                {thread.channel.space.name} / {thread.channel.name}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

