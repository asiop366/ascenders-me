import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const query = searchParams.get('q') || ''

        if (query.length < 2) {
            return NextResponse.json({ threads: [], users: [] })
        }

        // Search threads
        const threads = await prisma.thread.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { content: { contains: query, mode: 'insensitive' } },
                ],
            },
            include: {
                author: {
                    select: { id: true, username: true, image: true },
                },
                topic: {
                    select: { name: true, slug: true, color: true },
                },
                _count: {
                    select: { posts: true, reactions: true },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
        })

        // Search users
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: query, mode: 'insensitive' } },
                    { displayName: { contains: query, mode: 'insensitive' } },
                ],
            },
            include: {
                grade: true,
                _count: {
                    select: { threads: true, posts: true, followers: true },
                },
            },
            take: 10,
        })

        return NextResponse.json({ threads, users })
    } catch (error) {
        console.error('Search error:', error)
        return NextResponse.json({ error: 'Search failed' }, { status: 500 })
    }
}
