'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Search, 
  Plus, 
  Filter,
  TrendingUp,
  Clock,
  Flame,
  ChevronDown
} from 'lucide-react'
import { ThreadList } from '@/components/forum/thread-list'

type SortOption = 'latest' | 'trending' | 'popular'

interface HomeClientProps {
  threads: any[]
  spaces: any[]
}

export function HomeClient({ threads, spaces }: HomeClientProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpace, setSelectedSpace] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Filter and sort threads
  const filteredThreads = useMemo(() => {
    let filtered = threads

    // Filter by space
    if (selectedSpace !== 'all') {
      filtered = filtered.filter(t => t.channel.space.slug === selectedSpace)
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    if (sortBy === 'trending') {
      filtered = [...filtered].sort((a, b) => 
        (b._count.reactions + b._count.posts) - (a._count.reactions + a._count.posts)
      )
    } else if (sortBy === 'popular') {
      filtered = [...filtered].sort((a, b) => b.viewCount - a.viewCount)
    }
    // 'latest' is already sorted from query

    return filtered
  }, [threads, selectedSpace, searchQuery, sortBy])

  return (
    <div className="h-full flex flex-col bg-asc-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-asc-bg/80 backdrop-blur-lg border-b border-asc-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-asc-text">Home</h1>
              <p className="text-sm text-asc-muted">
                {filteredThreads.length} {filteredThreads.length === 1 ? 'thread' : 'threads'}
              </p>
            </div>
            <button 
              onClick={() => router.push('/app/new')}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={18} />
              New thread
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-asc-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search threads..."
              className="input pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Space filter */}
            <div className="relative">
              <select
                value={selectedSpace}
                onChange={(e) => setSelectedSpace(e.target.value)}
                className="input pr-8 appearance-none bg-asc-surface cursor-pointer"
              >
                <option value="all">All Topics</option>
                {spaces.map((space) => (
                  <option key={space.id} value={space.slug}>
                    {space.icon} {space.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-asc-muted pointer-events-none" />
            </div>

            {/* Sort options */}
            <div className="flex items-center gap-2 bg-asc-surface border border-asc-border rounded-asc p-1">
              <button
                onClick={() => setSortBy('latest')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  sortBy === 'latest' 
                    ? 'bg-asc-hover text-asc-text' 
                    : 'text-asc-muted hover:text-asc-text'
                }`}
              >
                <Clock size={14} className="inline mr-1.5" />
                Latest
              </button>
              <button
                onClick={() => setSortBy('trending')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  sortBy === 'trending' 
                    ? 'bg-asc-hover text-asc-text' 
                    : 'text-asc-muted hover:text-asc-text'
                }`}
              >
                <Flame size={14} className="inline mr-1.5" />
                Trending
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  sortBy === 'popular' 
                    ? 'bg-asc-hover text-asc-text' 
                    : 'text-asc-muted hover:text-asc-text'
                }`}
              >
                <TrendingUp size={14} className="inline mr-1.5" />
                Popular
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          <ThreadList 
            threads={filteredThreads}
            emptyMessage={
              searchQuery 
                ? 'No threads found matching your search' 
                : 'No threads yet. Be the first to create one!'
            }
          />
        </div>
      </div>
    </div>
  )
}
