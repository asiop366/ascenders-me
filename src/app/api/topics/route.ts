import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const topics = await prisma.topic.findMany({
            include: {
                _count: {
                    select: { threads: true }
                }
            },
            orderBy: { position: 'asc' }
        })

        return NextResponse.json(topics)
    } catch (error) {
        console.error('Error fetching topics:', error)
        return NextResponse.json(
            { error: 'Failed to fetch topics' },
            { status: 500 }
        )
    }
}
