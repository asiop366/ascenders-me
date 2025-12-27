'use client'

import Link from 'next/link'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getTimeAgo } from '@/lib/utils'
import { Heart, MoreHorizontal, Flag, Edit, Trash2, User } from 'lucide-react'
import { Dropdown, DropdownItem } from '@/components/ui/dropdown'
import { ReportModal } from '../report-modal'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'

interface PostCardProps {
  post: {
    id: string
    content: string
    createdAt: Date | string
    author: {
      id: string
      username: string
      image: string | null
      role?: string
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
  const router = useRouter()
  const isAuthor = currentUserId === post.author.id
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <article className="glass rounded-xl p-6 hover:border-primary/30 transition-all">
      <div className="flex items-start gap-4">
        <Link href={`/app/u/${post.author.username}`}>
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-white shadow-glow hover:scale-110 transition-transform">
            {post.author.username[0].toUpperCase()}
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Link
                href={`/app/u/${post.author.username}`}
                className="font-bold text-white hover:text-primary transition-colors"
              >
                {post.author.username}
              </Link>
              {post.author.grade && (
                <Badge
                  size="sm"
                  style={{
                    backgroundColor: post.author.grade.color + '20',
                    color: post.author.grade.color,
                    border: `1px solid ${post.author.grade.color}40`
                  }}
                >
                  {post.author.grade.name}
                </Badge>
              )}
              {post.author.role === 'OWNER' && (
                <Badge size="sm" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                  Owner
                </Badge>
              )}
              {post.author.role === 'ADMIN' && (
                <Badge size="sm" className="bg-red-500/20 text-red-400 border-red-500/40">
                  Admin
                </Badge>
              )}
              <span className="text-sm text-dark-300">
                {getTimeAgo(new Date(post.createdAt))}
              </span>
            </div>

            <Dropdown
              trigger={
                <button className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
                  <MoreHorizontal size={16} className="text-dark-300" />
                </button>
              }
            >
              {isAuthor && (
                <>
                  <DropdownItem onClick={() => { }}>
                    <Edit size={14} className="mr-2" /> {t('forum.edit')}
                  </DropdownItem>
                  <DropdownItem onClick={() => onDelete?.(post.id)} danger>
                    <Trash2 size={14} className="mr-2" /> {t('forum.delete')}
                  </DropdownItem>
                </>
              )}
              <DropdownItem onClick={() => {
                if (!currentUserId) {
                  router.push('/login')
                  return
                }
                setIsReportModalOpen(true)
              }}>
                <Flag size={14} className="mr-2" /> {t('forum.report')}
              </DropdownItem>
            </Dropdown>
          </div>

          {/* Content */}
          <p className="text-dark-100 whitespace-pre-wrap leading-relaxed mb-4">
            {post.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm text-dark-300 hover:text-red-400 transition-colors">
              <Heart size={16} />
              <span>{post._count.reactions}</span>
            </button>
          </div>
        </div>
      </div>
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        postId={post.id}
        contentType="post"
      />
    </article>
  )
}
