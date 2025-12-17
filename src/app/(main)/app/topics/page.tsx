import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { 
  Folder, 
  MessageSquare, 
  Users, 
  Clock,
  ChevronRight,
  Plus,
  Search
} from 'lucide-react'

export default async function TopicsPage() {
  const session = await getServerSession(authOptions)

  const spaces = await prisma.space.findMany({
    include: {
      channels: {
        include: {
          _count: {
            select: { threads: true }
          }
        },
        orderBy: { position: 'asc' }
      },
      _count: {
        select: { channels: true }
      }
    },
    orderBy: { position: 'asc' }
  })

  const isAdmin = session?.user?.role === 'ADMIN'
  const isMod = session?.user?.role === 'MODERATOR' || isAdmin

  return (
    <div className="h-full overflow-y-auto bg-asc-bg">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-asc-text flex items-center gap-2">
              <Folder size={24} />
              Topics
            </h1>
            <p className="text-asc-muted mt-1">
              Browse all discussion topics and channels
            </p>
          </div>
          
          {isMod && (
            <Link href="/app/admin/topics/new" className="btn-primary flex items-center gap-2">
              <Plus size={18} />
              New Topic
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-asc-muted" />
          <input
            type="text"
            placeholder="Search topics..."
            className="input pl-11"
          />
        </div>

        {/* Topics List */}
        {spaces.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-asc-surface border border-asc-border rounded-full flex items-center justify-center mx-auto mb-4">
              <Folder size={32} className="text-asc-muted" />
            </div>
            <h2 className="text-lg font-semibold text-asc-text mb-2">No topics yet</h2>
            <p className="text-asc-muted mb-4">Topics will appear here once created by administrators.</p>
            {isAdmin && (
              <Link href="/app/admin/topics/new" className="btn-primary inline-flex items-center gap-2">
                <Plus size={18} />
                Create first topic
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {spaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SpaceCard({ space }: { space: any }) {
  const totalThreads = space.channels.reduce(
    (acc: number, ch: any) => acc + ch._count.threads, 
    0
  )

  return (
    <div className="bg-asc-surface border border-asc-border rounded-asc-lg overflow-hidden">
      {/* Space Header */}
      <div className="p-4 border-b border-asc-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-asc-surface2 border border-asc-border rounded-asc flex items-center justify-center">
              <Folder size={20} className="text-asc-muted" />
            </div>
            <div>
              <h2 className="font-semibold text-asc-text">{space.name}</h2>
              <p className="text-sm text-asc-muted">
                {space._count.channels} channels  {totalThreads} threads
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Channels */}
      <div className="divide-y divide-asc-border">
        {space.channels.map((channel: any) => (
          <Link
            key={channel.id}
            href={`/app/${space.slug}/${channel.slug}`}
            className="flex items-center justify-between p-4 hover:bg-asc-hover transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-asc-muted">#</span>
              <div>
                <h3 className="font-medium text-asc-text group-hover:underline">
                  {channel.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-asc-muted mt-1">
                  <span className="flex items-center gap-1">
                    <MessageSquare size={12} />
                    {channel._count.threads} threads
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight size={18} className="text-asc-muted group-hover:text-asc-text transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}
