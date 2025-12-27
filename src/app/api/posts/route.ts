import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const threadId = searchParams.get('threadId')

    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID required' }, { status: 400 })
    }

    // Only fetch top-level posts (no parent)
    const posts = await prisma.post.findMany({
      where: {
        threadId,
        parentId: null
      },
      include: {
        author: {
          select: { id: true, username: true, image: true, role: true }
        },
        _count: {
          select: { reactions: true, replies: true }
        },
        replies: {
          include: {
            author: {
              select: { id: true, username: true, image: true, role: true }
            },
            _count: {
              select: { reactions: true, replies: true }
            },
            replies: {
              include: {
                author: {
                  select: { id: true, username: true, image: true, role: true }
                },
                _count: {
                  select: { reactions: true, replies: true }
                }
              },
              orderBy: { createdAt: 'asc' }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { threadId, content, parentId } = body

    if (!threadId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify thread exists and is not locked
    const thread = await prisma.thread.findUnique({
      where: { id: threadId }
    })

    if (!thread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 })
    }

    if (thread.locked) {
      return NextResponse.json({ error: 'Thread is locked' }, { status: 403 })
    }

    // If parentId is provided, verify parent post exists
    if (parentId) {
      const parentPost = await prisma.post.findUnique({
        where: { id: parentId }
      })
      if (!parentPost) {
        return NextResponse.json({ error: 'Parent post not found' }, { status: 404 })
      }
    }

    const post = await prisma.post.create({
      data: {
        threadId,
        authorId: session.user.id,
        content: content.trim(),
        parentId: parentId || null,
      },
      include: {
        author: {
          select: { id: true, username: true, image: true }
        }
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

