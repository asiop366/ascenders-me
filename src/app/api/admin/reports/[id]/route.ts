import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { canAdmin } from '@/lib/permissions'

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user || !canAdmin(session.user.role as any)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        const { status } = await req.json()

        if (!['PENDING', 'REVIEWED', 'RESOLVED', 'DISMISSED'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
        }

        const report = await prisma.report.update({
            where: { id: params.id },
            data: { status },
        })

        return NextResponse.json({ success: true, report })
    } catch (error) {
        console.error('Error updating report:', error)
        return NextResponse.json({ error: 'Failed to update report' }, { status: 500 })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user || !canAdmin(session.user.role as any)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        const report = await prisma.report.findUnique({
            where: { id: params.id },
            select: { threadId: true, postId: true },
        })

        if (!report) {
            return NextResponse.json({ error: 'Report not found' }, { status: 404 })
        }

        // Delete the reported content
        if (report.threadId) {
            await prisma.thread.delete({ where: { id: report.threadId } })
        } else if (report.postId) {
            await prisma.post.delete({ where: { id: report.postId } })
        }

        // Mark report as resolved
        await prisma.report.update({
            where: { id: params.id },
            data: { status: 'RESOLVED' },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting content:', error)
        return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 })
    }
}
