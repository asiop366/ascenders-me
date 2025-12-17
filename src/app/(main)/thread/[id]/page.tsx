
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const thread = await prisma.thread.findUnique({
    where: { id: params.id },
    include: {
      author: { include: { grade: true } },
      channel: { include: { space: true } },
    },
  })

  if (!thread) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{thread.title}</h1>
        <p className="text-dark-muted">{thread.content}</p>
      </div>
    </div>
  )
}
