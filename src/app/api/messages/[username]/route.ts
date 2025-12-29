import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
    req: NextRequest,
    { params }: { params: { username: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Find the other user
        const otherUser = await prisma.user.findUnique({
            where: { username: params.username },
            select: { id: true, username: true, image: true },
        })

        if (!otherUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Get conversation messages
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: session.user.id, receiverId: otherUser.id },
                    { senderId: otherUser.id, receiverId: session.user.id },
                ],
            },
            include: {
                sender: {
                    select: { id: true, username: true, image: true },
                },
                receiver: {
                    select: { id: true, username: true, image: true },
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        })

        // Mark messages as read
        await prisma.message.updateMany({
            where: {
                senderId: otherUser.id,
                receiverId: session.user.id,
                read: false,
            },
            data: {
                read: true,
            },
        })

        return NextResponse.json({ messages, otherUser })
    } catch (error) {
        console.error('Get messages error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { username: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { content } = await req.json()

        if (!content || content.trim().length === 0) {
            return NextResponse.json({ error: 'Message content is required' }, { status: 400 })
        }

        // Find the receiver
        const receiver = await prisma.user.findUnique({
            where: { username: params.username },
        })

        if (!receiver) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        if (receiver.id === session.user.id) {
            return NextResponse.json({ error: 'You cannot message yourself' }, { status: 400 })
        }

        const message = await prisma.message.create({
            data: {
                senderId: session.user.id,
                receiverId: receiver.id,
                content: content.trim(),
            },
            include: {
                sender: {
                    select: { id: true, username: true, image: true },
                },
                receiver: {
                    select: { id: true, username: true, image: true },
                },
            },
        })

        return NextResponse.json(message, { status: 201 })
    } catch (error) {
        console.error('Send message error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
