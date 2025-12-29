'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Loader2, MessageSquare, Heart, User, TrendingUp } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { getTimeAgo } from '@/lib/utils'

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

<<<<<<< HEAD
  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults(null)
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      if (res.ok) {
        const data = await res.json()
        setResults(data)
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
=======
  let threads: any[] = []
  let users: any[] = []

  if (query.length >= 2) {
    // Search threads
    if (type === 'all' || type === 'threads') {
      threads = await prisma.thread.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { content: { contains: query } },
          ],
        },
        include: {
          author: true,
          topic: true,
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
            { username: { contains: query } },
            { bio: { contains: query } },
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
>>>>>>> 95514d72df2b70d50a6dc5e0eeef5d759b59b2c6
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
    router.push(`/app/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="glass border-b border-white/5 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                handleSearch(e.target.value)
              }}
              placeholder="Search threads, users..."
              className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              autoFocus
            />
            {isLoading && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 text-primary animate-spin" size={20} />
            )}
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {!results && !isLoading && (
            <div className="text-center py-16 text-dark-400">
              <Search size={64} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg">Start typing to search...</p>
            </div>
          )}

          {results && (
            <div className="space-y-8">
              {/* Threads */}
              {results.threads && results.threads.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="text-primary" size={24} />
                    Threads ({results.threads.length})
                  </h2>
                  <div className="space-y-3">
                    {results.threads.map((thread: any) => (
                      <Link
                        key={thread.id}
                        href={`/app/thread/${thread.id}`}
                        className="block glass rounded-xl p-6 hover:bg-white/[0.02] transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <Avatar src={thread.author.image} alt={thread.author.username} size="md" />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                              {thread.title}
                            </h3>
                            <p className="text-sm text-dark-300 line-clamp-2 mt-1">{thread.content}</p>
                            <div className="flex items-center gap-4 mt-3 text-xs text-dark-400">
                              <span className="flex items-center gap-1">
                                <User size={14} />
                                {thread.author.username}
                              </span>
                              {thread.topic && (
                                <span
                                  className="px-2 py-1 rounded-lg"
                                  style={{ backgroundColor: thread.topic.color + '20', color: thread.topic.color }}
                                >
                                  {thread.topic.name}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <MessageSquare size={14} />
                                {thread._count.posts}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart size={14} />
                                {thread._count.reactions}
                              </span>
                              <span>{getTimeAgo(thread.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Users */}
              {results.users && results.users.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <User className="text-primary" size={24} />
                    Users ({results.users.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.users.map((user: any) => (
                      <Link
                        key={user.id}
                        href={`/app/u/${user.username}`}
                        className="glass rounded-xl p-4 hover:bg-white/[0.02] transition-all group flex items-center gap-4"
                      >
                        <Avatar src={user.image} alt={user.username} size="lg" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white group-hover:text-primary transition-colors">
                            {user.displayName || user.username}
                          </div>
                          <div className="text-sm text-dark-400">@{user.username}</div>
                          {user.grade && (
                            <div
                              className="text-xs px-2 py-1 rounded-lg inline-block mt-1"
                              style={{ backgroundColor: user.grade.color + '20', color: user.grade.color }}
                            >
                              {user.grade.name}
                            </div>
                          )}
                          <div className="flex items-center gap-3 mt-2 text-xs text-dark-500">
                            <span>{user._count.threads} threads</span>
                            <span>{user._count.posts} posts</span>
                            <span>{user._count.followers} followers</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results && results.threads.length === 0 && results.users.length === 0 && (
                <div className="text-center py-16 text-dark-400">
                  <Search size={64} className="mx-auto mb-4 opacity-20" />
                  <p className="text-lg">No results found for "{query}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
<<<<<<< HEAD
=======

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
        {thread.topic && <span className="tag">{thread.topic.name}</span>}
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
>>>>>>> 95514d72df2b70d50a6dc5e0eeef5d759b59b2c6
