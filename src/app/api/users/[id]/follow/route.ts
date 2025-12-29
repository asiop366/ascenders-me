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

        const targetUserId = params.id

        if (targetUserId === session.user.id) {
            return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 })
        }

        // Check if already following
        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: session.user.id,
                    followingId: targetUserId,
                },
            },
        })

        if (existingFollow) {
            // Unfollow
            await prisma.follow.delete({
                where: {
                    followerId_followingId: {
                        followerId: session.user.id,
                        followingId: targetUserId,
                    },
                },
            })
            return NextResponse.json({ following: false })
        } else {
            // Follow
            await prisma.follow.create({
                data: {
                    followerId: session.user.id,
                    followingId: targetUserId,
                },
            })
            return NextResponse.json({ following: true })
        }
    } catch (error) {
        console.error('Follow error:', error)
        return NextResponse.json({ error: 'Failed to toggle follow' }, { status: 500 })
    }
}
