'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageSquare, ThumbsUp, Clock, Pin, Bookmark } from 'lucide-react'
import { getTimeAgo } from '@/lib/utils'

interface ThreadCardProps {
  thread: any
  currentUserId?: string
}

export function ThreadCard({ thread, currentUserId }: ThreadCardProps) {
  const [reactions, setReactions] = useState(thread._count?.reactions || 0)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const authorInitial = thread.author?.username?.[0]?.toUpperCase() || 'U'
  const authorName = thread.author?.username || 'Unknown'
  const gradeName = thread.author?.grade?.name
  const gradeColor = thread.author?.grade?.color
  const spaceName = thread.channel?.space?.name || 'General'
  const channelName = thread.channel?.name || 'Discussion'

  const handleReaction = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isLoading) return

    setIsLoading(true)

    try {
      const res = await fetch(`/api/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId: thread.id, type: 'like' }),
      })

      const data = await res.json()

      if (res.ok) {
        if (data.action === 'added') {
          setIsLiked(true)
          setReactions((prev: number) => prev + 1)  // ✅ TYPÉ
        } else {
          setIsLiked(false)
          setReactions((prev: number) => prev - 1)  // ✅ TYPÉ
        }
      }
    } catch (error) {
      console.error('Reaction error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsBookmarked(!isBookmarked)
    // TODO: Implement API call
  }

  return (
    <Link
      href={`/app/thread/${thread.id}`}
      className="block gradient-border p-6 group"
    >
      <div className="flex gap-5">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-xl text-white shadow-glow">
              {authorInitial}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
          </div>
        </div>

        {/* Thread Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex items-start gap-3 mb-2">
            {thread.pinned && (
              <Pin size={18} className="text-yellow-500 flex-shrink-0 mt-1" />
            )}
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
              {thread.title}
            </h3>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-dark-200 flex-wrap mb-4">
            <span className="flex items-center gap-2">
              <span className="font-semibold text-dark-100">
                {authorName}
              </span>
              {gradeName && gradeColor && (
                <span 
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ 
                    background: `linear-gradient(135deg, ${gradeColor}20, ${gradeColor}10)`,
                    color: gradeColor,
                    border: `1px solid ${gradeColor}40`
                  }}
                >
                  {gradeName}
                </span>
              )}
            </span>
            
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-dark-300" />
              {getTimeAgo(thread.createdAt)}
            </span>

            <span className="text-dark-300">
              in <span className="text-primary">{spaceName}</span> / {channelName}
            </span>
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-dark-300">
              <span className="flex items-center gap-2 hover:text-primary transition-colors">
                <MessageSquare size={16} />
                <span className="font-medium">{thread._count?.posts || 0}</span> replies
              </span>
              
              <button
                onClick={handleReaction}
                disabled={isLoading}
                className={`flex items-center gap-2 transition-all ${
                  isLiked 
                    ? 'text-red-500 hover:text-red-400' 
                    : 'hover:text-secondary'
                } disabled:opacity-50`}
              >
                <ThumbsUp 
                  size={16} 
                  className={isLiked ? 'fill-current' : ''} 
                />
                <span className="font-medium">{reactions}</span> reactions
              </button>
              
              <span className="hover:text-accent transition-colors">
                <span className="font-medium">{thread.viewCount || 0}</span> views
              </span>
            </div>

            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg transition-all ${
                isBookmarked 
                  ? 'text-yellow-500 bg-yellow-500/10' 
                  : 'text-dark-300 hover:text-yellow-500 hover:bg-yellow-500/10'
              }`}
            >
              <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
