import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { canModerate } from '@/lib/permissions'

export async function DELETE(
    request: NextRequest,
    { params }: { params: { postId: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { postId } = params

        // Fetch the post to check ownership
        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { authorId: true }
        })

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }

        // Permission check: Author OR Moderator/Admin/Owner
        const isAuthor = post.authorId === session.user.id
        const hasModPower = canModerate(session.user.role)

        if (!isAuthor && !hasModPower) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        await prisma.post.delete({
            where: { id: postId }
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Delete post error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
