'use client'

import { useState } from 'react'
import { Share2, Trash2, MoreHorizontal, Flag, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dropdown, DropdownItem } from '@/components/ui/dropdown'
import { canModerate } from '@/lib/permissions'
import { toast } from '@/components/ui/toast'

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
            toast.success('Link copied to clipboard!')
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this thread? This action cannot be undone.')) {
            return
        }

        setIsDeleting(true)
        try {
            const res = await fetch(`/api/threads/${threadId}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                toast.success('Thread deleted successfully')
                router.push('/app')
                router.refresh()
            } else {
                const data = await res.json()
                toast.error(data.error || 'Failed to delete thread')
            }
        } catch (err) {
            console.error('Delete error:', err)
            toast.error('An error occurred while deleting the thread')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleShare}
                className="p-2 text-dark-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                title="Share"
            >
                <Share2 size={18} />
            </button>

            <Dropdown
                trigger={
                    <button className="p-2 text-dark-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="More options" disabled={isDeleting}>
                        {isDeleting ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <MoreHorizontal size={18} />
                        )}
                    </button>
                }
            >
                <DropdownItem onClick={handleShare}>
                    <Share2 size={14} className="mr-2" /> Share Link
                </DropdownItem>

                {(isAuthor || hasModPower) && (
                    <DropdownItem onClick={handleDelete} danger>
                        <Trash2 size={14} className="mr-2" />
                        {isDeleting ? 'Deleting...' : 'Delete Thread'}
                    </DropdownItem>
                )}

                <DropdownItem onClick={() => {
                    toast.info('Feature coming soon!')
                }}>
                    <Flag size={14} className="mr-2" /> Report
                </DropdownItem>
            </Dropdown>
        </div>
    )
}
