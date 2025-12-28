'use client'

import { useState } from 'react'
import { Share2, Trash2, MoreHorizontal, Flag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { canModerate } from '@/lib/permissions'

interface ThreadActionsProps {
    threadId: string
    threadTitle: string
    authorId: string
    currentUserId?: string
    currentUserRole?: string
}

export function ThreadActions({
    threadId,
    threadTitle,
    authorId,
    currentUserId,
    currentUserRole
}: ThreadActionsProps) {
    const router = useRouter()
    const [showMenu, setShowMenu] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const isAuthor = currentUserId === authorId
    const hasModPower = canModerate(currentUserRole)

    const handleShare = async () => {
        const url = `${window.location.origin}/app/thread/${threadId}`
        if (navigator.share) {
            try {
                await navigator.share({
                    title: threadTitle,
                    url: url
                })
            } catch (err) {
                console.error('Error sharing:', err)
            }
        } else {
            await navigator.clipboard.writeText(url)
            alert('Link copied to clipboard!')
        }
        setShowMenu(false)
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this thread? This action cannot be undone.')) {
            return
        }

        setIsDeleting(true)
        try {
            const res = await fetch(`/api/threads/${threadId}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                router.push('/app')
                router.refresh()
            } else {
                const data = await res.json()
                alert(data.error || 'Failed to delete thread')
            }
        } catch (err) {
            alert('An error occurred while deleting the thread')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="relative">
            <div className="flex items-center gap-2">
                <button
                    onClick={handleShare}
                    className="p-2 text-dark-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    title="Share"
                >
                    <Share2 size={18} />
                </button>

                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 text-dark-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    title="More options"
                >
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {showMenu && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-dark-900 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden py-1">
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-dark-200 hover:bg-white/5 hover:text-white transition-colors"
                        >
                            <Share2 size={16} />
                            Share Link
                        </button>

                        {(isAuthor || hasModPower) && (
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                            >
                                <Trash2 size={16} />
                                {isDeleting ? 'Deleting...' : 'Delete Thread'}
                            </button>
                        )}

                        <button
                            onClick={() => {
                                alert('Reported!')
                                setShowMenu(false)
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-dark-400 hover:bg-white/5 transition-colors"
                        >
                            <Flag size={16} />
                            Report
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
