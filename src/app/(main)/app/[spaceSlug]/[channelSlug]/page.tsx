import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function ChannelPage({
  params,
}: {
  params: { spaceSlug: string; channelSlug: string }
}) {
  const space = await prisma.space.findUnique({
    where: { slug: params.spaceSlug },
  })

  if (!space) {
    notFound()
  }

  const channel = await prisma.channel.findFirst({
    where: {
      slug: params.channelSlug,
      spaceId: space.id,
    },
  })

  if (!channel) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">#{channel.name}</h1>
        <p className="text-dark-muted">Channel content coming soon...</p>
      </div>
    </div>
  )
}
