import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
    request: Request,
    { params }: { params: { postId: string } }
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
            const post = await prisma.post.findUnique({
                where: { id: params.postId },
                select: { authorId: true }
            })

            if (!post || post.authorId !== session.user.id) {
                return new NextResponse('Forbidden', { status: 403 })
            }
        }

        await prisma.post.delete({
            where: { id: params.postId }
        })

        return new NextResponse('Deleted', { status: 200 })
    } catch (error) {
        console.error('Error deleting post:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
