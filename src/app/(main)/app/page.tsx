import Link from 'next/link'
import { Plus, MessageSquare, ThumbsUp, Clock } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getTimeAgo } from '@/lib/utils'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  // Récupérer tous les threads
  const threads = await prisma.thread.findMany({
    include: {
      author: {
        include: {
          grade: true,
        },
      },
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
  })

  return (
    <div className="min-h-screen bg-asc-bg flex flex-col">
      {/* Header */}
      <div className="border-b border-asc-border bg-asc-surface px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-asc-text">
          WELCOME TO ASCENDERS
        </h1>
        
        <Link
          href="/app/new-thread"
          className="inline-flex items-center gap-2 px-6 py-3 bg-asc-text text-asc-bg rounded-lg font-semibold hover:bg-white transition-all"
        >
          <Plus size={20} />
          CREATE NEW THREAD
        </Link>
      </div>

      {/* Main Content - Thread Feed HAUT GAUCHE */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl">
          {threads.length === 0 ? (
            <div className="text-center py-20 text-asc-muted">
              <p className="text-lg">No threads yet. Be the first to create one!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {threads.map((item: any) => {
                const authorInitial = item.author?.username?.[0]?.toUpperCase() || 'U'
                const authorName = item.author?.username || 'Unknown'
                const gradeName = item.author?.grade?.name
                const gradeColor = item.author?.grade?.color
                const spaceName = item.channel?.space?.name || 'General'
                const channelName = item.channel?.name || 'Discussion'

                return (
                  <Link
                    key={item.id}
                    href={`/thread/${item.id}`}
                    className="block bg-asc-surface border border-asc-border rounded-lg p-4 hover:border-asc-text transition-all group"
                  >
                    <div className="flex gap-4">
                      {/* Author Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                          {authorInitial}
                        </div>
                      </div>

                      {/* Thread Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h3 className="text-lg font-semibold text-asc-text group-hover:text-white transition-colors mb-1">
                          {item.pinned && (
                            <span className="text-yellow-500 mr-2">📌</span>
                          )}
                          {item.title}
                        </h3>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-asc-muted flex-wrap">
                          <span className="flex items-center gap-1">
                            <span className="font-medium text-asc-secondary">
                              {authorName}
                            </span>
                            {gradeName && gradeColor && (
                              <span 
                                className="text-xs px-2 py-0.5 rounded" 
                                style={{ 
                                  backgroundColor: gradeColor + '20', 
                                  color: gradeColor 
                                }}
                              >
                                {gradeName}
                              </span>
                            )}
                          </span>
                          
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {getTimeAgo(item.createdAt)}
                          </span>

                          <span className="text-asc-secondary">
                            in {spaceName} / {channelName}
                          </span>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mt-3 text-sm text-asc-muted">
                          <span className="flex items-center gap-1">
                            <MessageSquare size={16} />
                            {item._count.posts} replies
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp size={16} />
                            {item._count.reactions} reactions
                          </span>
                          <span>
                            {item.viewCount} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* User Profile Footer CENTRÉ */}
      <div className="border-t border-asc-border bg-asc-surface px-6 py-4 sticky bottom-0">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xl">
            {session?.user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <div className="font-semibold text-asc-text">
              {session?.user?.username || 'Guest'}
            </div>
            <div className="text-sm text-asc-muted">
              {session?.user?.email || 'Not signed in'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
