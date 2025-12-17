'use client'

import Link from 'next/link'
import { 
  Search, 
  Plus, 
  Pin, 
  Lock, 
  MessageSquare, 
  Eye, 
  Heart,
  MoreHorizontal,
  Filter,
  Clock,
  TrendingUp,
  HelpCircle
} from 'lucide-react'

export function HomeClient({ threads, spaces }: { threads: any[]; spaces: any[] }) {
  return (
    <div className="h-full flex flex-col bg-asc-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-asc-bg/95 backdrop-blur border-b border-asc-border">
        <div className="px-6 py-4">
          {/* Top row: Search + Create */}
          <div className="flex items-center gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-asc-muted" />
              <input
                type="text"
                placeholder="Search threads, topics, @users..."
                className="input pl-11"
              />
            </div>
            
            {/* Create Thread Button */}
            <Link href="/app/new" className="btn-primary flex items-center gap-2 whitespace-nowrap">
              <Plus size={18} />
              <span>Create new thread</span>
            </Link>
          </div>

          {/* Filters row */}
          <div className="flex items-center justify-between gap-4">
            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <button className="btn-secondary flex items-center gap-2 text-sm">
                <Filter size={16} />
                <span>Topic</span>
              </button>
              <button className="btn-secondary flex items-center gap-2 text-sm">
                <span>Tags</span>
              </button>
              <button className="btn-secondary flex items-center gap-2 text-sm">
                <span>Date</span>
              </button>
            </div>

            {/* Sort tabs */}
            <div className="flex items-center bg-asc-surface border border-asc-border rounded-asc">
              <button className="px-4 py-2 text-sm font-medium text-asc-text bg-asc-surface2 rounded-l-asc flex items-center gap-2">
                <Clock size={14} />
                Latest
              </button>
              <button className="px-4 py-2 text-sm text-asc-muted hover:text-asc-text transition-colors flex items-center gap-2">
                <TrendingUp size={14} />
                Top
              </button>
              <button className="px-4 py-2 text-sm text-asc-muted hover:text-asc-text transition-colors flex items-center gap-2">
                Trending
              </button>
              <button className="px-4 py-2 text-sm text-asc-muted hover:text-asc-text rounded-r-asc transition-colors flex items-center gap-2">
                <HelpCircle size={14} />
                Unanswered
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {threads.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-asc-surface border border-asc-border rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={32} className="text-asc-muted" />
              </div>
              <h2 className="text-xl font-semibold text-asc-text mb-2">No threads yet</h2>
              <p className="text-asc-secondary mb-6">Be the first to start a discussion!</p>
              <Link href="/app/new" className="btn-primary inline-flex items-center gap-2">
                <Plus size={18} />
                Create the first thread
              </Link>
            </div>
          ) : (
            /* Thread List */
            <div className="space-y-3">
              {threads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ThreadCard({ thread }: { thread: any }) {
  const timeAgo = getTimeAgo(new Date(thread.createdAt))

  return (
    <article className="card group">
      <div className="flex gap-4">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-semibold text-sm">
            {thread.author.username[0].toUpperCase()}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              {thread.pinned && (
                <span className="badge badge-pinned flex items-center gap-1">
                  <Pin size={10} />
                  PINNED
                </span>
              )}
              {thread.locked && (
                <span className="badge badge-locked flex items-center gap-1">
                  <Lock size={10} />
                  LOCKED
                </span>
              )}
              <Link 
                href={`/app/thread/${thread.id}`}
                className="text-base font-semibold text-asc-text hover:underline line-clamp-1"
              >
                {thread.title}
              </Link>
            </div>

            {/* More menu */}
            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-asc-hover rounded transition-all">
              <MoreHorizontal size={16} className="text-asc-muted" />
            </button>
          </div>

          {/* Excerpt */}
          <p className="text-sm text-asc-secondary line-clamp-2 mb-3">
            {thread.content}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-asc-muted">
            {/* Topic/Channel */}
            {thread.channel && (
              <Link 
                href={`/app/topics/${thread.channel.space?.slug}`}
                className="tag"
              >
                {thread.channel.name}
              </Link>
            )}

            {/* Author & Time */}
            <span>
              by <Link href={`/app/u/${thread.author.username}`} className="text-asc-secondary hover:text-asc-text">
                {thread.author.username}
              </Link>
            </span>
            <span>{timeAgo}</span>

            {/* Stats */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="flex items-center gap-1">
                <MessageSquare size={12} />
                {thread._count.posts}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={12} />
                {thread.viewCount}
              </span>
              <span className="flex items-center gap-1">
                <Heart size={12} />
                {thread._count.reactions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
