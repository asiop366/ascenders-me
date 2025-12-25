import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const targetUserId = params.id

        if (session.user.id === targetUserId) {
            return new NextResponse('You cannot follow yourself', { status: 400 })
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

            // Delete notification
            await prisma.notification.deleteMany({
                where: {
                    userId: targetUserId,
                    type: 'follow',
                    link: `/app/u/${session.user.username}`,
                }
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

            // Create notification
            await prisma.notification.create({
                data: {
                    userId: targetUserId,
                    type: 'follow',
                    title: 'Nouveau follower',
                    message: `${session.user.displayName || session.user.username} vous suit désormais`,
                    link: `/app/u/${session.user.username}`,
                }
            })

            return NextResponse.json({ following: true })
        }
    } catch (error) {
        console.error('Error in follow/unfollow:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
