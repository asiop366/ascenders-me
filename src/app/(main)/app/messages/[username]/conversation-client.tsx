'use client'

import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Loader2 } from 'lucide-react'
import { getTimeAgo } from '@/lib/utils'

interface Message {
    id: string
    content: string
    createdAt: Date
    read: boolean
    sender: {
        id: string
        username: string
        image: string | null
    }
    receiver: {
        id: string
        username: string
        image: string | null
    }
}

interface OtherUser {
    id: string
    username: string
    image: string | null
}

export default function ConversationClientPage() {
    const params = useParams()
    const router = useRouter()
    const { data: session } = useSession()
    const username = params.username as string

    const [messages, setMessages] = useState<Message[]>([])
    const [otherUser, setOtherUser] = useState<OtherUser | null>(null)
    const [newMessage, setNewMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSending, setIsSending] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const lastPollRef = useRef<number>(Date.now())

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    // Load initial messages
    useEffect(() => {
        const loadMessages = async () => {
            try {
                const res = await fetch(`/api/messages/${username}`)
                if (res.ok) {
                    const data = await res.json()
                    setMessages(data.messages)
                    setOtherUser(data.otherUser)
                } else {
                    router.push('/app/messages')
                }
            } catch (error) {
                console.error('Failed to load messages:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadMessages()
    }, [username, router])

    // Polling for new messages
    useEffect(() => {
        if (!session?.user) return

        const pollInterval = setInterval(async () => {
            try {
                const res = await fetch(`/api/messages/poll?since=${lastPollRef.current}`)
                if (res.ok) {
                    const data = await res.json()
                    if (data.messages && data.messages.length > 0) {
                        // Filter messages for this conversation
                        const conversationMessages = data.messages.filter((msg: Message) =>
                            (msg.sender.username === username || msg.receiver.username === username)
                        )

                        if (conversationMessages.length > 0) {
                            setMessages(prev => {
                                const newMsgs = conversationMessages.filter((newMsg: Message) =>
                                    !prev.some(existingMsg => existingMsg.id === newMsg.id)
                                )
                                return [...prev, ...newMsgs].sort((a, b) =>
                                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                                )
                            })
                            scrollToBottom()
                        }
                    }
                    lastPollRef.current = data.timestamp
                }
            } catch (error) {
                console.error('Polling error:', error)
            }
        }, 3000) // Poll every 3 seconds

        return () => clearInterval(pollInterval)
    }, [session, username])

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || isSending) return

        setIsSending(true)
        const messageContent = newMessage.trim()
        setNewMessage('')

        try {
            const res = await fetch(`/api/messages/${username}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: messageContent }),
            })

            if (res.ok) {
                const message = await res.json()
                setMessages(prev => [...prev, message])
                scrollToBottom()
            } else {
                setNewMessage(messageContent)
            }
        } catch (error) {
            console.error('Failed to send message:', error)
            setNewMessage(messageContent)
        } finally {
            setIsSending(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark-950 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-dark-950">
            {/* Header */}
            <div className="glass border-b border-white/5 px-6 py-4 flex items-center gap-4">
                <Link href="/app/messages" className="text-dark-300 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                {otherUser && (
                    <>
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-white">
                            {otherUser.username[0].toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">{otherUser.username}</h1>
                        </div>
                    </>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center py-16 text-dark-400">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    messages.map((message) => {
                        const isOwn = message.sender.id === session?.user?.id
                        return (
                            <div
                                key={message.id}
                                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
                                    <div
                                        className={`rounded-2xl px-4 py-3 ${isOwn
                                                ? 'bg-gradient-primary text-white rounded-br-none'
                                                : 'bg-dark-800 text-white rounded-bl-none'
                                            }`}
                                    >
                                        <p className="break-words">{message.content}</p>
                                    </div>
                                    <p className={`text-xs text-dark-400 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                                        {getTimeAgo(message.createdAt)}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="glass border-t border-white/5 p-4">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={`Message ${otherUser?.username}...`}
                        className="flex-1 bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={isSending}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || isSending}
                        className="btn-primary px-6 flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    </button>
                </div>
            </form>
        </div>
    )
}
