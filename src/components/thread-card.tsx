'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getTimeAgo } from '@/lib/utils'
import { useLanguage } from '@/lib/language-context'
import {
  MessagesSquare,
  Eye,
  Heart,
  Pin,
  Lock,
  Bookmark,
  MoreHorizontal,
  Share2,
  Flag
} from 'lucide-react'
import { ReportModal } from './report-modal'

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
      displayName?: string | null
      image: string | null
      role?: string
      grade?: { name: string; color: string } | null
    }
    channel?: {
      name: string
      slug: string
      space: { name: string; slug: string }
    } | null
    topic?: {
      name: string
      slug: string
      color?: string | null
    } | null
    _count: {
      posts: number
      reactions: number
    }
  }
  currentUserId?: string
}

export function ThreadCard({ thread, currentUserId }: ThreadCardProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(thread._count.reactions)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const { t } = useLanguage()

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!currentUserId) {
      router.push('/login')
      return
    }

    // Optimistic update
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)

    try {
      const res = await fetch(`/api/threads/${thread.id}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        // Revert on error
        setIsLiked(isLiked)
        setLikeCount(thread._count.reactions)
      }
    } catch (error) {
      // Revert on error
      setIsLiked(isLiked)
      setLikeCount(thread._count.reactions)
    }
  }

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!currentUserId) {
      router.push('/login')
      return
    }

    setIsBookmarked(!isBookmarked)

    // TODO: Add API call for bookmarks
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (navigator.share) {
      navigator.share({
        title: thread.title,
        url: `${window.location.origin}/app/thread/${thread.id}`
      })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/app/thread/${thread.id}`)
      // TODO: Show toast "Link copied!"
    }
  }

  return (
    <Link href={`/app/thread/${thread.id}`} className="block group">
      <article className="relative gradient-border p-5 hover:translate-y-[-2px]">
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
        {/* Pinned/Locked indicators */}
        {(thread.pinned || thread.locked) && (
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {thread.pinned && (
              <div className="p-1.5 bg-primary/20 rounded-lg" title={t('nav.pinned')}>
                <Pin size={14} className="text-primary" />
              </div>
            )}
            {thread.locked && (
              <div className="p-1.5 bg-yellow-500/20 rounded-lg" title={t('nav.locked')}>
                <Lock size={14} className="text-yellow-500" />
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4">
          {/* Avatar */}
          <Link
            href={`/app/u/${thread.author.username}`}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0"
          >
            <Avatar
              src={thread.author.image}
              alt={thread.author.username}
              size="md"
              className="ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-300"
            />
          </Link>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Link
                href={`/app/u/${thread.author.username}`}
                className="text-sm font-semibold text-white hover:text-primary transition-colors truncate block"
              >
                {thread.author.displayName || thread.author.username}
              </Link>

              {thread.author.grade && (
                <Badge
                  size="sm"
                  style={{
                    backgroundColor: thread.author.grade.color + '20',
                    color: thread.author.grade.color,
                    borderColor: thread.author.grade.color + '40'
                  }}
                >
                  {thread.author.grade.name}
                </Badge>
              )}

              {thread.author.role === 'ADMIN' && (
                <Badge size="sm" className="bg-red-500/20 text-red-400 border-red-500/40">
                  Admin
                </Badge>
              )}

              {thread.author.role === 'MODERATOR' && (
                <Badge size="sm" className="bg-blue-500/20 text-blue-400 border-blue-500/40">
                  Mod
                </Badge>
              )}

              <span className="text-sm text-dark-400">
                • {getTimeAgo(new Date(thread.createdAt))}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {thread.title}
            </h3>

            {/* Preview */}
            <p className="text-sm text-dark-300 line-clamp-2 mb-4">
              {thread.content}
            </p>

            {/* Category Tag */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-dark-700/50 text-dark-200 border border-white/5">
                {thread.topic ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: thread.topic.color || '#6366F1' }} />
                    {thread.topic.name}
                  </span>
                ) : thread.channel ? (
                  `${thread.channel.space.name} / ${thread.channel.name}`
                ) : (
                  t('nav.general')
                )}
              </span>
            </div>

            {/* Footer - Stats & Actions */}
            <div className="flex items-center justify-between">
              {/* Stats */}
              <div className="flex items-center gap-4">
                {/* Like Button */}
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 text-sm transition-all duration-200 ${isLiked
                    ? 'text-red-500'
                    : 'text-dark-400 hover:text-red-400'
                    }`}
                >
                  <Heart
                    size={18}
                    className={`transition-transform duration-200 ${isLiked ? 'fill-current scale-110' : 'group-hover:scale-110'}`}
                  />
                  <span className="font-medium">{likeCount}</span>
                </button>

                {/* Replies */}
                <div className="flex items-center gap-1.5 text-sm text-dark-400">
                  <MessagesSquare size={18} />
                  <span className="font-medium">{thread._count.posts}</span>
                </div>

                {/* Views */}
                <div className="flex items-center gap-1.5 text-sm text-dark-400">
                  <Eye size={18} />
                  <span className="font-medium">{thread.viewCount}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Bookmark */}
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-lg transition-all duration-200 ${isBookmarked
                    ? 'text-primary bg-primary/10'
                    : 'text-dark-400 hover:text-primary hover:bg-white/5'
                    }`}
                  title={isBookmarked ? t('nav.remove_bookmark') : t('nav.bookmark')}
                >
                  <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                  title={t('nav.share')}
                >
                  <Share2 size={18} />
                </button>

                {/* More Options */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setShowMenu(!showMenu)
                    }}
                    className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {showMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setShowMenu(false)
                        }}
                      />
                      <div className="absolute right-0 bottom-full mb-2 w-48 bg-dark-800 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                        <button
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-dark-200 hover:bg-white/5 hover:text-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleShare(e)
                            setShowMenu(false)
                          }}
                        >
                          <Share2 size={16} />
                          {t('nav.copy_link')}
                        </button>
                        <button
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (!currentUserId) {
                              router.push('/login')
                              return
                            }
                            setIsReportModalOpen(true)
                            setShowMenu(false)
                          }}
                        >
                          <Flag size={16} />
                          {t('nav.report')}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        threadId={thread.id}
        contentType="thread"
      />
    </Link>
  )
}
