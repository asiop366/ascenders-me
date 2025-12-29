import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
    request: NextRequest,
    { params }: { params: { threadId: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { threadId } = params

        // Check if already bookmarked
        const existing = await prisma.bookmark.findUnique({
            where: {
                userId_threadId: {
                    userId: session.user.id,
                    threadId: threadId,
                },
            },
        })

        if (existing) {
            // Remove bookmark
            await prisma.bookmark.delete({
                where: {
                    id: existing.id,
                },
            })
            return NextResponse.json({ bookmarked: false })
        } else {
            // Add bookmark
            await prisma.bookmark.create({
                data: {
                    userId: session.user.id,
                    threadId: threadId,
                },
            })
            return NextResponse.json({ bookmarked: true })
        }
    } catch (error: any) {
        console.error('Bookmark error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
