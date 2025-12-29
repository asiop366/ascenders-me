import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
    request: Request,
    { params }: { params: { threadId: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true }
        })

        if (!user || !['MODERATOR', 'ADMIN', 'OWNER'].includes(user.role)) {
            // Check if they are the author
            const thread = await prisma.thread.findUnique({
                where: { id: params.threadId },
                select: { authorId: true }
            })

            if (!thread || thread.authorId !== session.user.id) {
                return new NextResponse('Forbidden', { status: 403 })
            }
        }

        await prisma.thread.delete({
            where: { id: params.threadId }
        })

        return new NextResponse('Deleted', { status: 200 })
    } catch (error) {
        console.error('Error deleting thread:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
