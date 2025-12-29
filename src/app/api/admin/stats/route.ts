import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { canAdmin } from '@/lib/permissions'

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user || !canAdmin(session.user.role as any)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // Get various statistics
        const [
            totalUsers,
            verifiedUsers,
            totalThreads,
            totalPosts,
            totalMessages,
            recentUsers,
            userGrowth,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { emailVerified: { not: null } } }),
            prisma.thread.count(),
            prisma.post.count(),
            prisma.message.count(),

            // Users created in last 7 days
            prisma.user.count({
                where: {
                    createdAt: {
                        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    },
                },
            }),

            // User growth by day (last 30 days)
            prisma.$queryRaw`
        SELECT 
          DATE_TRUNC('day', "createdAt") as date,
          COUNT(*)::int as count
        FROM "User"
        WHERE "createdAt" >= NOW() - INTERVAL '30 days'
        GROUP BY DATE_TRUNC('day', "createdAt")
        ORDER BY date DESC
      `,
        ])

        return NextResponse.json({
            totalUsers,
            verifiedUsers,
            unverifiedUsers: totalUsers - verifiedUsers,
            totalThreads,
            totalPosts,
            totalMessages,
            recentUsers,
            userGrowth,
        })
    } catch (error) {
        console.error('Stats error:', error)
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }
}
