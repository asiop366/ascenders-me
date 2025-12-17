import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { 
  Search, 
  MessageSquare, 
  User, 
  Folder,
  Eye,
  Heart,
  Clock,
  Filter,
  X
} from 'lucide-react'

interface SearchPageProps {
  searchParams: { q?: string; type?: string; topic?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const session = await getServerSession(authOptions)
  const query = searchParams.q || ''
  const type = searchParams.type || 'all'
  const topic = searchParams.topic || ''

  let threads: any[] = []
  let users: any[] = []

  if (query.length >= 2) {
    // Search threads
    if (type === 'all' || type === 'threads') {
      threads = await prisma.thread.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: {
          author: true,
          channel: { include: { space: true } },
          _count: { select: { posts: true, reactions: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      })
    }

    // Search users
    if (type === 'all' || type === 'users') {
      users = await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: query, mode: 'insensitive' } },
            { bio: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          username: true,
          bio: true,
          role: true,
          createdAt: true,
          _count: { select: { threads: true, posts: true } },
        },
        take: 10,
      })
    }
  }

  const totalResults = threads.length + users.length

  return (
    <div className="h-full overflow-y-auto bg-asc-bg">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-asc-text flex items-center gap-2">
            <Search size={24} />
            Search
          </h1>
        </div>

        {/* Search Form */}
        <form className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-asc-muted" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search threads, topics, @users..."
                className="input pl-11"
                autoFocus
              />
              {query && (
                <Link 
                  href="/app/search" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-asc-muted hover:text-asc-text"
                >
                  <X size={18} />
                </Link>
              )}
            </div>
            <button type="submit" className="btn-primary">
              Search
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 border-b border-asc-border">
          <Link 
            href={`/app/search?q=${query}`}
            className={`px-4 py-3 text-sm ${type === 'all' ? 'font-medium text-asc-text border-b-2 border-asc-text' : 'text-asc-muted hover:text-asc-text'}`}
          >
            All ({totalResults})
          </Link>
          <Link 
            href={`/app/search?q=${query}&type=threads`}
            className={`px-4 py-3 text-sm flex items-center gap-1 ${type === 'threads' ? 'font-medium text-asc-text border-b-2 border-asc-text' : 'text-asc-muted hover:text-asc-text'}`}
          >
            <MessageSquare size={14} />
            Threads ({threads.length})
          </Link>
          <Link 
            href={`/app/search?q=${query}&type=users`}
            className={`px-4 py-3 text-sm flex items-center gap-1 ${type === 'users' ? 'font-medium text-asc-text border-b-2 border-asc-text' : 'text-asc-muted hover:text-asc-text'}`}
          >
            <User size={14} />
            Users ({users.length})
          </Link>
        </div>

        {/* Results */}
        {!query ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-asc-surface border border-asc-border rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-asc-muted" />
            </div>
            <h2 className="text-lg font-semibold text-asc-text mb-2">Search Ascenders</h2>
            <p className="text-asc-muted">Find threads, topics, and users</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-asc-surface border border-asc-border rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-asc-muted" />
            </div>
            <h2 className="text-lg font-semibold text-asc-text mb-2">No results found</h2>
            <p className="text-asc-muted mb-4">Try different keywords or check your spelling</p>
            <Link href="/app" className="btn-secondary">
              Browse all threads
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Thread Results */}
            {threads.length > 0 && (type === 'all' || type === 'threads') && (
              <div>
                {type === 'all' && (
                  <h2 className="text-sm font-medium text-asc-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                    <MessageSquare size={14} />
                    Threads
                  </h2>
                )}
                <div className="space-y-3">
                  {threads.map((thread) => (
                    <ThreadResult key={thread.id} thread={thread} query={query} />
                  ))}
                </div>
              </div>
            )}

            {/* User Results */}
            {users.length > 0 && (type === 'all' || type === 'users') && (
              <div>
                {type === 'all' && (
                  <h2 className="text-sm font-medium text-asc-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                    <User size={14} />
                    Users
                  </h2>
                )}
                <div className="space-y-3">
                  {users.map((user) => (
                    <UserResult key={user.id} user={user} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ThreadResult({ thread, query }: { thread: any; query: string }) {
  const timeAgo = getTimeAgo(new Date(thread.createdAt))

  return (
    <Link href={`/app/thread/${thread.id}`} className="card block">
      <h3 className="font-semibold text-asc-text mb-1 hover:underline">
        <HighlightText text={thread.title} query={query} />
      </h3>
      <p className="text-sm text-asc-secondary line-clamp-2 mb-2">
        <HighlightText text={thread.content} query={query} />
      </p>
      <div className="flex items-center gap-4 text-xs text-asc-muted">
        {thread.channel && <span className="tag">{thread.channel.name}</span>}
        <span>by {thread.author.username}</span>
        <span className="flex items-center gap-1"><Clock size={12} />{timeAgo}</span>
        <span className="flex items-center gap-1 ml-auto"><MessageSquare size={12} />{thread._count.posts}</span>
        <span className="flex items-center gap-1"><Heart size={12} />{thread._count.reactions}</span>
      </div>
    </Link>
  )
}

function UserResult({ user }: { user: any }) {
  return (
    <Link href={`/app/u/${user.username}`} className="card flex items-center gap-4">
      <div className="w-12 h-12 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-bold text-lg">
        {user.username[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-asc-text">@{user.username}</h3>
          <span className="badge">{user.role}</span>
        </div>
        {user.bio && (
          <p className="text-sm text-asc-secondary truncate">{user.bio}</p>
        )}
        <p className="text-xs text-asc-muted mt-1">
          {user._count.threads} threads • {user._count.posts} posts
        </p>
      </div>
    </Link>
  )
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-asc-text/20 text-asc-text px-0.5 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
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
