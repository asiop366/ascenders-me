import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createThreadSchema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(10).max(10000),
  topicId: z.string().optional(),
  imageUrl: z.string().url().optional(),
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validated = createThreadSchema.parse(body)

    const thread = await prisma.thread.create({
      data: {
        title: validated.title,
        content: validated.content,
        topicId: validated.topicId || null,
        imageUrl: validated.imageUrl || null,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: { id: true, username: true, displayName: true, image: true }
        },
        topic: true,
      }
    })

    return NextResponse.json(thread)
  } catch (error: any) {
    console.error('Error creating thread:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create thread' },
      { status: 500 }
    )
  }
}
