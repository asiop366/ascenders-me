import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  Calendar, 
  MessageSquare, 
  Heart, 
  Eye,
  Settings,
  MoreHorizontal,
  Shield,
  Award
} from 'lucide-react'

export default async function UserProfilePage({
  params,
}: {
  params: { username: string }
}) {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      grade: true,
      threads: {
        include: {
          channel: { include: { space: true } },
          _count: { select: { posts: true, reactions: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      posts: {
        include: {
          thread: true,
          _count: { select: { reactions: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      _count: {
        select: { threads: true, posts: true, reactions: true }
      }
    }
  })

  if (!user) {
    notFound()
  }

  const isOwnProfile = session?.user?.username === user.username
  const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="h-full overflow-y-auto bg-asc-bg">
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-asc-surface border border-asc-border rounded-asc-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-bold text-3xl">
                {user.username[0].toUpperCase()}
              </div>
              
              {/* User Info */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-asc-text">{user.username}</h1>
                  {user.role === 'ADMIN' && (
                    <span className="badge badge-pinned flex items-center gap-1">
                      <Shield size={10} />
                      ADMIN
                    </span>
                  )}
                  {user.role === 'MODERATOR' && (
                    <span className="badge flex items-center gap-1">
                      <Shield size={10} />
                      MOD
                    </span>
                  )}
                </div>
                
                {user.grade && (
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={14} className="text-asc-muted" />
                    <span className="text-sm text-asc-secondary">{user.grade.name}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm text-asc-muted">
                  <Calendar size={14} />
                  <span>Joined {joinDate}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {isOwnProfile ? (
              <Link href="/app/settings" className="btn-secondary flex items-center gap-2">
                <Settings size={16} />
                Edit Profile
              </Link>
            ) : (
              <button className="btn-ghost p-2">
                <MoreHorizontal size={18} />
              </button>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-asc-secondary mb-6">{user.bio}</p>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-asc-bg border border-asc-border rounded-asc p-4 text-center">
              <div className="text-2xl font-bold text-asc-text mb-1">{user._count.threads}</div>
              <div className="text-sm text-asc-muted flex items-center justify-center gap-1">
                <MessageSquare size={14} />
                Threads
              </div>
            </div>
            <div className="bg-asc-bg border border-asc-border rounded-asc p-4 text-center">
              <div className="text-2xl font-bold text-asc-text mb-1">{user._count.posts}</div>
              <div className="text-sm text-asc-muted flex items-center justify-center gap-1">
                <MessageSquare size={14} />
                Replies
              </div>
            </div>
            <div className="bg-asc-bg border border-asc-border rounded-asc p-4 text-center">
              <div className="text-2xl font-bold text-asc-text mb-1">{user._count.reactions}</div>
              <div className="text-sm text-asc-muted flex items-center justify-center gap-1">
                <Heart size={14} />
                Reactions
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-asc-border">
          <button className="px-4 py-3 text-sm font-medium text-asc-text border-b-2 border-asc-text">
            Threads ({user._count.threads})
          </button>
          <button className="px-4 py-3 text-sm text-asc-muted hover:text-asc-text transition-colors">
            Replies ({user._count.posts})
          </button>
          {isOwnProfile && (
            <button className="px-4 py-3 text-sm text-asc-muted hover:text-asc-text transition-colors">
              Bookmarks
            </button>
          )}
        </div>

        {/* Threads List */}
        <div className="space-y-3">
          {user.threads.length === 0 ? (
            <div className="text-center py-12 bg-asc-surface border border-asc-border rounded-asc">
              <MessageSquare size={32} className="text-asc-muted mx-auto mb-3" />
              <p className="text-asc-secondary">No threads yet</p>
            </div>
          ) : (
            user.threads.map((thread) => (
              <Link 
                key={thread.id}
                href={`/app/thread/${thread.id}`}
                className="card block"
              >
                <h3 className="font-semibold text-asc-text mb-1 hover:underline">
                  {thread.title}
                </h3>
                <p className="text-sm text-asc-secondary line-clamp-2 mb-2">
                  {thread.content}
                </p>
                <div className="flex items-center gap-4 text-xs text-asc-muted">
                  {thread.channel && (
                    <span className="tag">{thread.channel.name}</span>
                  )}
                  <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={12} />
                    {thread._count.posts}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={12} />
                    {thread._count.reactions}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
