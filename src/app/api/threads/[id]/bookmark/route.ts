import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const threadId = params.id

        // Check if already bookmarked
        const existingBookmark = await prisma.bookmark.findUnique({
            where: {
                userId_threadId: {
                    userId: session.user.id,
                    threadId,
                },
            },
        })

        if (existingBookmark) {
            // Remove bookmark
            await prisma.bookmark.delete({
                where: {
                    userId_threadId: {
                        userId: session.user.id,
                        threadId,
                    },
                },
            })
            return NextResponse.json({ bookmarked: false })
        } else {
            // Add bookmark
            await prisma.bookmark.create({
                data: {
                    userId: session.user.id,
                    threadId,
                },
            })
            return NextResponse.json({ bookmarked: true })
        }
    } catch (error) {
        console.error('Bookmark error:', error)
        return NextResponse.json({ error: 'Failed to toggle bookmark' }, { status: 500 })
    }
}
