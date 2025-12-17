'use client'

import { useState } from 'react'
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
  HelpCircle,
  Share2,
  Bookmark as BookmarkIcon,
  Flag
} from 'lucide-react'

type SortType = 'latest' | 'top' | 'trending' | 'unanswered'

export function HomeClient({ threads, spaces }: { threads: any[]; spaces: any[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortType>('latest')
  const [showTopicFilter, setShowTopicFilter] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState<string | null>(null)

  // Filter and sort threads
  const filteredThreads = threads
    .filter(thread => {
      // Search filter
      if (searchQuery && !thread.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      // Topic filter
      if (selectedTopic !== 'all' && thread.channel?.space?.slug !== selectedTopic) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'top':
          return (b._count.reactions + b._count.posts) - (a._count.reactions + a._count.posts)
        case 'trending':
          return b.viewCount - a.viewCount
        case 'unanswered':
          return a._count.posts - b._count.posts
        default:
          return 0
      }
    })

  const handleBookmark = (threadId: string) => {
    console.log('Bookmark thread:', threadId)
    // TODO: Implement bookmark API call
  }

  const handleShare = (threadId: string) => {
    const url = `${window.location.origin}/app/thread/${threadId}`
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
  }

  const handleReport = (threadId: string) => {
    if (confirm('Report this thread?')) {
      console.log('Report thread:', threadId)
      // TODO: Implement report API call
    }
  }

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              {/* Topic Filter */}
              <div className="relative">
                <button 
                  onClick={() => setShowTopicFilter(!showTopicFilter)}
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <Filter size={16} />
                  <span>{selectedTopic === 'all' ? 'All Topics' : spaces.find(s => s.slug === selectedTopic)?.name || 'Topic'}</span>
                </button>
                
                {showTopicFilter && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowTopicFilter(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-48 bg-asc-surface border border-asc-border rounded-asc shadow-lg z-20 py-1">
                      <button
                        onClick={() => { setSelectedTopic('all'); setShowTopicFilter(false) }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-asc-hover transition-colors ${selectedTopic === 'all' ? 'text-asc-text font-medium' : 'text-asc-secondary'}`}
                      >
                        All Topics
                      </button>
                      {spaces.map(space => (
                        <button
                          key={space.id}
                          onClick={() => { setSelectedTopic(space.slug); setShowTopicFilter(false) }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-asc-hover transition-colors ${selectedTopic === space.slug ? 'text-asc-text font-medium' : 'text-asc-secondary'}`}
                        >
                          {space.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sort tabs */}
            <div className="flex items-center bg-asc-surface border border-asc-border rounded-asc">
              <button 
                onClick={() => setSortBy('latest')}
                className={`px-4 py-2 text-sm font-medium rounded-l-asc flex items-center gap-2 transition-colors ${sortBy === 'latest' ? 'text-asc-text bg-asc-surface2' : 'text-asc-muted hover:text-asc-text'}`}
              >
                <Clock size={14} />
                Latest
              </button>
              <button 
                onClick={() => setSortBy('top')}
                className={`px-4 py-2 text-sm flex items-center gap-2 transition-colors ${sortBy === 'top' ? 'text-asc-text bg-asc-surface2' : 'text-asc-muted hover:text-asc-text'}`}
              >
                <TrendingUp size={14} />
                Top
              </button>
              <button 
                onClick={() => setSortBy('trending')}
                className={`px-4 py-2 text-sm transition-colors ${sortBy === 'trending' ? 'text-asc-text bg-asc-surface2' : 'text-asc-muted hover:text-asc-text'}`}
              >
                Trending
              </button>
              <button 
                onClick={() => setSortBy('unanswered')}
                className={`px-4 py-2 text-sm rounded-r-asc flex items-center gap-2 transition-colors ${sortBy === 'unanswered' ? 'text-asc-text bg-asc-surface2' : 'text-asc-muted hover:text-asc-text'}`}
              >
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
          {filteredThreads.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-asc-surface border border-asc-border rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={32} className="text-asc-muted" />
              </div>
              <h2 className="text-xl font-semibold text-asc-text mb-2">
                {searchQuery || selectedTopic !== 'all' ? 'No threads found' : 'No threads yet'}
              </h2>
              <p className="text-asc-secondary mb-6">
                {searchQuery || selectedTopic !== 'all' 
                  ? 'Try adjusting your filters or search query' 
                  : 'Be the first to start a discussion!'}
              </p>
              {searchQuery || selectedTopic !== 'all' ? (
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedTopic('all') }}
                  className="btn-secondary"
                >
                  Clear filters
                </button>
              ) : (
                <Link href="/app/new" className="btn-primary inline-flex items-center gap-2">
                  <Plus size={18} />
                  Create the first thread
                </Link>
              )}
            </div>
          ) : (
            /* Thread List */
            <div className="space-y-3">
              {filteredThreads.map((thread) => (
                <ThreadCard 
                  key={thread.id} 
                  thread={thread}
                  showMoreMenu={showMoreMenu === thread.id}
                  onToggleMenu={() => setShowMoreMenu(showMoreMenu === thread.id ? null : thread.id)}
                  onShare={() => handleShare(thread.id)}
                  onBookmark={() => handleBookmark(thread.id)}
                  onReport={() => handleReport(thread.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ThreadCard({ thread, showMoreMenu, onToggleMenu, onShare, onBookmark, onReport }: { 
  thread: any
  showMoreMenu: boolean
  onToggleMenu: () => void
  onShare: () => void
  onBookmark: () => void
  onReport: () => void
}) {
  const timeAgo = getTimeAgo(new Date(thread.createdAt))

  return (
    <article className="card group relative">
      <div className="flex gap-4">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <Link href={`/app/u/${thread.author.username}`}>
            <div className="w-10 h-10 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-semibold text-sm hover:scale-110 transition-transform cursor-pointer">
              {thread.author.username[0].toUpperCase()}
            </div>
          </Link>
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
            <div className="relative">
              <button 
                onClick={onToggleMenu}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-asc-hover rounded transition-all"
              >
                <MoreHorizontal size={16} className="text-asc-muted" />
              </button>

              {showMoreMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={onToggleMenu} />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-asc-surface border border-asc-border rounded-asc shadow-lg z-20 py-1">
                    <button
                      onClick={() => { onShare(); onToggleMenu() }}
                      className="w-full px-4 py-2 text-left text-sm text-asc-secondary hover:bg-asc-hover hover:text-asc-text transition-colors flex items-center gap-2"
                    >
                      <Share2 size={14} />
                      Share
                    </button>
                    <button
                      onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/app/thread/${thread.id}`); onToggleMenu(); alert('Link copied!') }}
                      className="w-full px-4 py-2 text-left text-sm text-asc-secondary hover:bg-asc-hover hover:text-asc-text transition-colors flex items-center gap-2"
                    >
                      <LinkIcon size={14} />
                      Copy link
                    </button>
                    <button
                      onClick={() => { onBookmark(); onToggleMenu() }}
                      className="w-full px-4 py-2 text-left text-sm text-asc-secondary hover:bg-asc-hover hover:text-asc-text transition-colors flex items-center gap-2"
                    >
                      <BookmarkIcon size={14} />
                      Bookmark
                    </button>
                    <div className="border-t border-asc-border my-1" />
                    <button
                      onClick={() => { onReport(); onToggleMenu() }}
                      className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-2"
                    >
                      <Flag size={14} />
                      Report
                    </button>
                  </div>
                </>
              )}
            </div>
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
                href={`/app/topics/${thread.channel.space?.slug || thread.channel.slug}`}
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
            <div className="flex items-center gap-
