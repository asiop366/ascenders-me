import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  Bookmark, 
  MessageSquare, 
  Eye, 
  Heart,
  Trash2,
  Clock
} from 'lucide-react'

// Mock bookmarks for now (will be replaced with real data)
const mockBookmarks = [
  {
    id: '1',
    thread: {
      id: 't1',
      title: 'How to build a modern web application with Next.js 14',
      content: 'This is a comprehensive guide on building modern web applications using the latest features of Next.js 14...',
      author: { username: 'developer123' },
      channel: { name: 'guides', slug: 'guides' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      _count: { posts: 42, reactions: 156 },
      viewCount: 1234,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    thread: {
      id: 't2',
      title: 'Best practices for React state management in 2024',
      content: 'A deep dive into different state management solutions and when to use them...',
      author: { username: 'reactpro' },
      channel: { name: 'general-discussion', slug: 'general-discussion' },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      _count: { posts: 89, reactions: 234 },
      viewCount: 2567,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
]

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="h-full overflow-y-auto bg-asc-bg">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-asc-text flex items-center gap-2">
            <Bookmark size={24} />
            Bookmarks
          </h1>
          <p className="text-asc-muted mt-1">
            {mockBookmarks.length} saved threads
          </p>
        </div>

        {/* Bookmarks List */}
        {mockBookmarks.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-asc-surface border border-asc-border rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark size={32} className="text-asc-muted" />
            </div>
            <h2 className="text-lg font-semibold text-asc-text mb-2">No bookmarks yet</h2>
            <p className="text-asc-muted mb-4">Save threads you want to read later.</p>
            <Link href="/app" className="btn-primary">
              Browse Threads
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {mockBookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BookmarkCard({ bookmark }: { bookmark: typeof mockBookmarks[0] }) {
  const { thread } = bookmark
  const timeAgo = getTimeAgo(new Date(thread.createdAt))
  const savedAgo = getTimeAgo(bookmark.createdAt)

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
          {/* Title */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <Link 
              href={`/app/thread/${thread.id}`}
              className="text-base font-semibold text-asc-text hover:underline line-clamp-1"
            >
              {thread.title}
            </Link>

            {/* Remove bookmark button */}
            <button 
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
              title="Remove bookmark"
            >
              <Trash2 size={16} className="text-asc-muted hover:text-red-400" />
            </button>
          </div>

          {/* Excerpt */}
          <p className="text-sm text-asc-secondary line-clamp-2 mb-3">
            {thread.content}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-asc-muted">
            {/* Channel */}
            <span className="tag">{thread.channel.name}</span>

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

          {/* Saved time */}
          <p className="text-xs text-asc-muted mt-2 flex items-center gap-1">
            <Bookmark size={10} />
            Saved {savedAgo}
          </p>
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
