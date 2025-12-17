import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Hash, Plus, Pin, Lock, Clock, MessageSquare, Eye, Heart } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ChannelPage({
  params,
}: {
  params: { spaceSlug: string; channelSlug: string }
}) {
  const session = await getServerSession(authOptions)

  const space = await prisma.space.findUnique({
    where: { slug: params.spaceSlug },
    include: {
      channels: {
        orderBy: { position: 'asc' },
      },
    },
  })

  if (!space) {
    notFound()
  }

  const channel = space.channels.find((c) => c.slug === params.channelSlug)

  if (!channel) {
    notFound()
  }

  const threads = await prisma.thread.findMany({
    where: { channelId: channel.id },
    include: {
      author: true,
      _count: {
        select: { posts: true, reactions: true },
      },
    },
    orderBy: [
      { pinned: 'desc' },
      { createdAt: 'desc' },
    ],
    take: 50,
  })

  return (
    <div className="h-full flex flex-col bg-asc-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-asc-bg border-b border-asc-border">
        <div className="px-6 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-asc-muted mb-3">
            <Link href="/app" className="hover:text-asc-text transition-colors">Home</Link>
            <span>/</span>
            <Link href="/app/topics" className="hover:text-asc-text transition-colors">Topics</Link>
            <span>/</span>
            <Link href={`/app/topics/${space.slug}`} className="hover:text-asc-text transition-colors">{space.name}</Link>
            <span>/</span>
            <span className="text-asc-secondary">{channel.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash size={24} className="text-asc-muted" />
              <h1 className="text-2xl font-bold text-asc-text">{channel.name}</h1>
            </div>
            <Link href="/app/new" className="btn-primary flex items-center gap-2">
              <Plus size={18} />
              New Thread
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {threads.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-asc-surface border border-asc-border rounded-full flex items-center justify-center mx-auto mb-4">
                <Hash size={32} className="text-asc-muted" />
              </div>
              <h2 className="text-xl font-semibold text-asc-text mb-2">No threads yet</h2>
              <p className="text-asc-secondary mb-6">Be the first to start a discussion in #{channel.name}!</p>
              <Link href="/app/new" className="btn-primary inline-flex items-center gap-2">
                <Plus size={18} />
                Create Thread
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {threads.map((thread) => (
                <Link
                  key={thread.id}
                  href={`/app/thread/${thread.id}`}
                  className="card block group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                      {thread.author.username[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {thread.pinned && (
                          <span className="badge badge-pinned flex items-center gap-1">
                            <Pin size={10} />
                            PINNED
                          </span>
                        )}
                        {thread.locked && (
                          <span className="badge badge-locked flex items-center gap-1">
                            <Lock size={10} />
                            LOCKED
                          </span>
                        )}
                        <h3 className="font-semibold text-asc-text group-hover:underline line-clamp-1">
                          {thread.title}
                        </h3>
                      </div>
                      <p className="text-sm text-asc-secondary line-clamp-2 mb-2">
                        {thread.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-asc-muted">
                        <span>by {thread.author.username}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(thread.createdAt).toLocaleDateString()}
                        </span>
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
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
