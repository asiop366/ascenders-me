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
    thread.authorId === session.user.

