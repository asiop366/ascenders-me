import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const since = searchParams.get('since')
        const sinceDate = since ? new Date(parseInt(since)) : new Date(Date.now() - 5000)

        // Get new messages since last poll
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: session.user.id },
                    { receiverId: session.user.id },
                ],
                createdAt: {
                    gt: sinceDate,
                },
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
                createdAt: 'desc',
            },
        })

        return NextResponse.json({ messages, timestamp: Date.now() })
    } catch (error) {
        console.error('Poll error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
