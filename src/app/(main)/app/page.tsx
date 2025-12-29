import { Search, Hash, MessageSquare, Plus, Clock } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { StatsSidebar } from '@/components/forum/stats-sidebar'
import { NewThreadsSidebar } from '@/components/forum/new-threads-sidebar'
import { TrendingSidebar } from '@/components/forum/trending-sidebar'
import { Avatar } from '@/components/ui/avatar'
import { getTimeAgo } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  const categories = await prisma.forumCategory.findMany({
    orderBy: { position: 'asc' },
    include: {
      topics: {
        orderBy: { position: 'asc' },
        include: {
          _count: {
            select: { threads: true }
          },
          threads: {
            take: 1,
            orderBy: { updatedAt: 'desc' },
            include: {
              author: {
                select: { username: true, displayName: true, image: true }
              }
            }
          }
        }
      }
    }
  })

  // Get total post count across all threads for each topic
  // Note: This is an expensive operation if not cached or aggregated
  const topicsWithPostCounts = await Promise.all(
    (categories as any[]).flatMap((c: any) => c.topics).map(async (topic: any) => {
      const postsCount = await prisma.post.count({
        where: { thread: { topicId: topic.id } }
      })
      return { topicId: topic.id, postsCount }
    })
  )

  const postCountMap = Object.fromEntries((topicsWithPostCounts as any[]).map((t: any) => [t.topicId, t.postsCount]))

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="bg-dark-900/80 backdrop-blur-xl border-b border-white/5 px-6 py-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Ascenders me
            </h1>
            <p className="text-dark-400 text-xs mt-1 uppercase tracking-widest font-bold">The #1 Self-Improvement Forum</p>
          </div>

          <div className="flex items-center gap-3">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const query = (e.target as any).querySelector('input').value
                if (query) window.location.href = `/app/search?q=${encodeURIComponent(query)}`
              }}
              className="relative"
            >
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-dark-800/50 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 w-48 lg:w-64 transition-all"
              />
            </form>
            <Link
              href="/app/new-thread"
              className="px-4 py-2 bg-primary rounded-xl text-white text-sm font-bold hover:shadow-glow transition-all flex items-center gap-2"
            >
              <Plus size={16} />
              NEW POST
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Forum Index */}
          <div className="lg:col-span-8 space-y-8">
            {(categories as any[]).map((category: any) => (
              <div key={category.id} className="space-y-3">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-sm font-black text-dark-300 uppercase tracking-[0.2em]">
                    {category.name}
                  </h2>
                </div>

                <div className="glass rounded-3xl border border-white/5 divide-y divide-white/5 overflow-hidden">
                  {category.topics.map((topic: any) => {
                    const lastThread = topic.threads[0]
                    const threadCount = topic._count.threads
                    const postCount = (postCountMap[topic.id] || 0) + threadCount

                    return (
                      <div key={topic.id} className="group hover:bg-white/[0.02] transition-colors p-5 flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-dark-800 border border-white/5 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                          {topic.icon ? <span className="text-2xl">{topic.icon}</span> : <Hash size={24} />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/app/topics/${topic.slug}`}
                            className="text-lg font-bold text-white hover:text-primary transition-colors block leading-snug"
                          >
                            {topic.name}
                          </Link>
                          <p className="text-xs text-dark-400 mt-1 line-clamp-1 italic">
                            {topic.description}
                          </p>
                        </div>

                        <div className="hidden md:flex items-center gap-8 shrink-0 px-4">
                          <div className="text-center w-16">
                            <div className="text-sm font-bold text-white">{threadCount.toLocaleString()}</div>
                            <div className="text-[10px] text-dark-500 uppercase font-black tracking-wider">Threads</div>
                          </div>
                          <div className="text-center w-16">
                            <div className="text-sm font-bold text-white">{postCount.toLocaleString()}</div>
                            <div className="text-[10px] text-dark-500 uppercase font-black tracking-wider">Posts</div>
                          </div>
                        </div>

                        <div className="hidden lg:block w-48 shrink-0">
                          {lastThread ? (
                            <div className="flex items-center gap-3">
                              <Avatar
                                src={lastThread.author.image}
                                alt={lastThread.author.username}
                                size="sm"
                                className="rounded-lg"
                              />
                              <div className="min-w-0">
                                <Link
                                  href={`/app/threads/${lastThread.id}`}
                                  className="text-[11px] font-bold text-white hover:text-primary transition-colors line-clamp-1 block"
                                >
                                  {lastThread.title}
                                </Link>
                                <div className="text-[10px] text-dark-500 flex items-center gap-1 mt-0.5">
                                  <span>{getTimeAgo(new Date(lastThread.updatedAt))}</span>
                                  <span>•</span>
                                  <span className="text-primary/70">{lastThread.author.displayName || lastThread.author.username}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-dark-600">No activity</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebars */}
          <div className="lg:col-span-4 space-y-8">
            <TrendingSidebar />
            <NewThreadsSidebar />
            <StatsSidebar />
          </div>

        </div>
      </div>
    </div>
  )
}
