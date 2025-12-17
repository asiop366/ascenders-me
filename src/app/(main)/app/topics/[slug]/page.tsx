import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Folder, Hash, MessageSquare, ChevronRight, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function TopicDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const session = await getServerSession(authOptions)

  const space = await prisma.space.findUnique({
    where: { slug: params.slug },
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
    }
  })

  if (!space) {
    notFound()
  }

  const totalThreads = space.channels.reduce((acc, ch) => acc + ch._count.threads, 0)

  return (
    <div className="h-full overflow-y-auto bg-asc-bg">
      <div className="max-w-4xl mx-auto p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-asc-muted mb-6">
          <Link href="/app" className="hover:text-asc-text transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/app/topics" className="hover:text-asc-text transition-colors">Topics</Link>
          <ChevronRight size={14} />
          <span className="text-asc-secondary">{space.name}</span>
        </div>

        {/* Header */}
        <div className="bg-asc-surface border border-asc-border rounded-asc-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-asc-bg border border-asc-border rounded-asc flex items-center justify-center flex-shrink-0">
              <Folder size={32} className="text-asc-text" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-asc-text mb-2">{space.name}</h1>
              <p className="text-asc-secondary mb-4">
                Explore discussions and connect with the community
              </p>
              <div className="flex items-center gap-6 text-sm text-asc-muted">
                <span className="flex items-center gap-1">
                  <Hash size={14} />
                  {space._count.channels} channels
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare size={14} />
                  {totalThreads} threads
                </span>
              </div>
            </div>
            <Link href="/app/new" className="btn-primary flex items-center gap-2">
              <Plus size={18} />
              New Thread
            </Link>
          </div>
        </div>

        {/* Channels List */}
        <div>
          <h2 className="text-lg font-semibold text-asc-text mb-4">Channels</h2>
          {space.channels.length === 0 ? (
            <div className="text-center py-12 bg-asc-surface border border-asc-border rounded-asc">
              <Hash size={32} className="text-asc-muted mx-auto mb-3" />
              <p className="text-asc-secondary">No channels yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {space.channels.map((channel) => (
                <Link
                  key={channel.id}
                  href={`/app/${space.slug}/${channel.slug}`}
                  className="card flex items-center justify-between group hover:border-asc-text"
                >
                  <div className="flex items-center gap-3">
                    <Hash size={20} className="text-asc-muted" />
                    <div>
                      <h3 className="font-semibold text-asc-text group-hover:underline">
                        {channel.name}
                      </h3>
                      <p className="text-sm text-asc-muted">
                        {channel._count.threads} threads
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-asc-muted group-hover:text-asc-text transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Rules Section (optionnel) */}
        <div className="mt-8 bg-asc-surface border border-asc-border rounded-asc-lg p-6">
          <h2 className="text-lg font-semibold text-asc-text mb-4">Community Guidelines</h2>
          <ul className="space-y-2 text-asc-secondary text-sm">
            <li className="flex items-start gap-2">
              <span className="text-asc-text">•</span>
              <span>Be respectful and constructive in your discussions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-asc-text">•</span>
              <span>Search before posting to avoid duplicates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-asc-text">•</span>
              <span>Stay on topic and use appropriate channels</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-asc-text">•</span>
              <span>No spam, self-promotion, or inappropriate content</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
