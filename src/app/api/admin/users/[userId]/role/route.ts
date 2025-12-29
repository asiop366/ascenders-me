import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const currentUser = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true }
        })

        if (!currentUser || currentUser.role !== 'OWNER') {
            return new NextResponse('Forbidden', { status: 403 })
        }

        const { role } = await request.json()

        if (!['USER', 'MODERATOR', 'ADMIN'].includes(role)) {
            return new NextResponse('Invalid Role', { status: 400 })
        }

        const targetUser = await prisma.user.findUnique({
            where: { id: params.userId },
            select: { role: true }
        })

        if (!targetUser) {
            return new NextResponse('User not found', { status: 404 })
        }

        if (targetUser.role === 'OWNER') {
            return new NextResponse('Cannot demote OWNER', { status: 403 })
        }

        const updatedUser = await prisma.user.update({
            where: { id: params.userId },
            data: { role }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error('Error in user promotion:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
