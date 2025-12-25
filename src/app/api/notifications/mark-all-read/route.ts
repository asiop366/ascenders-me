import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        await prisma.notification.updateMany({
            where: {
                userId: session.user.id,
                read: false,
            },
            data: {
                read: true,
            },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error marking notifications as read:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
