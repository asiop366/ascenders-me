import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { 
  TrendingUp, 
  MessageSquare, 
  Eye, 
  Heart,
  Flame,
  Clock,
  Award
} from 'lucide-react'

export default async function TrendingPage() {
  const session = await getServerSession(authOptions)

  // Fetch trending threads (most active in last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const trendingThreads = await prisma.thread.findMany({
    where: {
      createdAt: { gte: sevenDaysAgo }
    },
    include: {
      author: true,
      channel: {
        include: { space: true }
      },
      _count: {
        select: { posts: true, reactions: true }
      }
    },
    orderBy: [
      { viewCount: 'desc' },
      { createdAt: 'desc' }
    ],
    take: 20,
  })

  // Calculate trending score
  const threadsWithScore = trendingThreads.map(thread => ({
    ...thread,
    score: thread.viewCount + (thread._count.posts * 3) + (thread._count.reactions * 2)
  })).sort((a, b) => b.score - a.score)

  return (
    <div className="h-full overflow-y-auto bg-asc-bg">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-asc-text flex items-center gap-2">
            <TrendingUp size={24} />
            Trending
          </h1>
          <p className="text-asc-muted mt-1">
            Most active discussions this week
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center gap-2 mb-6 border-b border-asc-border">
          <button className="px-4 py-3 text-sm font-medium text-asc-text border-b-2 border-asc-text">
            This Week
          </button>
          <button className="px-4 py-3 text-sm text-asc-muted hover:text-asc-text transition-colors">
            This Month
          </button>
          <button className="px-4 py-3 text-sm text-asc-muted hover:text-asc-text transition-colors">
            All Time
          </button>
        </div>

        {/* Trending List */}
        {threadsWithScore.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-asc-surface border border-asc-border rounded-full flex items-center justify-center mx-auto mb-4">
              <Flame size={32} className="text-asc-muted" />
            </div>
            <h2 className="text-lg font-semibold text-asc-text mb-2">No trending threads</h2>
            <p className="text-asc-muted mb-4">Start some discussions to see them here!</p>
            <Link href="/app/new" className="btn-primary">
              Create Thread
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {threadsWithScore.map((thread, index) => (
              <TrendingCard key={thread.id} thread={thread} rank={index + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TrendingCard({ thread, rank }: { thread: any; rank: number }) {
  const timeAgo = getTimeAgo(new Date(thread.createdAt))

  return (
    <article className="card group">
      <div className="flex gap-4">
        {/* Rank */}
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
          {rank <= 3 ? (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
              rank === 2 ? 'bg-gray-400/20 text-gray-400' :
              'bg-orange-500/20 text-orange-500'
            }`}>
              {rank === 1 ? <Award size={18} /> : rank}
            </div>
          ) : (
            <span className="text-lg font-bold text-asc-muted">{rank}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <Link 
              href={`/app/thread/${thread.id}`}
              className="text-base font-semibold text-asc-text hover:underline line-clamp-1"
            >
              {thread.title}
            </Link>
            
            {/* Hot badge for top 3 */}
            {rank <= 3 && (
              <span className="badge badge-pinned flex items-center gap-1">
                <Flame size={10} />
                HOT
              </span>
            )}
          </div>

          {/* Excerpt */}
          <p className="text-sm text-asc-secondary line-clamp-2 mb-3">
            {thread.content}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-asc-muted">
            {/* Channel */}
            {thread.channel && (
              <span className="tag">{thread.channel.name}</span>
            )}

            {/* Author & Time */}
            <span>
              by <Link href={`/app/u/${thread.author.username}`} className="text-asc-secondary hover:text-asc-text">
                {thread.author.username}
              </Link>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {timeAgo}
            </span>

            {/* Stats */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="flex items-center gap-1">
                <MessageSquare size={12} />
                {thread._count.posts}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={12} />
                {thread.viewCount}
              </span>
              <span className="flex items-center gap-1">
                <Heart size={12} />
                {thread._count.reactions}
              </span>
            </div>
          </div>
        </div>
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
