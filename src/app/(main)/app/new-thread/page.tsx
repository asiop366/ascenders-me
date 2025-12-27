'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  ArrowLeft,
  Send,
  Image as ImageIcon,
  Link as LinkIcon,
  Bold,
  Italic,
  List,
  Quote,
  Code,
  Eye,
  Edit3,
  Hash,
  Loader2,
  AlertCircle,
  CheckCircle,
  Upload,
  X
} from 'lucide-react'

interface Topic {
  id: string
  name: string
  slug: string
  icon?: string
  color?: string
  _count?: { threads: number }
}

export default function NewThreadPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [topics, setTopics] = useState<Topic[]>([])
  const [isPreview, setIsPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Fetch topics on mount
  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch('/api/topics')
        if (res.ok) {
          const data = await res.json()
          setTopics(data)
        }
      } catch (err) {
        console.error('Failed to fetch topics:', err)
      }
    }
    fetchTopics()
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/app/new-thread')
    }
  }, [status, router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG and PNG files are allowed')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setError('')
    setImageFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Please enter a title')
      return
    }

    if (title.length < 5) {
      setError('Title must be at least 5 characters')
      return
    }

    if (!content.trim()) {
      setError('Please enter some content')
      return
    }

    if (content.length < 10) {
      setError('Content must be at least 10 characters')
      return
    }

    if (!selectedTopic) {
      setError('Please select a topic')
      return
    }

    setIsSubmitting(true)

    try {
      let imageUrl = ''

      // Upload image if selected
      if (imageFile) {
        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('type', 'thread')

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadRes.ok) {
          const data = await uploadRes.json()
          throw new Error(data.error || 'Failed to upload image')
        }

        const uploadData = await uploadRes.json()
        imageUrl = uploadData.url
        setIsUploading(false)
      }

      const res = await fetch('/api/threads/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          topicId: selectedTopic,
          imageUrl: imageUrl || undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create thread')
      }

      const thread = await res.json()
      setSuccess(true)

      setTimeout(() => {
        router.push(`/app/thread/${thread.id}`)
      }, 1000)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
      setIsUploading(false)
    }
  }

  // Text formatting helpers
  const insertFormat = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selectedText = text.substring(start, end)

    let newText = ''

    switch (format) {
      case 'bold':
        newText = `**${selectedText || 'bold text'}**`
        break
      case 'italic':
        newText = `*${selectedText || 'italic text'}*`
        break
      case 'list':
        newText = `\n- ${selectedText || 'list item'}`
        break
      case 'quote':
        newText = `\n> ${selectedText || 'quote'}`
        break
      case 'code':
        newText = `\`${selectedText || 'code'}\``
        break
      case 'link':
        newText = `[${selectedText || 'link text'}](url)`
        break
    }

    const before = text.substring(0, start)
    const after = text.substring(end)
    setContent(before + newText + after)
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="bg-dark-900/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/app"
              className="p-2 rounded-lg hover:bg-white/5 text-dark-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Create New Thread</h1>
              <p className="text-sm text-dark-400">Share your thoughts with the community</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Preview Toggle */}
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isPreview
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-dark-800/50 text-dark-300 border border-white/5 hover:bg-dark-800 hover:text-white'
                }`}
            >
              {isPreview ? <Edit3 size={16} /> : <Eye size={16} />}
              {isPreview ? 'Edit' : 'Preview'}
            </button>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim() || !content.trim() || !selectedTopic}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {isSubmitting ? (isUploading ? 'Uploading...' : 'Publishing...') : 'Publish Thread'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400">
            <CheckCircle size={20} />
            <span>Thread created successfully! Redirecting...</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Selection (Required) */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">
              Topic <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                required
                className={`w-full bg-dark-800/50 border rounded-xl pl-11 pr-4 py-3 text-white appearance-none focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all ${!selectedTopic ? 'border-white/5' : 'border-primary/30'
                  }`}
              >
                <option value="">Select a topic...</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.icon ? `${topic.icon} ` : ''}{topic.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-2 text-xs text-dark-500">
              Choose a topic to categorize your thread
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">
              Image <span className="text-dark-500">(optional)</span>
            </label>

            {imagePreview ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10 bg-dark-800">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg text-white hover:bg-black transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="relative cursor-pointer block">
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center gap-3 w-full h-32 bg-dark-800/50 border-2 border-dashed border-white/10 rounded-xl hover:border-primary/50 hover:bg-dark-800 transition-all">
                  <ImageIcon size={24} className="text-dark-400" />
                  <div className="text-sm text-dark-400">
                    <span className="text-primary">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-xs text-dark-500">JPG, PNG only (max 5MB)</p>
                </div>
              </label>
            )}
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your thread about?"
              maxLength={200}
              required
              className="w-full bg-dark-800/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg"
            />
            <div className="flex justify-end mt-2">
              <span className={`text-xs ${title.length > 180 ? 'text-orange-400' : 'text-dark-500'}`}>
                {title.length}/200
              </span>
            </div>
          </div>

          {/* Content Editor / Preview */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">
              Content <span className="text-red-400">*</span>
            </label>

            {!isPreview && (
              <>
                {/* Formatting Toolbar */}
                <div className="flex items-center gap-1 mb-2 p-2 bg-dark-800/30 rounded-t-xl border border-white/5 border-b-0">
                  <button
                    type="button"
                    onClick={() => insertFormat('bold')}
                    className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="Bold"
                  >
                    <Bold size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormat('italic')}
                    className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="Italic"
                  >
                    <Italic size={18} />
                  </button>
                  <div className="w-px h-6 bg-white/10 mx-1" />
                  <button
                    type="button"
                    onClick={() => insertFormat('list')}
                    className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="List"
                  >
                    <List size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormat('quote')}
                    className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="Quote"
                  >
                    <Quote size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormat('code')}
                    className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="Code"
                  >
                    <Code size={18} />
                  </button>
                  <div className="w-px h-6 bg-white/10 mx-1" />
                  <button
                    type="button"
                    onClick={() => insertFormat('link')}
                    className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="Link"
                  >
                    <LinkIcon size={18} />
                  </button>
                </div>

                {/* Textarea */}
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your thread content here... Supports Markdown formatting."
                  rows={12}
                  required
                  className="w-full bg-dark-800/50 border border-white/5 rounded-b-xl px-4 py-4 text-white placeholder-dark-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </>
            )}

            {isPreview && (
              <div className="bg-dark-800/50 border border-white/5 rounded-xl p-6 min-h-[300px]">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {title || 'Your title will appear here...'}
                </h2>
                <div className="prose prose-invert prose-sm max-w-none">
                  {content ? (
                    <div className="text-dark-200 whitespace-pre-wrap">
                      {content}
                    </div>
                  ) : (
                    <p className="text-dark-500 italic">Your content will appear here...</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-2">
              <span className="text-xs text-dark-500">
                Supports Markdown formatting
              </span>
              <span className={`text-xs ${content.length > 4500 ? 'text-orange-400' : 'text-dark-500'}`}>
                {content.length}/5000
              </span>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-dark-800/30 border border-white/5 rounded-xl p-4">
            <h3 className="text-sm font-medium text-white mb-2">📝 Posting Guidelines</h3>
            <ul className="text-sm text-dark-400 space-y-1">
              <li>• Be respectful and constructive in your discussions</li>
              <li>• Use a clear, descriptive title (min. 5 characters)</li>
              <li>• Provide detailed content to help others understand (min. 10 characters)</li>
              <li>• <span className="text-primary">Select an appropriate topic (required)</span></li>
              <li>• Only JPG and PNG images are allowed</li>
              <li>• No spam, hate speech, or illegal content</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  )
}
