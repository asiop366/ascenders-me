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
import { ThreadActions } from '@/components/thread/thread-actions'
import { BookmarkButton } from '@/components/thread/bookmark-button'
import { getTimeAgo } from '@/lib/utils'

export default async function ThreadPage({
  params,
}: {
  params: { threadId: string }
}) {
  const session = await getServerSession(authOptions)

  const thread = await prisma.thread.findUnique({
    where: { id: params.threadId },
    include: {
      author: {
        include: { grade: true }
      },
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
      bookmarks: session?.user?.id ? {
        where: { userId: session.user.id }
      } : false,
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

  const isBookmarked = (thread as any).bookmarks?.length > 0

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

            <div className="flex items-center gap-2">
              {session?.user && (
                <BookmarkButton threadId={thread.id} initialBookmarked={isBookmarked} />
              )}
              <ThreadActions
                threadId={thread.id}
                threadTitle={thread.title}
                authorId={thread.authorId}
                currentUserId={session?.user?.id}
                currentUserRole={session?.user?.role}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* Original Post */}
          <article className="bg-asc-surface border border-asc-border rounded-asc-lg mb-6">
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
                    {thread.author.grade ? (
                      <Badge size="sm" style={{ backgroundColor: thread.author.grade.color + '20', color: thread.author.grade.color }}>
                        {thread.author.grade.name}
                      </Badge>
                    ) : (
                      <Badge size="sm" className="bg-dark-700 text-dark-300">
                        Default
                      </Badge>
                    )}
                    <span className="text-xs text-asc-muted flex items-center gap-1">
                      <Clock size={12} />
                      {getTimeAgo(new Date(thread.createdAt))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {thread.imageUrl && (
              <div className="border-b border-asc-border">
                <img
                  src={thread.imageUrl}
                  alt="Thread image"
                  className="w-full max-h-96 object-cover"
                />
              </div>
            )}

            <div className="p-4">
              <div className="prose prose-invert max-w-none text-asc-secondary leading-relaxed whitespace-pre-wrap">
                {thread.content}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-asc-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-asc-muted">
                  <Heart size={16} />
                  <span>{thread._count.reactions}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-asc-muted">
                  <MessageSquare size={16} />
                  <span>{thread._count.posts} replies</span>
                </div>
                <span className="flex items-center gap-2 text-sm text-asc-muted">
                  <Eye size={16} />
                  <span>{thread.viewCount} views</span>
                </span>
              </div>
            </div>
          </article>

          {/* Replies Section - Client Component */}
          <ThreadReplies
            threadId={thread.id}
            posts={thread.posts as any}
            isLocked={thread.locked}
            isAuthenticated={!!session}
            userId={session?.user?.id}
            userRole={session?.user?.role}
          />
        </div>
      </div>
    </div>
  )
}
