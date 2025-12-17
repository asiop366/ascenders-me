'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send, Loader2, Bold, Italic, Link as LinkIcon, Image, Smile } from 'lucide-react'

interface ReplyComposerProps {
  threadId: string
}

export function ReplyComposer({ threadId }: ReplyComposerProps) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threadId,
          content: content.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to post reply')
      }

      setContent('')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-asc-surface border border-asc-border rounded-asc-lg">
      <div className="p-4 border-b border-asc-border">
        <h3 className="font-medium text-asc-text">Write a reply</h3>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-asc-border">
          <button type="button" className="p-2 hover:bg-asc-hover rounded transition-colors" title="Bold">
            <Bold size={16} className="text-asc-muted" />
          </button>
          <button type="button" className="p-2 hover:bg-asc-hover rounded transition-colors" title="Italic">
            <Italic size={16} className="text-asc-muted" />
          </button>
          <div className="w-px h-5 bg-asc-border mx-1" />
          <button type="button" className="p-2 hover:bg-asc-hover rounded transition-colors" title="Add Link">
            <LinkIcon size={16} className="text-asc-muted" />
          </button>
          <button type="button" className="p-2 hover:bg-asc-hover rounded transition-colors" title="Add Image">
            <Image size={16} className="text-asc-muted" />
          </button>
          <button type="button" className="p-2 hover:bg-asc-hover rounded transition-colors" title="Emoji">
            <Smile size={16} className="text-asc-muted" />
          </button>
        </div>

        {/* Textarea */}
        <div className="p-4">
          {error && (
            <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-asc text-red-400 text-sm">
              {error}
            </div>
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full min-h-[120px] bg-transparent text-asc-text placeholder-asc-muted resize-none focus:outline-none"
            disabled={loading}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 pb-4">
          <p className="text-xs text-asc-muted">Markdown supported</p>
          <button 
            type="submit" 
            className="btn-primary flex items-center gap-2"
            disabled={loading || !content.trim()}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            <span>{loading ? 'Posting...' : 'Post Reply'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
