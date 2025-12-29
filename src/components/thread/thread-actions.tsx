'use client'

import { useState } from 'react'
<<<<<<< HEAD
import { useRouter } from 'next/navigation'
import { MoreHorizontal, Trash2, Loader2 } from 'lucide-react'
import { Dropdown, DropdownItem } from '@/components/ui/dropdown'

interface ThreadActionsProps {
    threadId: string
    canDelete: boolean
}

export function ThreadActions({ threadId, canDelete }: ThreadActionsProps) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

=======
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

>>>>>>> 95514d72df2b70d50a6dc5e0eeef5d759b59b2c6
    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this thread? This action cannot be undone.')) {
            return
        }

        setIsDeleting(true)
        try {
            const res = await fetch(`/api/threads/${threadId}`, {
<<<<<<< HEAD
                method: 'DELETE',
=======
                method: 'DELETE'
>>>>>>> 95514d72df2b70d50a6dc5e0eeef5d759b59b2c6
            })

            if (res.ok) {
                router.push('/app')
                router.refresh()
            } else {
<<<<<<< HEAD
                alert('Failed to delete thread')
            }
        } catch (error) {
            console.error('Delete thread error:', error)
=======
                const data = await res.json()
                alert(data.error || 'Failed to delete thread')
            }
        } catch (err) {
>>>>>>> 95514d72df2b70d50a6dc5e0eeef5d759b59b2c6
            alert('An error occurred while deleting the thread')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
<<<<<<< HEAD
        <Dropdown
            trigger={
                <button className="btn-ghost p-2" title="More" disabled={isDeleting}>
                    {isDeleting ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <MoreHorizontal size={18} />
                    )}
                </button>
            }
        >
            {canDelete && (
                <DropdownItem onClick={handleDelete} danger>
                    <Trash2 size={14} className="mr-2" /> Delete Thread
                </DropdownItem>
            )}
            <DropdownItem onClick={() => { }}>
                Report
            </DropdownItem>
        </Dropdown>
=======
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
>>>>>>> 95514d72df2b70d50a6dc5e0eeef5d759b59b2c6
    )
}
