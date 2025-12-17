import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { postSchema } from '@/lib/validations'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = postSchema.parse(body)

    // Check if thread exists and is not locked
    const thread = await prisma.thread.findUnique({
      where: { id: validated.threadId },
    })

    if (!thread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 })
    }

    if (thread.locked) {
      return NextResponse.json({ error: 'Thread is locked' }, { status: 403 })
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        content: validated.content,
        threadId: validated.threadId,
        authorId: session.user.id,
      },
      include: {
        author: {
          include: { grade: true },
        },
      },
    })

    // Update thread's updatedAt
    await prisma.thread.update({
      where: { id: validated.threadId },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error: any) {
    console.error('Create post error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create post' },
      { status: 500 }
    )
  }
}

