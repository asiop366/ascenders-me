import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { receiverId, recipient, content } = body

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 })
    }

    // Find receiver by ID or username
    let receiver
    if (receiverId) {
      receiver = await prisma.user.findUnique({ where: { id: receiverId } })
    } else if (recipient) {
      receiver = await prisma.user.findUnique({ where: { username: recipient } })
    }

    if (!receiver) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Prevent self-messaging
    if (receiver.id === session.user.id) {
      return NextResponse.json({ error: 'You cannot message yourself' }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        senderId: session.user.id,
        receiverId: receiver.id,
        content: content.trim(),
      },
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('Message error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
