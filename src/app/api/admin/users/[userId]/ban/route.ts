import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id || (session.user.role !== 'ADMIN' && session.user.role !== 'OWNER')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { userId } = params
        const { banned, reason } = await request.json()

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                isBanned: banned,
                banReason: banned ? reason : null
            }
        })

        return NextResponse.json({ success: true, user })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
