import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Pin,
  Lock,
  Heart,
  MessageSquare,
  Eye,
  Share2,
  Bookmark,
  Flag,
  MoreHorizontal,
  ChevronRight,
  Clock
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ThreadReplies } from '@/components/thread/thread-replies'

export default async function ThreadPage({
  params,
}: {
  params: { threadId: string }
}) {
  const session = await getServerSession(authOptions)

  const thread = await prisma.thread.findUnique({
    where: { id: params.threadId },
    include: {
      author: true,
      topic: {
        include: { category: true }
      },
      posts: {
        where: { parentId: null },
        include: {
          author: true,
          _count: { select: { reactions: true, replies: true } },
          replies: {
            include: {
              author: true,
              _count: { select: { reactions: true, replies: true } },
              replies: {
                include: {
                  author: true,
                  _count: { select: { reactions: true, replies: true } }
                },
                orderBy: { createdAt: 'asc' }
              }
            },
            orderBy: { createdAt: 'asc' }
          }
        },
        orderBy: { createdAt: 'asc' }
      },
      _count: {
        select: { posts: true, reactions: true }
      }
    }
  })

  if (!thread) {
    notFound()
  }

  // Increment view count
  await prisma.thread.update({
    where: { id: thread.id },
    data: { viewCount: { increment: 1 } }
  })

  const timeAgo = getTimeAgo(new Date(thread.createdAt))

  return (
    <div className="h-full flex flex-col bg-asc-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-asc-bg/95 backdrop-blur border-b border-asc-border">
        <div className="px-6 py-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-asc-muted mb-2">
            <Link href="/app" className="hover:text-asc-text transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            {thread.topic?.category && (
              <>
                <span className="hover:text-asc-text transition-colors">
                  {thread.topic.category.name}
                </span>
                <ChevronRight size={14} />
              </>
            )}
            {thread.topic && (
              <>
                <Link
                  href={`/app/topics/${thread.topic.slug}`}
                  className="hover:text-asc-text transition-colors"
                >
                  {thread.topic.name}
                </Link>
                <ChevronRight size={14} />
              </>
            )}
            <span className="text-asc-secondary truncate max-w-[200px]">{thread.title}</span>
          </div>

          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {thread.pinned && (
                  <span className="badge badge-pinned flex items-center gap-1">
                    <Pin size={10} />
                    PINNED
                  </span>
                )}
                {thread.locked && (
                  <span className="badge badge-locked flex items-center gap-1">
                    <Lock size={10} />
                    LOCKED
                  </span>
                )}
              </div>
              <h1 className="text-xl font-bold text-asc-text">{thread.title}</h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="btn-ghost p-2" title="Share">
                <Share2 size={18} />
              </button>
              <button className="btn-ghost p-2" title="Bookmark">
                <Bookmark size={18} />
              </button>
              <button className="btn-ghost p-2" title="More">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* Original Post */}
          <article className="bg-asc-surface border border-asc-border rounded-asc-lg mb-6">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4 border-b border-asc-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-semibold overflow-hidden">
                  {thread.author.image ? (
                    <img src={thread.author.image} alt={thread.author.username} className="w-full h-full object-cover" />
                  ) : (
                    thread.author.username[0].toUpperCase()
                  )}
                </div>
                <div>
                  <Link
                    href={`/app/u/${thread.author.username}`}
                    className="font-medium text-asc-text hover:underline"
                  >
                    {thread.author.username}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    {thread.author.role === 'OWNER' && (
                      <Badge size="sm" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40">
                        Owner
                      </Badge>
                    )}
                    {thread.author.role === 'ADMIN' && (
                      <Badge size="sm" className="bg-red-500/20 text-red-400 border-red-500/40">
                        Admin
                      </Badge>
                    )}
                    <span className="text-xs text-asc-muted flex items-center gap-1">
                      <Clock size={12} />
                      {timeAgo}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-asc-hover rounded-asc transition-colors">
                <MoreHorizontal size={16} className="text-asc-muted" />
              </button>
            </div>

            {/* Thread Image */}
            {thread.imageUrl && (
              <div className="border-b border-asc-border">
                <img
                  src={thread.imageUrl}
                  alt="Thread image"
                  className="w-full max-h-96 object-cover"
                />
              </div>
            )}

            {/* Post Content */}
            <div className="p-4">
              <div className="prose prose-invert max-w-none text-asc-secondary leading-relaxed">
                {thread.content}
              </div>
            </div>

            {/* Post Footer */}
            <div className="flex items-center justify-between p-4 border-t border-asc-border">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-sm text-asc-muted hover:text-asc-text transition-colors">
                  <Heart size={16} />
                  <span>{thread._count.reactions}</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-asc-muted hover:text-asc-text transition-colors">
                  <MessageSquare size={16} />
                  <span>{thread._count.posts} replies</span>
                </button>
                <span className="flex items-center gap-2 text-sm text-asc-muted">
                  <Eye size={16} />
                  <span>{thread.viewCount} views</span>
                </span>
              </div>
              <button className="flex items-center gap-2 text-sm text-asc-muted hover:text-red-400 transition-colors">
                <Flag size={16} />
                <span>Report</span>
              </button>
            </div>
          </article>

          {/* Replies Section - Client Component */}
          <ThreadReplies
            threadId={thread.id}
            posts={thread.posts}
            isLocked={thread.locked}
            isAuthenticated={!!session}
          />
        </div>
      </div>
    </div>
  )
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
