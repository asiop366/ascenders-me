import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { threadSchema } from '@/lib/validations'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = threadSchema.parse(body)

    // Check channel access
    const channel = await prisma.channel.findUnique({
      where: { id: validated.channelId },
      include: { minGrade: true },
    })

    if (!channel) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 })
    }

    // Create thread
    const thread = await prisma.thread.create({
      data: {
        title: validated.title,
        content: validated.content,
        channelId: validated.channelId,
        authorId: session.user.id,
      },
      include: {
        author: {
          include: { grade: true },
        },
      },
    })

    return NextResponse.json(thread, { status: 201 })
  } catch (error: any) {
    console.error('Create thread error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create thread' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const channelId = searchParams.get('channelId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')

    if (!channelId) {
      return NextResponse.json({ error: 'Channel ID required' }, { status: 400 })
    }

    const threads = await prisma.thread.findMany({
      where: { channelId },
      include: {
        author: {
          include: { grade: true },
        },
        _count: {
          select: { posts: true },
        },
      },
      orderBy: [
        { pinned: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
      skip: (page - 1) * limit,
    })

    const total = await prisma.thread.count({ where: { channelId } })

    return NextResponse.json({
      threads,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get threads error:', error)
    return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 })
  }
}

