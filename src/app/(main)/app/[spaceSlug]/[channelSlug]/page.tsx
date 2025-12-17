import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Hash } from 'lucide-react'

export default async function AppHomePage() {
  const session = await getServerSession(authOptions)

  const spaces = await prisma.space.findMany({
    include: {
      channels: {
        take: 5,
        orderBy: { position: 'asc' },
      },
    },
    orderBy: { position: 'asc' },
  })

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {session?.user?.username}!</h1>
        <p className="text-dark-muted mb-8">Choose a space to get started</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-accent-primary/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                {space.icon ? (
                  <span className="text-3xl">{space.icon}</span>
                ) : (
                  <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                    <Hash className="w-6 h-6 text-accent-primary" />
                  </div>
                )}
                <h2 className="text-xl font-semibold">{space.name}</h2>
              </div>

              <div className="space-y-2">
                {space.channels.map((channel) => (
                  <Link
                    key={channel.id}
                    href={`/app/${space.slug}/${channel.slug}`}
                    className="block px-3 py-2 rounded-lg hover:bg-dark-hover text-dark-muted hover:text-dark-text transition-colors"
                  >
                    <Hash className="w-4 h-4 inline mr-2" />
                    {channel.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {spaces.length === 0 && (
          <div className="text-center py-16">
            <p className="text-dark-muted text-lg">No spaces available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

