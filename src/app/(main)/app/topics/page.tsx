import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import {
  Hash,
  MessageSquare,
  ChevronRight,
  Plus,
  Search,
  Flame
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function TopicsPage() {
  const session = await getServerSession(authOptions)

  const topics = await prisma.topic.findMany({
    include: {
      _count: {
        select: { threads: true }
      }
    },
    orderBy: { position: 'asc' }
  })

  const isAdmin = session?.user?.role === 'ADMIN'

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="bg-dark-900/80 backdrop-blur-xl border-b border-white/5 px-8 py-6 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <Hash size={28} className="text-primary" />
                Topics
              </h1>
              <p className="text-dark-400 mt-1">Browse discussion topics and find what interests you</p>
            </div>

            {isAdmin && (
              <Link href="/app/admin/topics/new" className="btn-primary flex items-center gap-2">
                <Plus size={18} />
                New Topic
              </Link>
            )}
          </div>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search topics..."
              className="w-full bg-dark-800/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {topics.length === 0 ? (
            <div className="text-center py-32 bg-dark-800/20 border border-white/5 rounded-3xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-6">
                <Hash className="text-primary" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">No topics yet</h2>
              <p className="text-dark-400 mb-8 max-w-md mx-auto">
                Topics will appear here once created by administrators.
              </p>
              {isAdmin && (
                <Link href="/app/admin/topics/new" className="btn-primary inline-flex items-center gap-2">
                  <Plus size={18} />
                  Create first topic
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TopicCard({ topic }: { topic: any }) {
  return (
    <Link
      href={`/app/topics/${topic.slug}`}
      className="group gradient-border p-6 hover:translate-y-[-4px]"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{ backgroundColor: topic.color ? `${topic.color}20` : 'rgba(99, 102, 241, 0.2)' }}
        >
          {topic.icon || <Hash size={20} style={{ color: topic.color || '#6366F1' }} />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white group-hover:text-primary transition-colors truncate">
            {topic.name}
          </h3>
          <p className="text-sm text-dark-400 mt-1 flex items-center gap-1">
            <MessageSquare size={14} />
            {topic._count.threads} threads
          </p>
        </div>
        <ChevronRight size={18} className="text-dark-500 group-hover:text-primary transition-colors shrink-0" />
      </div>
    </Link>
  )
}
