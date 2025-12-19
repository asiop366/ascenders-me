import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, content, channelId } = body

    if (!title || !content || !channelId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Trouver le channel par slug ou créer un channel par défaut
    let channel = await prisma.channel.findFirst({
      where: {
        slug: channelId,
      },
    })

    // Si pas de channel trouvé, utiliser le premier disponible
    if (!channel) {
      channel = await prisma.channel.findFirst()
    }

    if (!channel) {
      return NextResponse.json({ error: 'No channel found' }, { status: 400 })
    }

    const thread = await prisma.thread.create({
      data: {
        title,
        content,
        channelId: channel.id,
        authorId: session.user.id,
      },
    })

    return NextResponse.json(thread, { status: 201 })
  } catch (error) {
    console.error('Create thread error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
