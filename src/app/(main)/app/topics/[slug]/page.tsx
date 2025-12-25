import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Hash, MessageSquare, ChevronRight, Plus, Clock, User, Eye, ArrowLeft } from 'lucide-react'
import { ThreadCard } from '@/components/thread-card'

export const dynamic = 'force-dynamic'

export default async function TopicDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const session = await getServerSession(authOptions)

  // First try to find a Topic
  const topic = await prisma.topic.findUnique({
    where: { slug: params.slug },
    include: {
      _count: { select: { threads: true } },
      threads: {
        include: {
          author: {
            include: { grade: true }
          },
          _count: {
            select: { posts: true, reactions: true }
          }
        },
        orderBy: [
          { pinned: 'desc' },
          { createdAt: 'desc' }
        ],
        take: 50
      }
    }
  })

  if (!topic) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="bg-dark-900/80 backdrop-blur-xl border-b border-white/5 px-8 py-6 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-dark-400 mb-4">
            <Link href="/app" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/app/topics" className="hover:text-white transition-colors">Topics</Link>
            <ChevronRight size={14} />
            <span className="text-primary">{topic.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: topic.color ? `${topic.color}20` : 'rgba(99, 102, 241, 0.2)' }}
              >
                {topic.icon || <Hash size={24} style={{ color: topic.color || '#6366F1' }} />}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">{topic.name}</h1>
                <p className="text-dark-400 flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1">
                    <MessageSquare size={14} />
                    {topic._count.threads} threads
                  </span>
                </p>
              </div>
            </div>

            <Link
              href="/app/new-thread"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300"
            >
              <Plus size={20} />
              New Thread
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {topic.threads.length === 0 ? (
            <div className="text-center py-32 bg-dark-800/20 border border-white/5 rounded-3xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-6">
                <MessageSquare className="text-primary" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">No threads in this topic yet</h2>
              <p className="text-dark-400 mb-8 max-w-md mx-auto">
                Be the first to start a discussion in {topic.name}!
              </p>
              <Link
                href="/app/new-thread"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                <Plus size={20} />
                Create First Thread
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {topic.threads.map((thread: any) => (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  currentUserId={session?.user?.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
