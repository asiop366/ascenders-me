import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getTimeAgo } from '@/lib/utils'
import { MessageInput } from '@/components/message-input'

interface PageProps {
  params: {
    username: string
  }
}

export default async function ConversationPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  const otherUser = await prisma.user.findUnique({
    where: { username: params.username },
    include: { grade: true },
  })

  if (!otherUser) {
    notFound()
  }

  // Mark messages as read
  await prisma.message.updateMany({
    where: {
      senderId: otherUser.id,
      receiverId: session.user.id,
      read: false,
    },
    data: { read: true },
  })

  // Get messages
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: session.user.id, receiverId: otherUser.id },
        { senderId: otherUser.id, receiverId: session.user.id },
      ],
    },
    orderBy: { createdAt: 'asc' },
    include: {
      sender: {
        select: { id: true, username: true, image: true },
      },
    },
  })

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      {/* Header */}
      <div className="glass border-b border-white/5 px-8 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/app/messages" className="text-dark-300 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <Link href={`/app/u/${otherUser.username}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-white">
              {otherUser.username[0].toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-white">{otherUser.username}</div>
              {otherUser.grade && (
                <div className="text-xs" style={{ color: otherUser.grade.color }}>
                  {otherUser.grade.name}
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-16 text-dark-400">
              <p>No messages yet. Say hello! 👋</p>
            </div>
          ) : (
            messages.map((message) => {
              const isOwn = message.senderId === session.user.id
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      isOwn
                        ? 'bg-gradient-primary text-white rounded-br-md'
                        : 'bg-dark-800 text-white rounded-bl-md'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <div className={`text-xs mt-1 ${isOwn ? 'text-white/70' : 'text-dark-400'}`}>
                      {getTimeAgo(message.createdAt)}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Input */}
      <div className="glass border-t border-white/5 p-4">
        <div className="max-w-4xl mx-auto">
          <MessageInput receiverId={otherUser.id} />
        </div>
      </div>
    </div>
  )
}
