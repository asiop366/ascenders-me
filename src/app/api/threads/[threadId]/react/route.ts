import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { threadId } = params

    // Check if already reacted
    const existingReaction = await prisma.reaction.findFirst({
      where: {
        threadId,
        userId: session.user.id,
        type: 'like',
      },
    })

    if (existingReaction) {
      // Remove reaction
      await prisma.reaction.delete({
        where: { id: existingReaction.id },
      })

      return NextResponse.json({ liked: false })
    } else {
      // Add reaction
      await prisma.reaction.create({
        data: {
          threadId,
          userId: session.user.id,
          type: 'like',
        },
      })

      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    console.error('React error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
