import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { threadId, postId, type = 'like' } = await req.json()

    if (!threadId && !postId) {
      return NextResponse.json(
        { error: 'Thread ID or Post ID required' },
        { status: 400 }
      )
    }

    // Check if reaction exists
    const existing = await prisma.reaction.findFirst({
      where: {
        userId: session.user.id,
        threadId: threadId || null,
        postId: postId || null,
        type,
      },
    })

    if (existing) {
      // Remove reaction
      await prisma.reaction.delete({
        where: { id: existing.id },
      })
      return NextResponse.json({ action: 'removed' })
    } else {
      // Add reaction
      const reaction = await prisma.reaction.create({
        data: {
          userId: session.user.id,
          threadId: threadId || null,
          postId: postId || null,
          type,
        },
      })
      return NextResponse.json({ action: 'added', reaction })
    }
  } catch (error) {
    console.error('Reaction error:', error)
    return NextResponse.json({ error: 'Failed to process reaction' }, { status: 500 })
  }
}

