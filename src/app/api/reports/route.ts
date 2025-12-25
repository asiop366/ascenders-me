import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createReportSchema = z.object({
    threadId: z.string().optional(),
    postId: z.string().optional(),
    reason: z.string().min(1).max(1000),
})

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json(
                { error: 'You must be logged in to report content' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const validated = createReportSchema.parse(body)

        if (!validated.threadId && !validated.postId) {
            return NextResponse.json(
                { error: 'Must specify either threadId or postId' },
                { status: 400 }
            )
        }

        // Check for duplicate report
        const existingReport = await prisma.report.findFirst({
            where: {
                userId: session.user.id,
                OR: [
                    { threadId: validated.threadId },
                    { postId: validated.postId },
                ],
                status: 'PENDING',
            },
        })

        if (existingReport) {
            return NextResponse.json(
                { error: 'You have already reported this content' },
                { status: 400 }
            )
        }

        const report = await prisma.report.create({
            data: {
                userId: session.user.id,
                threadId: validated.threadId || null,
                postId: validated.postId || null,
                reason: validated.reason,
                status: 'PENDING',
            },
        })

        return NextResponse.json({ success: true, id: report.id })
    } catch (error: any) {
        console.error('Error creating report:', error)

        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Invalid input' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to submit report' },
            { status: 500 }
        )
    }
}

// GET reports (admin only)
export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status') || 'PENDING'

        const reports = await prisma.report.findMany({
            where: {
                status: status as any
            },
            include: {
                user: {
                    select: { id: true, username: true, image: true }
                },
                thread: {
                    select: { id: true, title: true }
                },
                post: {
                    select: { id: true, content: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 50,
        })

        return NextResponse.json(reports)
    } catch (error) {
        console.error('Error fetching reports:', error)
        return NextResponse.json(
            { error: 'Failed to fetch reports' },
            { status: 500 }
        )
    }
}
