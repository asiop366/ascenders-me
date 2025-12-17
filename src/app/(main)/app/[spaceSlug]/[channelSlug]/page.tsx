import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Hash, Plus, Pin, Clock } from 'lucide-react'

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
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-60 bg-[#0a0a0a] border-r border-[#2a2a2a] flex flex-col">
        <div className="h-12 px-4 flex items-center border-b border-[#2a2a2a] font-bold">
          {space.name}
        </div>
        
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-2 mb-1 text-xs font-semibold text-gray-400 uppercase">
            Channels
          </div>
          {space.channels.map((ch) => (
            <Link
              key={ch.id}
              href={`/app/${space.slug}/${ch.slug}`}
              className={`flex items-center gap-2 px-2 py-1.5 mx-2 rounded text-sm transition-colors ${
                ch.id === channel.id
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <Hash size={16} />
              <span>{ch.name}</span>
            </Link>
          ))}
        </div>

        <div className="h-14 px-2 flex items-center border-t border-[#2a2a2a] bg-[#0a0a0a]">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
              {session?.user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{session?.user?.username || 'User'}</div>
              <div className="text-xs text-gray-400">Online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <Hash size={20} className="text-gray-400" />
            <h1 className="font-semibold">{channel.name}</h1>
          </div>
          <Link
            href={`/app/${space.slug}/${channel.slug}/new`}
            className="px-4 py-1.5 bg-white text-black rounded text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            New Thread
          </Link>
        </div>

        {/* Threads List */}
        <div className="flex-1 overflow-y-auto">
          {threads.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <Hash size={48} className="text-gray-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No threads yet</h2>
              <p className="text-gray-400 mb-4">Be the first to start a discussion!</p>
              <Link
                href={`/app/${space.slug}/${channel.slug}/new`}
                className="px-6 py-2 bg-white text-black rounded font-medium hover:bg-gray-200 transition-colors"
              >
                Create Thread
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {threads.map((thread) => (
                <Link
                  key={thread.id}
                  href={`/app/${space.slug}/${channel.slug}/${thread.id}`}
                  className="block p-4 bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-[#2a2a2a] rounded transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {thread.pinned && <Pin size={14} className="text-gray-400" />}
                        <h3 className="font-semibold truncate">{thread.title}</h3>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-2">{thread.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(thread.createdAt).toLocaleDateString()}
                        </span>
                        <span>by {thread.author.username}</span>
                        <span>{thread._count.posts} replies</span>
                        <span>{thread._count.reactions} reactions</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {thread.author.username[0].toUpperCase()}
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
