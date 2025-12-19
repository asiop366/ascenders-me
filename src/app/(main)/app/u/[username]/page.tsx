import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Link2, Shield, MessageSquare, UserPlus, UserCheck, Award, Mail } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

interface PageProps {
  params: {
    username: string
  }
}

export default async function UserProfilePage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      grade: true,
      threads: {
        take: 10,
        orderBy: { createdAt: 'desc' },
      },
      badges: {
        include: {
          badge: true,
        },
      },
      followers: {
        include: {
          follower: {
            select: { id: true, username: true, image: true },
          },
        },
      },
      following: {
        include: {
          following: {
            select: { id: true, username: true, image: true },
          },
        },
      },
      _count: {
        select: {
          threads: true,
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  })

  if (!user) {
    notFound()
  }

  const isOwnProfile = session?.user?.id === user.id

  // Check if current user follows this profile
  const isFollowing = session?.user?.id
    ? await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: session.user.id,
            followingId: user.id,
          },
        },
      })
    : null

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="glass border-b border-white/5 px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/app" className="text-dark-300 hover:text-white transition-colors text-sm">
            ← Back to feed
          </Link>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header Card */}
          <div className="glass rounded-2xl p-8 mb-6">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-5xl text-white shadow-glow">
                  {user.username[0].toUpperCase()}
                </div>
                {user.grade && (
                  <div
                    className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${user.grade.color}20, ${user.grade.color}10)`,
                      color: user.grade.color,
                      border: `2px solid ${user.grade.color}`,
                    }}
                  >
                    {user.grade.name}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-display font-bold text-white mb-2">
                      {user.username}
                    </h1>
                    <p className="text-dark-200">@{user.username}</p>
                  </div>

                  {/* Actions */}
                  {!isOwnProfile && session?.user && (
                    <div className="flex items-center gap-3">
                      <form action="/api/follow" method="POST">
                        <input type="hidden" name="userId" value={user.id} />
                        <button
                          type="submit"
                          className={`btn-${isFollowing ? 'secondary' : 'primary'} flex items-center gap-2`}
                        >
                          {isFollowing ? (
                            <>
                              <UserCheck size={18} />
                              Following
                            </>
                          ) : (
                            <>
                              <UserPlus size={18} />
                              Follow
                            </>
                          )}
                        </button>
                      </form>
                      <Link href={`/app/messages/new?to=${user.username}`} className="btn-secondary flex items-center gap-2">
                        <MessageSquare size={18} />
                        Message
                      </Link>
                    </div>
                  )}
                </div>

                {/* Bio */}
                {user.bio ? (
                  <p className="text-dark-100 mb-4 leading-relaxed">{user.bio}</p>
                ) : (
                  <p className="text-dark-400 italic mb-4">No bio provided</p>
                )}

                {/* Badges */}
                {user.badges.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    {user.badges.map((userBadge) => (
                      <div
                        key={userBadge.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                        style={{
                          background: `${userBadge.badge.color}20`,
                          border: `1px solid ${userBadge.badge.color}40`,
                        }}
                        title={userBadge.badge.description || userBadge.badge.name}
                      >
                        <Award size={14} style={{ color: userBadge.badge.color }} />
                        <span className="text-xs font-semibold" style={{ color: userBadge.badge.color }}>
                          {userBadge.badge.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-sm text-dark-300 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Joined {formatDate(user.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{user._count.threads}</div>
                <div className="text-sm text-dark-300">Threads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{user._count.posts}</div>
                <div className="text-sm text-dark-300">Replies</div>
              </div>
              <Link href={`/app/u/${user.username}/followers`} className="text-center hover:bg-white/5 rounded-lg p-2 transition-colors">
                <div className="text-3xl font-bold text-white mb-1">{user._count.followers}</div>
                <div className="text-sm text-dark-300">Followers</div>
              </Link>
              <Link href={`/app/u/${user.username}/following`} className="text-center hover:bg-white/5 rounded-lg p-2 transition-colors">
                <div className="text-3xl font-bold text-white mb-1">{user._count.following}</div>
                <div className="text-sm text-dark-300">Following</div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            
            {user.threads.length > 0 ? (
              <div className="space-y-4">
                {user.threads.map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/app/thread/${thread.id}`}
                    className="block p-4 rounded-xl bg-dark-800 hover:bg-dark-700 transition-all"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{thread.title}</h3>
                    <p className="text-dark-300 text-sm line-clamp-2">{thread.content}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-dark-400">
                      <span>{formatDate(thread.createdAt)}</span>
                      <span>•</span>
                      <span>{thread.viewCount} views</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-dark-400">
                <MessageSquare size={48} className="mx-auto mb-3 opacity-50" />
                <p>No recent activity to display</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
