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
import { ReplyComposer } from '@/components/thread/reply-composer'

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
      channel: {
        include: { space: true }
      },
      posts: {
        include: {
          author: true,
          _count: { select: { reactions: true } }
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
            {thread.channel?.space && (
              <>
                <Link 
                  href={`/app/topics/${thread.channel.space.slug}`}
                  className="hover:text-asc-text transition-colors"
                >
                  {thread.channel.space.name}
                </Link>
                <ChevronRight size={14} />
              </>
            )}
            {thread.channel && (
              <>
                <Link 
                  href={`/app/${thread.channel.space?.slug}/${thread.channel.slug}`}
                  className="hover:text-asc-text transition-colors"
                >
                  {thread.channel.name}
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
                <div className="w-10 h-10 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-semibold">
                  {thread.author.username[0].toUpperCase()}
                </div>
                <div>
                  <Link 
                    href={`/app/u/${thread.author.username}`}
                    className="font-medium text-asc-text hover:underline"
                  >
                    {thread.author.username}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-asc-muted">
                    <span>{thread.author.role}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
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

          {/* Replies Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-asc-text mb-4 flex items-center gap-2">
              <MessageSquare size={20} />
              Replies ({thread._count.posts})
            </h2>

            {thread.posts.length === 0 ? (
              <div className="text-center py-12 bg-asc-surface border border-asc-border rounded-asc">
                <MessageSquare size={32} className="text-asc-muted mx-auto mb-3" />
                <p className="text-asc-secondary mb-1">No replies yet</p>
                <p className="text-sm text-asc-muted">Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {thread.posts.map((post, index) => (
                  <ReplyCard key={post.id} post={post} index={index + 1} />
                ))}
              </div>
            )}
          </div>

          {/* Reply Composer */}
          {!thread.locked && session && (
            <ReplyComposer threadId={thread.id} />
          )}

          {thread.locked && (
            <div className="p-4 bg-asc-surface border border-asc-border rounded-asc text-center">
              <Lock size={20} className="text-asc-muted mx-auto mb-2" />
              <p className="text-asc-muted">This thread has been locked. No new replies allowed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ReplyCard({ post, index }: { post: any; index: number }) {
  const timeAgo = getTimeAgo(new Date(post.createdAt))

  return (
    <article className="bg-asc-surface border border-asc-border rounded-asc">
      {/* Reply Header */}
      <div className="flex items-center justify-between p-4 border-b border-asc-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-semibold text-sm">
            {post.author.username[0].toUpperCase()}
          </div>
          <div>
            <Link 
              href={`/app/u/${post.author.username}`}
              className="font-medium text-asc-text hover:underline text-sm"
            >
              {post.author.username}
            </Link>
            <span className="text-xs text-asc-muted ml-2">
              {timeAgo}
            </span>
          </div>
        </div>
        <span className="text-xs text-asc-muted">#{index}</span>
      </div>

      {/* Reply Content */}
      <div className="p-4">
        <p className="text-asc-secondary text-sm leading-relaxed">{post.content}</p>
      </div>

      {/* Reply Footer */}
      <div className="flex items-center gap-4 px-4 pb-3">
        <button className="flex items-center gap-1 text-xs text-asc-muted hover:text-asc-text transition-colors">
          <Heart size={14} />
          <span>{post._count.reactions}</span>
        </button>
        <button className="text-xs text-asc-muted hover:text-asc-text transition-colors">
          Quote
        </button>
        <button className="text-xs text-asc-muted hover:text-red-400 transition-colors">
          Report
        </button>
      </div>
    </article>
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
