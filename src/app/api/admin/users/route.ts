import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { canAdmin } from '@/lib/permissions'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !canAdmin(session.user.role as any)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const users = await prisma.user.findMany({
      include: { grade: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !canAdmin(session.user.role as any)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { userId, gradeId, role } = await req.json()

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(gradeId !== undefined && { gradeId }),
        ...(role !== undefined && { role }),
      },
      include: { grade: true },
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

