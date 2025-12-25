'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Search, Loader2 } from 'lucide-react'

function NewMessageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const toUsername = searchParams.get('to') || ''

  const [recipient, setRecipient] = useState(toUsername)
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)

  // Search users
  useEffect(() => {
    if (recipient.length >= 2 && !toUsername) {
      const searchUsers = async () => {
        try {
          const res = await fetch(`/api/users/search?q=${recipient}`)
          const data = await res.json()
          setSearchResults(data.users || [])
          setShowResults(true)
        } catch (err) {
          console.error('Search error:', err)
        }
      }
      const timeout = setTimeout(searchUsers, 300)
      return () => clearTimeout(timeout)
    } else {
      setShowResults(false)
    }
  }, [recipient, toUsername])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient, content }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      router.push(`/app/messages/${recipient}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="glass border-b border-white/5 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/app/messages" className="text-dark-300 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-display font-bold text-white">New Message</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
                {error}
              </div>
            )}

            {/* Recipient */}
            <div className="relative">
              <label className="block text-sm font-medium text-dark-200 mb-2">To</label>
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Search username..."
                  className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Search Results */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-dark-800 border border-white/10 rounded-xl overflow-hidden z-10">
                  {searchResults.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => {
                        setRecipient(user.username)
                        setShowResults(false)
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-dark-700 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-white">
                        {user.username[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-white">{user.username}</div>
                        {user.grade && (
                          <div className="text-xs" style={{ color: user.grade.color }}>
                            {user.grade.name}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Message Content */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Message</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your message..."
                rows={6}
                className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !recipient || !content}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <Loader2 size={40} className="animate-spin text-primary" />
    </div>
  )
}

export default function NewMessagePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <NewMessageContent />
    </Suspense>
  )
}
