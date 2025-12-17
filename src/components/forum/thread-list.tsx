'use client'

import { ThreadCard } from './thread-card'
import { ThreadListSkeleton } from '@/components/ui/skeleton'

interface Thread {
  id: string
  title: string
  content: string
  pinned: boolean
  locked: boolean
  viewCount: number
  createdAt: Date | string
  author: {
    id: string
    username: string
    image: string | null
    grade?: { name: string; color: string } | null
  }
  channel: {
    name: string
    slug: string
    space: { name: string; slug: string }
  }
  _count: {
    posts: number
    reactions: number
  }
}

interface ThreadListProps {
  threads: Thread[]
  isLoading?: boolean
  emptyMessage?: string
}

export function ThreadList({ 
  threads, 
  isLoading = false, 
  emptyMessage = 'No threads yet' 
}: ThreadListProps) {
  if (isLoading) {
    return <ThreadListSkeleton count={5} />
  }

  if (threads.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-asc-muted">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  )
}

