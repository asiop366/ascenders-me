import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const channelId = searchParams.get('channelId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const cursor = searchParams.get('cursor')

    const threads = await prisma.thread.findMany({
      where: channelId ? { channelId } : undefined,
      include: {
        author: {
          select: { id: true, username: true, image: true, role: true }
        },
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
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
    })

    return NextResponse.json(threads)
  } catch (error) {
    console.error('Error fetching threads:', error)
    return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { channelId, title, content, tags } = body

    if (!channelId || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify channel exists
    const channel = await prisma.channel.findUnique({
      where: { id: channelId }
    })

    if (!channel) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 })
    }

    const thread = await prisma.thread.create({
      data: {
        channelId,
        authorId: session.user.id,
        title: title.trim(),
        content: content.trim(),
      },
      include: {
        author: {
          select: { id: true, username: true, image: true }
        },
        channel: true,
      }
    })

    return NextResponse.json(thread, { status: 201 })
  } catch (error) {
    console.error('Error creating thread:', error)
    return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 })
  }
}
