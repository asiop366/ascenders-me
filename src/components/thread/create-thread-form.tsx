'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Loader2, Image, Link as LinkIcon, Bold, Italic, List } from 'lucide-react'

interface Category {
  id: string
  name: string
  topics: {
    id: string
    name: string
    slug: string
  }[]
}

interface CreateThreadFormProps {
  categories: Category[]
  userId: string
}

export function CreateThreadForm({ categories, userId }: CreateThreadFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [notifyReplies, setNotifyReplies] = useState(true)
  const [allowReplies, setAllowReplies] = useState(true)

  const currentCategory = categories.find(c => c.id === selectedCategory)

  const addTag = () => {
    if (tagInput.trim() && tags.length < 5 && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim().toLowerCase()])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!selectedTopic) {
      setError('Please select a topic')
      return
    }
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    if (!content.trim()) {
      setError('Content is required')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: selectedTopic,
          title: title.trim(),
          content: content.trim(),
          tags,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create thread')
      }

      const thread = await res.json()
      router.push(`/app/thread/${thread.id}`)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-asc text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Topic Selection */}
      <div>
        <label className="block text-sm font-medium text-asc-text mb-2">
          Category & Topic <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setSelectedTopic('')
            }}
            className="input"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="input"
            disabled={!selectedCategory}
          >
            <option value="">Select Topic</option>
            {currentCategory?.topics.map(topic => (
              <option key={topic.id} value={topic.id}>{topic.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-asc-text mb-2">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title..."
          className="input"
          maxLength={200}
        />
        <p className="text-xs text-asc-muted mt-1">{title.length}/200 characters</p>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-asc-text mb-2">
          Content <span className="text-red-400">*</span>
        </label>

        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 bg-asc-surface border border-asc-border border-b-0 rounded-t-asc">
          <button type="button" className="p-2 hover:bg-asc-hover rounded transition-colors" title="Bold">
            <Bold size={16} className="text-asc-muted" />
          </button>
          <button type="button" className="p-2 hover:bg-asc-hover rounded transition-colors" title="Italic">
            <Italic size={16} className="text-asc-muted" />
          </button>
          <button type="button" className="p-2 hover:bg-asc-hover rounded transition-colors" title="List">
            <List size={16} className="text-asc-muted" />
          </button>
          <div className="w-px h-5 bg-asc-border mx-1" />
          <button type="button" className="p-2 hover:bg-asc-hover rounded transition-colors" title="Add Image">
            <Image size={16} className="text-asc-muted" />
          </button>
          <button type="button" className="p-2 hover:bg-asc-hover rounded transition-colors" title="Add Link">
            <LinkIcon size={16} className="text-asc-muted" />
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thread content here... (Markdown supported)"
          className="textarea rounded-t-none min-h-[200px]"
        />
        <p className="text-xs text-asc-muted mt-1">Markdown formatting is supported</p>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-asc-text mb-2">
          Tags <span className="text-asc-muted font-normal">(max 5)</span>
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <span key={tag} className="tag flex items-center gap-1">
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-asc-text"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag()
              }
            }}
            placeholder="Add a tag..."
            className="input flex-1"
            disabled={tags.length >= 5}
          />
          <button
            type="button"
            onClick={addTag}
            className="btn-secondary"
            disabled={tags.length >= 5}
          >
            Add
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="p-4 bg-asc-surface border border-asc-border rounded-asc space-y-3">
        <h3 className="text-sm font-medium text-asc-text mb-3">Options</h3>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={notifyReplies}
            onChange={(e) => setNotifyReplies(e.target.checked)}
            className="w-4 h-4 rounded border-asc-border bg-asc-bg text-asc-text focus:ring-asc-text focus:ring-offset-0"
          />
          <span className="text-sm text-asc-secondary">Notify me when someone replies</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={allowReplies}
            onChange={(e) => setAllowReplies(e.target.checked)}
            className="w-4 h-4 rounded border-asc-border bg-asc-bg text-asc-text focus:ring-asc-text focus:ring-offset-0"
          />
          <span className="text-sm text-asc-secondary">Allow replies to this thread</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-asc-border">
        <button type="button" className="btn-ghost">
          Save as draft
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary flex items-center gap-2"
            disabled={loading}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? 'Publishing...' : 'Publish thread'}
          </button>
        </div>
      </div>
    </form>
  )
}
