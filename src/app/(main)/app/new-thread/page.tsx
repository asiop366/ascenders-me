'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react'

export default function NewThreadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    channelId: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/threads/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create thread')
      }

      router.push(`/thread/${data.id}`)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/app" 
            className="inline-flex items-center gap-2 text-dark-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to feed
          </Link>
          <h1 className="text-display-md font-display font-bold text-white">
            Create New Thread
          </h1>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-dark-100 mb-2">
                Thread Title
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="What's on your mind?"
                className="w-full"
                maxLength={200}
              />
              <p className="text-xs text-dark-300 mt-2">
                {formData.title.length}/200 characters
              </p>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-dark-100 mb-2">
                Category
              </label>
              <select
                id="category"
                required
                value={formData.channelId}
                onChange={(e) => setFormData({ ...formData, channelId: e.target.value })}
                className="w-full"
              >
                <option value="">Select a category...</option>
                <option value="general">General Discussion</option>
                <option value="looksmaxxing">Looksmaxxing</option>
                <option value="fitness">Fitness & Training</option>
                <option value="skincare">Skincare</option>
                <option value="style">Style & Fashion</option>
              </select>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-dark-100 mb-2">
                Content
              </label>
              <textarea
                id="content"
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Share your thoughts..."
                rows={12}
                className="w-full resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <button
                type="button"
                className="btn-ghost flex items-center gap-2"
                disabled
              >
                <ImageIcon size={20} />
                Add Image (Coming Soon)
              </button>

              <div className="flex items-center gap-3">
                <Link href="/app" className="btn-ghost">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex items-center gap-2"
                >
                  {isLoading && <Loader2 size={20} className="animate-spin" />}
                  {isLoading ? 'Publishing...' : 'Publish Thread'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
