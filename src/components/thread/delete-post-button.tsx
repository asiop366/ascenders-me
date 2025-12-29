'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'

interface DeletePostButtonProps {
    postId: string
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this post?')) {
            return
        }

        setIsDeleting(true)
        try {
            const res = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                router.refresh()
            } else {
                alert('Failed to delete post')
            }
        } catch (error) {
            console.error('Delete post error:', error)
            alert('An error occurred while deleting the post')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-xs text-asc-muted hover:text-red-400 transition-colors flex items-center gap-1"
        >
            {isDeleting ? (
                <Loader2 size={12} className="animate-spin" />
            ) : (
                <Trash2 size={12} />
            )}
            Delete
        </button>
    )
}
