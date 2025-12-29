'use client'

import { useState } from 'react'
import { UserPlus, UserMinus, Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/toast'

interface FollowButtonProps {
    userId: string
    initialFollowing?: boolean
    size?: 'sm' | 'md' | 'lg'
}

export function FollowButton({ userId, initialFollowing = false, size = 'md' }: FollowButtonProps) {
    const [following, setFollowing] = useState(initialFollowing)
    const [isLoading, setIsLoading] = useState(false)

    const toggleFollow = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`/api/users/${userId}/follow`, {
                method: 'POST',
            })

            if (res.ok) {
                const data = await res.json()
                setFollowing(data.following)
                toast.success(data.following ? 'Now following' : 'Unfollowed')
            } else {
                throw new Error('Failed to toggle follow')
            }
        } catch (error) {
            toast.error('Failed to update follow status')
        } finally {
            setIsLoading(false)
        }
    }

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    }

    return (
        <button
            onClick={toggleFollow}
            disabled={isLoading}
            className={`rounded-xl font-medium transition-all flex items-center gap-2 ${following
                    ? 'bg-dark-700 text-white hover:bg-dark-600'
                    : 'bg-primary text-white hover:shadow-glow'
                } ${sizeClasses[size]} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {isLoading ? (
                <>
                    <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
                    {size !== 'sm' && 'Loading...'}
                </>
            ) : following ? (
                <>
                    <UserMinus size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
                    {size !== 'sm' && 'Unfollow'}
                </>
            ) : (
                <>
                    <UserPlus size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
                    {size !== 'sm' && 'Follow'}
                </>
            )}
        </button>
    )
}
