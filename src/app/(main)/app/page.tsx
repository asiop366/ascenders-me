import { Plus, Search, SlidersHorizontal, TrendingUp, Clock, MessageSquare, Flame } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ThreadCard } from '@/components/thread-card'

export const dynamic = 'force-dynamic'

// Filter/Sort options component
function FilterBar() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide w-full sm:w-auto">
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/10 border border-primary/30 rounded-xl text-sm font-bold text-white transition-all shadow-glow whitespace-nowrap">
          <Flame size={16} className="text-primary animate-pulse" />
          All
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 border border-white/5 rounded-xl text-sm font-medium text-dark-300 hover:bg-dark-800 hover:text-white hover:border-white/10 transition-all whitespace-nowrap">
          <TrendingUp size={16} />
          Trending
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 border border-white/5 rounded-xl text-sm font-medium text-dark-300 hover:bg-dark-800 hover:text-white hover:border-white/10 transition-all whitespace-nowrap">
          <Clock size={16} />
          Recent
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 border border-white/5 rounded-xl text-sm font-medium text-dark-400 hover:bg-dark-800 hover:text-white hover:border-white/10 transition-all whitespace-nowrap">
          <MessageSquare size={16} />
          Discussions
        </button>
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="flex items-center gap-2 w-full sm:w-auto px-4 py-2 bg-dark-800/50 border border-white/5 rounded-xl text-sm text-dark-300 hover:bg-dark-800 hover:text-white transition-all">
          <SlidersHorizontal size={16} />
          <span className="flex-1 text-left">Sort by: Recent</span>
        </button>
      </div>
    </div>
  )
}

// Stats Bar
function StatsBar({ threadCount, userCount }: { threadCount: number; userCount: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="gradient-border p-4 text-center hover:translate-y-[-2px]">
        <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent shadow-glow">
          {threadCount.toLocaleString()}
        </p>
        <p className="text-xs font-semibold text-dark-400 uppercase tracking-widest mt-1">Total Threads</p>
      </div>
      <div className="gradient-border p-4 text-center hover:translate-y-[-2px]">
        <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          {userCount.toLocaleString()}
        </p>
        <p className="text-xs font-semibold text-dark-400 uppercase tracking-widest mt-1">Active Members</p>
      </div>
      <div className="gradient-border p-4 text-center hover:translate-y-[-2px]">
        <p className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent animate-pulse">
          24/7
        </p>
        <p className="text-xs font-semibold text-dark-400 uppercase tracking-widest mt-1">Community Active</p>
      </div>
    </div>
  )
}

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  const [threads, threadCount, userCount] = await Promise.all([
    prisma.thread.findMany({
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
        _count: {
          select: {
            posts: true,
            reactions: true,
          },
        },
      },
      orderBy: [
        { pinned: 'desc' },
        { createdAt: 'desc' },
      ],
      take: 50,
    }),
    prisma.thread.count(),
    prisma.user.count(),
  ])

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Premium Header */}
      <div className="bg-dark-900/80 backdrop-blur-xl border-b border-white/5 px-6 lg:px-8 py-6 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight truncate">
                Welcome back{session?.user?.username ? `, ${session.user.username}` : ''}! 👋
              </h1>
              <p className="text-dark-400 mt-1 text-sm lg:text-base truncate">Discover the latest discussions and level up yourself</p>
            </div>

            <Link
              href="/app/new-thread"
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300 text-sm"
            >
              <Plus size={18} />
              CREATE THREAD
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search threads, topics, users..."
              className="w-full bg-dark-800/50 border border-white/5 rounded-2xl pl-11 pr-4 py-2.5 text-white text-sm placeholder-dark-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-dark-500">
              <kbd className="px-1.5 py-0.5 bg-dark-700 rounded decoration-none border-none">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-dark-700 rounded decoration-none border-none">K</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          {/* Stats */}
          <StatsBar threadCount={threadCount} userCount={userCount} />

          {/* Filters */}
          <FilterBar />

          {/* Thread List */}
          {threads.length === 0 ? (
            <div className="text-center py-24 bg-dark-800/20 border border-white/5 rounded-3xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-6">
                <Plus className="text-primary" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">No threads yet</h2>
              <p className="text-dark-400 mb-8 max-w-md mx-auto text-sm">
                Be the first to start a discussion! Share your knowledge or ask questions to the community.
              </p>
              <Link
                href="/app/new-thread"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                <Plus size={18} />
                Create First Thread
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {threads.map((thread: any) => (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  currentUserId={session?.user?.id}
                />
              ))}

              {/* Load More */}
              {threads.length >= 50 && (
                <div className="text-center pt-8">
                  <button className="px-8 py-3 bg-dark-800/50 border border-white/10 rounded-xl text-dark-300 hover:bg-dark-800 hover:text-white hover:border-white/20 transition-all font-medium">
                    Load More Threads
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
