'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, MessageSquare, Flag, Clock, CornerDownRight, ChevronDown, ChevronUp, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ReplyComposer } from './reply-composer'

interface Post {
    id: string
    content: string
    createdAt: Date | string
    author: {
        id: string
        username: string
        image: string | null
        role: any
    }
    _count: {
        reactions: number
        replies: number
    }
    replies?: Post[] | null
}

interface ThreadRepliesProps {
    threadId: string
    posts: Post[]
    isLocked: boolean
    isAuthenticated: boolean
}

export function ThreadReplies({ threadId, posts, isLocked, isAuthenticated }: ThreadRepliesProps) {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-asc-text mb-4 flex items-center gap-2">
                <MessageSquare size={20} />
                Replies ({posts.length})
            </h2>

            {posts.length === 0 ? (
                <div className="text-center py-12 bg-asc-surface border border-asc-border rounded-asc">
                    <MessageSquare size={32} className="text-asc-muted mx-auto mb-3" />
                    <p className="text-asc-secondary mb-1">No replies yet</p>
                    <p className="text-sm text-asc-muted">Be the first to share your thoughts!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map((post, index) => (
                        <ReplyCard
                            key={post.id}
                            post={post}
                            index={index + 1}
                            threadId={threadId}
                            isLocked={isLocked}
                            isAuthenticated={isAuthenticated}
                            depth={0}
                        />
                    ))}
                </div>
            )}

            {/* Reply Composer for main thread */}
            {!isLocked && isAuthenticated && (
                <div className="mt-6">
                    <ReplyComposer threadId={threadId} />
                </div>
            )}

            {isLocked && (
                <div className="mt-6 p-4 bg-asc-surface border border-asc-border rounded-asc text-center">
                    <Lock size={20} className="text-asc-muted mx-auto mb-2" />
                    <p className="text-asc-muted">This thread has been locked. No new replies allowed.</p>
                </div>
            )}
        </div>
    )
}

interface ReplyCardProps {
    post: Post
    index: number
    threadId: string
    isLocked: boolean
    isAuthenticated: boolean
    depth: number
}

function ReplyCard({ post, index, threadId, isLocked, isAuthenticated, depth }: ReplyCardProps) {
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [showReplies, setShowReplies] = useState(true)
    const timeAgo = getTimeAgo(new Date(post.createdAt))
    const hasReplies = post.replies && post.replies.length > 0
    const maxDepth = 3

    return (
        <div className={depth > 0 ? 'ml-6 pl-4 border-l-2 border-asc-border/50' : ''}>
            <article className="bg-asc-surface border border-asc-border rounded-asc">
                {/* Reply Header */}
                <div className="flex items-center justify-between p-4 border-b border-asc-border">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-semibold text-sm overflow-hidden">
                            {post.author.image ? (
                                <img src={post.author.image} alt={post.author.username} className="w-full h-full object-cover" />
                            ) : (
                                post.author.username[0].toUpperCase()
                            )}
                        </div>
                        <div>
                            <Link
                                href={`/app/u/${post.author.username}`}
                                className="font-medium text-asc-text hover:underline text-sm"
                            >
                                {post.author.username}
                            </Link>
                            <div className="flex items-center gap-2 ml-2">
                                {post.author.role === 'OWNER' && (
                                    <Badge size="sm" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40">
                                        Owner
                                    </Badge>
                                )}
                                {post.author.role === 'ADMIN' && (
                                    <Badge size="sm" className="bg-red-500/20 text-red-400 border-red-500/40">
                                        Admin
                                    </Badge>
                                )}
                                <span className="text-xs text-asc-muted">
                                    {timeAgo}
                                </span>
                            </div>
                        </div>
                    </div>
                    {depth === 0 && <span className="text-xs text-asc-muted">#{index}</span>}
                </div>

                {/* Reply Content */}
                <div className="p-4">
                    <p className="text-asc-secondary text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                </div>

                {/* Reply Footer */}
                <div className="flex items-center gap-4 px-4 pb-3">
                    <button className="flex items-center gap-1 text-xs text-asc-muted hover:text-asc-text transition-colors">
                        <Heart size={14} />
                        <span>{post._count.reactions}</span>
                    </button>

                    {/* Reply button - only show if not locked and authenticated and not too deep */}
                    {!isLocked && isAuthenticated && depth < maxDepth && (
                        <button
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            className="flex items-center gap-1 text-xs text-asc-muted hover:text-primary transition-colors"
                        >
                            <CornerDownRight size={14} />
                            <span>Reply</span>
                        </button>
                    )}

                    {/* Show/hide replies toggle */}
                    {hasReplies && (
                        <button
                            onClick={() => setShowReplies(!showReplies)}
                            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors ml-auto"
                        >
                            {showReplies ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            <span>{post._count.replies} {post._count.replies === 1 ? 'reply' : 'replies'}</span>
                        </button>
                    )}

                    <button className="text-xs text-asc-muted hover:text-red-400 transition-colors ml-auto">
                        Report
                    </button>
                </div>
            </article>

            {/* Inline reply composer */}
            {showReplyForm && (
                <div className="mt-3">
                    <ReplyComposer
                        threadId={threadId}
                        parentId={post.id}
                        parentAuthor={post.author.username}
                        onCancel={() => setShowReplyForm(false)}
                        isNested
                    />
                </div>
            )}

            {/* Nested replies */}
            {hasReplies && showReplies && (
                <div className="mt-3 space-y-3">
                    {post.replies!.map((reply, idx) => (
                        <ReplyCard
                            key={reply.id}
                            post={reply}
                            index={idx + 1}
                            threadId={threadId}
                            isLocked={isLocked}
                            isAuthenticated={isAuthenticated}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

function getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
