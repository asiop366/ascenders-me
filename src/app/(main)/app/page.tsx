import { Plus } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ThreadCard } from '@/components/thread-card'

export const dynamic = 'force-dynamic'

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
    <div className="min-h-screen bg-dark-950">
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

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          {threads.length === 0 ? (
            <div className="text-center py-32">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-dark-800 mb-6">
                <Plus className="text-dark-300" size={32} />
              </div>
              <p className="text-xl text-dark-200 mb-2">No threads yet</p>
              <p className="text-dark-300 mb-6">Be the first to start a discussion!</p>
              <Link href="/app/new-thread" className="btn-primary">
                Create Thread
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {threads.map((thread) => (
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
