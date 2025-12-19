import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { title, content, channelId } = await req.json()

    // Validation
    if (!title || !content || !channelId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (title.length < 5 || title.length > 200) {
      return NextResponse.json(
        { error: 'Title must be between 5 and 200 characters' },
        { status: 400 }
      )
    }

    if (content.length < 10) {
      return NextResponse.json(
        { error: 'Content must be at least 10 characters' },
        { status: 400 }
      )
    }

    // Find the channel (by slug or id)
    let channel = await prisma.channel.findFirst({
      where: { 
        OR: [
          { slug: channelId },
          { id: channelId }
        ]
      }
    })

    // If no channel found, try to use the first available channel
    if (!channel) {
      channel = await prisma.channel.findFirst()
    }

    if (!channel) {
      return NextResponse.json(
        { error: 'No channel found' },
        { status: 400 }
      )
    }

    // Create the thread with correct Prisma syntax
    const thread = await prisma.thread.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        authorId: session.user.id,
        channelId: channel.id,
      },
      include: {
        author: {
          include: {
            grade: true,
          },
        },
        channel: {
          include: {
            space: true,
          },
        },
      },
    })

    return NextResponse.json(thread, { status: 201 })
  } catch (error: any) {
    console.error('Create thread error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
