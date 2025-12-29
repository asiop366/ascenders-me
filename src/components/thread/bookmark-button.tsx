'use client'

import { useState } from 'react'
import { Bookmark } from 'lucide-react'
import { toast } from '@/components/ui/toast'

interface BookmarkButtonProps {
    threadId: string
    initialBookmarked?: boolean
}

export function BookmarkButton({ threadId, initialBookmarked = false }: BookmarkButtonProps) {
    const [bookmarked, setBookmarked] = useState(initialBookmarked)
    const [isLoading, setIsLoading] = useState(false)

    const toggleBookmark = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        setIsLoading(true)
        try {
            const res = await fetch(`/api/threads/${threadId}/bookmark`, {
                method: 'POST',
            })

            if (res.ok) {
                const data = await res.json()
                setBookmarked(data.bookmarked)
                toast.success(data.bookmarked ? 'Thread bookmarked' : 'Bookmark removed')
            } else {
                throw new Error('Failed to toggle bookmark')
            }
        } catch (error) {
            toast.error('Failed to bookmark thread')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={toggleBookmark}
            disabled={isLoading}
            className={`p-2 rounded-lg transition-all ${bookmarked
                    ? 'bg-primary/20 text-primary hover:bg-primary/30'
                    : 'bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark thread'}
        >
            <Bookmark size={18} className={bookmarked ? 'fill-current' : ''} />
        </button>
    )
}
