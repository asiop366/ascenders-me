'use client'

import { useState } from 'react'
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
                router.push('/app')
                router.refresh()
            } else {
                alert('Failed to delete thread')
            }
        } catch (error) {
            console.error('Delete thread error:', error)
            alert('An error occurred while deleting the thread')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
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
    )
}
