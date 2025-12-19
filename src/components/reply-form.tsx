'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send, Loader2 } from 'lucide-react'

export function ReplyForm({ threadId }: { threadId: string }) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) return

    setError('')
    setIsLoading(true)

    try {
      const res = await fetch(`/api/threads/${threadId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to post reply')
      }

      setContent('')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-bold text-white mb-4">Reply to this thread</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          rows={4}
          className="w-full resize-none"
          disabled={isLoading}
          required
        />

        <div className="flex items-center justify-between">
          <p className="text-xs text-dark-300">
            {content.length} characters
          </p>
          
          <button
            type="submit"
            disabled={isLoading || !content.trim()}
            className="btn-primary flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send size={18} />
                Post Reply
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
