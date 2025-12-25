import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Pin, ThumbsUp, MessageSquare, Clock, Share2 } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getTimeAgo } from '@/lib/utils'
import { ReplyForm } from '@/components/reply-form'
import { PostCard } from '@/components/forum/post-card'  // ✅ CORRIGÉ

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  // Incrémenter les vues
  await prisma.thread.update({
    where: { id: params.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => { })

  const thread = await prisma.thread.findUnique({
    where: { id: params.id },
    include: {
      author: {
        include: {
          grade: true,
        },
      },
      topic: true,
      channel: {
        include: {
          space: true,
        },
      },
      posts: {
        include: {
          author: {
            include: {
              grade: true,
            },
          },
          _count: {
            select: {
              reactions: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
      _count: {
        select: {
          posts: true,
          reactions: true,
        },
      },
    },
  })

  if (!thread) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="glass border-b border-white/5 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-dark-200 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to feed
          </Link>

          <div className="flex items-center gap-3 text-sm text-dark-300">
            {thread.topic ? (
              <>
                <Link href="/app/topics" className="hover:text-primary transition-colors">
                  Topics
                </Link>
                <span>/</span>
                <span className="text-primary">{thread.topic.name}</span>
              </>
            ) : thread.channel ? (
              <>
                <Link href="/app" className="hover:text-primary transition-colors">
                  {thread.channel.space.name}
                </Link>
                <span>/</span>
                <span className="text-dark-200">{thread.channel.name}</span>
              </>
            ) : (
              <span className="text-dark-200">General</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Original Post */}
          <div className="glass rounded-2xl p-8">
            {/* Title */}
            <div className="flex items-start gap-3 mb-6">
              {thread.pinned && (
                <Pin size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
              )}
              <h1 className="text-4xl font-display font-bold text-white">
                {thread.title}
              </h1>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
              <Link href={`/app/u/${thread.author.username}`}>
                <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-xl text-white shadow-glow hover:scale-110 transition-transform">
                  {thread.author.username[0].toUpperCase()}
                </div>
              </Link>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    href={`/app/u/${thread.author.username}`}
                    className="font-bold text-white hover:text-primary transition-colors"
                  >
                    {thread.author.displayName || thread.author.username}
                  </Link>
                  {thread.author.grade && (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: `linear-gradient(135deg, ${thread.author.grade.color}20, ${thread.author.grade.color}10)`,
                        color: thread.author.grade.color,
                        border: `1px solid ${thread.author.grade.color}40`
                      }}
                    >
                      {thread.author.grade.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-dark-300">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {getTimeAgo(thread.createdAt)}
                  </span>
                </div>
              </div>

              <button className="p-2 rounded-lg hover:bg-dark-800 text-dark-300 hover:text-white transition-all">
                <Share2 size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-dark-100 leading-relaxed whitespace-pre-wrap">
                {thread.content}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-dark-200">
                <MessageSquare size={20} />
                <span className="font-semibold">{thread._count.posts}</span> replies
              </div>
              <div className="flex items-center gap-2 text-dark-200">
                <ThumbsUp size={20} />
                <span className="font-semibold">{thread._count.reactions}</span> reactions
              </div>
              <div className="text-dark-300">
                <span className="font-semibold">{thread.viewCount}</span> views
              </div>
            </div>
          </div>

          {/* Replies */}
          {thread.posts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white px-2">
                {thread.posts.length} {thread.posts.length === 1 ? 'Reply' : 'Replies'}
              </h2>
              {thread.posts.map((post: any) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId={session?.user?.id}
                />
              ))}
            </div>
          )}

          {/* Reply Form */}
          {session ? (
            <ReplyForm threadId={thread.id} />
          ) : (
            <div className="glass rounded-2xl p-8 text-center">
              <p className="text-dark-200 mb-4">Sign in to reply to this thread</p>
              <Link href="/login" className="btn-primary inline-block">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
