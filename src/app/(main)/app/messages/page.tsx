import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Mail, Search, Edit } from 'lucide-react'
import { getTimeAgo } from '@/lib/utils'

export default async function MessagesPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  // Get conversations (grouped messages)
  const conversations = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: session.user.id },
        { receiverId: session.user.id },
      ],
    },
    include: {
      sender: {
        select: { id: true, username: true, image: true },
      },
      receiver: {
        select: { id: true, username: true, image: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Group by conversation partner
  const conversationMap = new Map()
  conversations.forEach((msg) => {
    const partnerId = msg.senderId === session.user.id ? msg.receiverId : msg.senderId
    const partner = msg.senderId === session.user.id ? msg.receiver : msg.sender
    
    if (!conversationMap.has(partnerId)) {
      conversationMap.set(partnerId, {
        partner,
        lastMessage: msg,
        unreadCount: msg.receiverId === session.user.id && !msg.read ? 1 : 0,
      })
    } else if (msg.receiverId === session.user.id && !msg.read) {
      conversationMap.get(partnerId).unreadCount++
    }
  })

  const uniqueConversations = Array.from(conversationMap.values())

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="glass border-b border-white/5 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-white">Messages</h1>
          <Link href="/app/messages/new" className="btn-primary flex items-center gap-2">
            <Edit size={18} />
            New Message
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <div className="relative mb-6">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Conversations List */}
          {uniqueConversations.length > 0 ? (
            <div className="space-y-2">
              {uniqueConversations.map((conv) => (
                <Link
                  key={conv.partner.id}
                  href={`/app/messages/${conv.partner.username}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-dark-800 hover:bg-dark-700 transition-all"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-xl text-white">
                      {conv.partner.username[0].toUpperCase()}
                    </div>
                    {conv.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {conv.unreadCount}
                      </div>
                    )}
                  </div>

                  {/* Message Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white">{conv.partner.username}</span>
                      <span className="text-xs text-dark-400">
                        {getTimeAgo(conv.lastMessage.createdAt)}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'text-white font-medium' : 'text-dark-300'}`}>
                      {conv.lastMessage.senderId === session.user.id && (
                        <span className="text-dark-400">You: </span>
                      )}
                      {conv.lastMessage.content}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Mail size={64} className="mx-auto mb-4 text-dark-600" />
              <h2 className="text-2xl font-bold text-white mb-2">No messages yet</h2>
              <p className="text-dark-400 mb-6">Start a conversation with someone!</p>
              <Link href="/app/messages/new" className="btn-primary">
                Send your first message
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
