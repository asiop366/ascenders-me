import Link from 'next/link'
import { Plus, MessageSquare, ThumbsUp, Clock, Pin } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getTimeAgo } from '@/lib/utils'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

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
    <div className="min-h-screen bg-dark-950 flex flex-col">
      {/* Premium Header */}
      <div className="glass border-b border-white/5 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">
            WELCOME TO ASCENDERS
          </h1>
          
          <Link
            href="/app/new-thread"
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            CREATE NEW THREAD
          </Link>
        </div>
      </div>

      {/* Main Content - Thread Feed */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {threads.length === 0 ? (
            <div className="text-center py-32">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-dark-800 mb-6">
                <MessageSquare className="text-dark-300" size={32} />
              </div>
              <p className="text-xl text-dark-200 mb-2">No threads yet</p>
              <p className="text-dark-300">Be the first to start a discussion!</p>
            </div>
          ) : (
            <div className="space-y-4">
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
                    className="block gradient-border p-6 group"
                  >
                    <div className="flex gap-5">
                      {/* Author Avatar with Gradient Border */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-xl text-white shadow-glow">
                            {authorInitial}
                          </div>
                          <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
                        </div>
                      </div>

                      {/* Thread Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <div className="flex items-start gap-3 mb-2">
                          {item.pinned && (
                            <Pin size={18} className="text-yellow-500 flex-shrink-0 mt-1" />
                          )}
                          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-dark-200 flex-wrap mb-4">
                          <span className="flex items-center gap-2">
                            <span className="font-semibold text-dark-100">
                              {authorName}
                            </span>
                            {gradeName && gradeColor && (
                              <span 
                                className="px-2 py-0.5 rounded-full text-xs font-medium"
                                style={{ 
                                  background: `linear-gradient(135deg, ${gradeColor}20, ${gradeColor}10)`,
                                  color: gradeColor,
                                  border: `1px solid ${gradeColor}40`
                                }}
                              >
                                {gradeName}
                              </span>
                            )}
                          </span>
                          
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} className="text-dark-300" />
                            {getTimeAgo(item.createdAt)}
                          </span>

                          <span className="text-dark-300">
                            in <span className="text-primary">{spaceName}</span> / {channelName}
                          </span>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm text-dark-300">
                          <span className="flex items-center gap-2 hover:text-primary transition-colors">
                            <MessageSquare size={16} />
                            <span className="font-medium">{item._count.posts}</span> replies
                          </span>
                          <span className="flex items-center gap-2 hover:text-secondary transition-colors">
                            <ThumbsUp size={16} />
                            <span className="font-medium">{item._count.reactions}</span> reactions
                          </span>
                          <span className="hover:text-accent transition-colors">
                            <span className="font-medium">{item.viewCount}</span> views
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

      {/* Premium User Profile Card - Centered at Bottom */}
      <div className="py-8 flex items-center justify-center">
        <div className="glass rounded-2xl px-8 py-5 flex items-center gap-5 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-2xl text-white shadow-glow">
              {session?.user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-30 blur-xl" />
          </div>
          <div>
            <div className="font-bold text-white text-lg mb-0.5">
              {session?.user?.username || 'Guest'}
            </div>
            <div className="text-sm text-dark-200">
              {session?.user?.email || 'Not signed in'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
