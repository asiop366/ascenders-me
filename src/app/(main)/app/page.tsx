'use client'

import { HomeClient } from '@/components/home/home-client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  // Fetch threads with authors and counts
  const threads = await prisma.thread.findMany({
    include: {
      author: true,
      channel: {
        include: { space: true }
      },
      _count: {
        select: { posts: true, reactions: true }
      }
    },
    orderBy: [
      { pinned: 'desc' },
      { createdAt: 'desc' }
    ],
    take: 20,
  })

  // Fetch spaces for topic filter
  const spaces = await prisma.space.findMany({
    include: {
      channels: true,
      _count: { select: { channels: true } }
    },
    orderBy: { position: 'asc' }
  })

  return <HomeClient threads={threads} spaces={spaces} />
}
