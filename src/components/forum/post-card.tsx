'use client'

import Link from 'next/link'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getTimeAgo } from '@/lib/utils'
import { Heart, MoreHorizontal, Flag, Edit, Trash2 } from 'lucide-react'
import { Dropdown, DropdownItem } from '@/components/ui/dropdown'

interface PostCardProps {
  post: {
    id: string
    content: string
    createdAt: Date | string
    author: {
      id: string
      username: string
      image: string | null
      grade?: { name: string; color: string } | null
    }
    _count: {
      reactions: number
    }
  }
  currentUserId?: string
  onDelete?: (postId: string) => void
}

export function PostCard({ post, currentUserId, onDelete }: PostCardProps) {
  const isAuthor = currentUserId === post.author.id

  return (
    <article className="bg-asc-surface border border-asc-border rounded-asc p-4">
      <div className="flex items-start gap-3">
        <Link href={`/app/u/${post.author.username}`}>
          <Avatar src={post.author.image} alt={post.author.username} />
        </Link>
        
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Link 
                href={`/app/u/${post.author.username}`}
                className="font-medium text-asc-text hover:underline"
              >
                {post.author.username}
              </Link>
              {post.author.grade && (
                <Badge 
                  size="sm"
                  style={{ 
                    backgroundColor: post.author.grade.color + '20', 
                    color: post.author.grade.color 
                  }}
                >
                  {post.author.grade.name}
                </Badge>
              )}
              <span className="text-sm text-asc-muted">
                {getTimeAgo(new Date(post.createdAt))}
              </span>
            </div>

            <Dropdown
              trigger={
                <button className="p-1 hover:bg-asc-hover rounded transition-colors">
                  <MoreHorizontal size={16} className="text-asc-muted" />
                </button>
              }
            >
              {isAuthor && (
                <>
                  <DropdownItem onClick={() => {}}>
                    <Edit size={14} className="mr-2" /> Edit
                  </DropdownItem>
                  <DropdownItem onClick={() => onDelete?.(post.id)} danger>
                    <Trash2 size={14} className="mr-2" /> Delete
                  </DropdownItem>
                </>
              )}
              <DropdownItem onClick={() => {}}>
                <Flag size={14} className="mr-2" /> Report
              </DropdownItem>
            </Dropdown>
          </div>

          {/* Content */}
          <p className="text-asc-secondary whitespace-pre-wrap">{post.content}</p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center gap-1 text-sm text-asc-muted hover:text-asc-text transition-colors">
              <Heart size={14} />
              <span>{post._count.reactions}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

