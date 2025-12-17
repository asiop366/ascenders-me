'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { canModerate } from '@/lib/permissions'

export async function deleteThread(threadId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
  })

  if (!thread) {
    throw new Error('Thread not found')
  }

  const canDelete =
    thread.authorId === session.user.id || canModerate(session.user.role as any)

  if (!canDelete) {
    throw new Error('Forbidden')
  }

  await prisma.thread.delete({
    where: { id: threadId },
  })

  revalidatePath('/app')
  return { success: true }
}

export async function toggleThreadLock(threadId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !canModerate(session.user.role as any)) {
    throw new Error('Forbidden')
  }

  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
  })

  if (!thread) {
    throw new Error('Thread not found')
  }

  const updated = await prisma.thread.update({
    where: { id: threadId },
    data: { locked: !thread.locked },
  })

  revalidatePath(`/thread/${threadId}`)
  return { success: true, locked: updated.locked }
}

export async function toggleThreadPin(threadId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !canModerate(session.user.role as any)) {
    throw new Error('Forbidden')
  }

  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
  })

  if (!thread) {
    throw new Error('Thread not found')
  }

  const updated = await prisma.thread.update({
    where: { id: threadId },
    data: { pinned: !thread.pinned },
  })

  revalidatePath(`/thread/${threadId}`)
  return { success: true, pinned: updated.pinned }
}

export async function incrementThreadView(threadId: string) {
  try {
    await prisma.thread.update({
      where: { id: threadId },
      data: { viewCount: { increment: 1 } },
    })
  } catch (error) {
    console.error('Failed to increment view count:', error)
  }
}
