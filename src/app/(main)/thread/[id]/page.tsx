import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDate, getTimeAgo } from '@/lib/utils'
import { MessageSquare, Eye, Heart, Share2, Flag, Bookmark, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface ThreadPageProps {
  params: { id: string }
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const session = await getServerSession(authOptions)
  
  const thread = await prisma.thread.findUnique({
    where: { id: params.id },
    include: {
      author: { include: { grade: true } },
      channel: { include: { space: true } },
      posts: {
        include: {
          author: { include: { grade: true } },
          _count: { select: { reactions: true } }
        },
        orderBy: { createdAt: 'asc' }
      },
      _count: { select: { posts: true, reactions: true } }
    },
  })

  if (!thread) {
    notFound()
  }

  // Increment view count
  await prisma.thread.update({
    where: { id: params.id },
    data: { viewCount: { increment: 1 } }
  })

  return (
    <div className="min-h-screen bg-asc-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-asc-bg/80 backdrop-blur-lg border-b border-asc-border">
        <div className="px-6 py-4 flex items-center gap-4">
          <Link 
            href="/app" 
            className="p-2 hover:bg-asc-hover rounded-asc transition-colors"
          >
            <ArrowLeft size={20} className="text-asc-secondary" />
          </Link>
          <div>
            <p className="text-sm text-asc-muted">
              {thread.channel.space.name} / {thread.channel.name}
            </p>
            <h1 className="text-lg font-semibold text-asc-text truncate max-w-xl">
              {thread.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Thread */}
        <article className="bg-asc-surface border border-asc-border rounded-asc-lg p-6 mb-6">
          {/* Author */}
          <div className="flex items-start gap-4 mb-4">
            <Link href={`/app/u/${thread.author.username}`}>
              <Avatar src={thread.author.image} alt={thread.author.username} size="lg" />
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Link 
                  href={`/app/u/${thread.author.username}`}
                  className="font-semibold text-asc-text hover:underline"
                >
                  {thread.author.username}
                </Link>
                {thread.author.grade && (
                  <Badge style={{ backgroundColor: thread.author.grade.color }}>
                    {thread.author.grade.name}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-asc-muted">
                {getTimeAgo(new Date(thread.createdAt))}
              </p>
            </div>
          </div>

          {/* Title & Content */}
          <h2 className="text-2xl font-bold text-asc-text mb-4">{thread.title}</h2>
          <div className="prose prose-invert max-w-none text-asc-secondary">
            <p className="whitespace-pre-wrap">{thread.content}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-asc-border text-sm text-asc-muted">
            <span className="flex items-center gap-2">
              <Eye size={16} /> {thread.viewCount} views
            </span>
            <span className="flex items-center gap-2">
              <MessageSquare size={16} /> {thread._count.posts} replies
            </span>
            <span className="flex items-center gap-2">
              <Heart size={16} /> {thread._count.reactions} likes
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4">
            <button className="btn-ghost flex items-center gap-2">
              <Heart size={18} /> Like
            </button>
            <button className="btn-ghost flex items-center gap-2">
              <Bookmark size={18} /> Save
            </button>
            <button className="btn-ghost flex items-center gap-2">
              <Share2 size={18} /> Share
            </button>
            <button className="btn-ghost flex items-center gap-2 text-asc-muted">
              <Flag size={18} /> Report
            </button>
          </div>
        </article>

        {/* Replies */}
        <section>
          <h3 className="text-lg font-semibold text-asc-text mb-4">
            Replies ({thread.posts.length})
          </h3>
          
          {thread.posts.length === 0 ? (
            <div className="bg-asc-surface border border-asc-border rounded-asc p-8 text-center">
              <MessageSquare size={40} className="mx-auto mb-3 text-asc-muted" />
              <p className="text-asc-secondary">No replies yet</p>
              <p className="text-sm text-asc-muted">Be the first to reply!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {thread.posts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-asc-surface border border-asc-border rounded-asc p-4"
                >
                  <div className="flex items-start gap-3">
                    <Link href={`/app/u/${post.author.username}`}>
                      <Avatar src={post.author.image} alt={post.author.username} />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Link 
                          href={`/app/u/${post.author.username}`}
                          className="font-medium text-asc-text hover:underline"
                        >
                          {post.author.username}
                        </Link>
                        {post.author.grade && (
                          <Badge style={{ backgroundColor: post.author.grade.color }}>
                            {post.author.grade.name}
                          </Badge>
                        )}
                        <span className="text-sm text-asc-muted">
                          {getTimeAgo(new Date(post.createdAt))}
                        </span>
                      </div>
                      <p className="text-asc-secondary whitespace-pre-wrap">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="text-sm text-asc-muted hover:text-asc-text flex items-center gap-1">
                          <Heart size={14} /> {post._count.reactions}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Reply composer */}
        {session && !thread.locked && (
          <div className="mt-6 bg-asc-surface border border-asc-border rounded-asc p-4">
            <textarea 
              placeholder="Write a reply..."
              className="w-full bg-asc-bg border border-asc-border rounded-asc p-3 text-asc-text placeholder:text-asc-muted resize-none focus:outline-none focus:ring-2 focus:ring-asc-text/20"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button className="btn-primary">Post Reply</button>
            </div>
          </div>
        )}

        {thread.locked && (
          <div className="mt-6 bg-asc-surface border border-asc-border rounded-asc p-4 text-center text-asc-muted">
            🔒 This thread is locked
          </div>
        )}
      </div>
    </div>
  )
}
