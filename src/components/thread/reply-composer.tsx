'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Send, Loader2, Bold, Italic, Link as LinkIcon, Image, Smile, Reply, X } from 'lucide-react'

interface ReplyComposerProps {
  threadId: string
  parentId?: string
  parentAuthor?: string
  onCancel?: () => void
  isNested?: boolean
}

export function ReplyComposer({
  threadId,
  parentId,
  parentAuthor,
  onCancel,
  isNested = false
}: ReplyComposerProps) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
          parentId: parentId || null,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to post reply')
      }

      setContent('')
      if (onCancel) onCancel()
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`bg-asc-surface border border-asc-border rounded-asc-lg ${isNested ? 'mt-3' : ''}`}>
      {parentId && parentAuthor && (
        <div className="flex items-center justify-between px-4 py-2 bg-asc-hover/50 border-b border-asc-border">
          <div className="flex items-center gap-2 text-sm text-asc-secondary">
            <Reply size={14} />
            <span>Replying to <span className="text-asc-text font-medium">@{parentAuthor}</span></span>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="p-1 hover:bg-asc-hover rounded transition-colors"
            >
              <X size={16} className="text-asc-muted" />
            </button>
          )}
        </div>
      )}

      <div className="p-4 border-b border-asc-border">
        <h3 className="font-medium text-asc-text">
          {parentId ? 'Write a reply' : 'Write a reply'}
        </h3>
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
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={parentId ? `Reply to @${parentAuthor}...` : "Share your thoughts..."}
            className={`w-full bg-transparent text-asc-text placeholder-asc-muted resize-none focus:outline-none ${isNested ? 'min-h-[80px]' : 'min-h-[120px]'}`}
            disabled={loading}
            autoFocus={!!parentId}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 pb-4">
          <p className="text-xs text-asc-muted">Markdown supported</p>
          <div className="flex items-center gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm text-asc-muted hover:text-asc-text transition-colors"
              >
                Cancel
              </button>
            )}
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
        </div>
      </form>
    </div>
  )
}
