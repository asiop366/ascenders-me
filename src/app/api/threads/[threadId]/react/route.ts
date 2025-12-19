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
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { threadId } = params
    const { type = 'like' } = await req.json()

    // Vérifier si déjà liké
    const existingReaction = await prisma.reaction.findFirst({
      where: {
        userId: session.user.id,
        threadId,
        type,
      },
    })

    if (existingReaction) {
      // Unlike - supprimer la reaction
      await prisma.reaction.delete({
        where: { id: existingReaction.id },
      })

      return NextResponse.json({ liked: false })
    } else {
      // Like - créer la reaction
      await prisma.reaction.create({
        data: {
          userId: session.user.id,
          threadId,
          type,
        },
      })

      return NextResponse.json({ liked: true })
    }
  } catch (error: any) {
    console.error('Reaction error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
