import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { canModerate } from '@/lib/permissions'

export async function DELETE(
    request: NextRequest,
    { params }: { params: { threadId: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { threadId } = params

        // Fetch the thread to check ownership
        const thread = await prisma.thread.findUnique({
            where: { id: threadId },
            select: { authorId: true }
        })

        if (!thread) {
            return NextResponse.json({ error: 'Thread not found' }, { status: 404 })
        }

        // Permission check: Author OR Moderator/Admin/Owner
        const isAuthor = thread.authorId === session.user.id
        const hasModPower = canModerate(session.user.role)

        if (!isAuthor && !hasModPower) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // Perform deletions (some might be handled by Cascade if configured, 
        // but in SQLite/Schema we usually have onDelete: Cascade)
        await prisma.thread.delete({
            where: { id: threadId }
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Delete thread error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
