'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Modal } from '@/components/ui/modal'
import { X, ChevronDown } from 'lucide-react'

interface Space {
  id: string
  name: string
  channels: { id: string; name: string; slug: string }[]
}

interface CreateThreadModalProps {
  isOpen: boolean
  onClose: () => void
  spaces: Space[]
}

export function CreateThreadModal({ isOpen, onClose, spaces }: CreateThreadModalProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedChannel, setSelectedChannel] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedChannel) {
      setError('Please select a topic')
      return
    }

    if (title.length < 5) {
      setError('Title must be at least 5 characters')
      return
    }

    if (content.length < 10) {
      setError('Content must be at least 10 characters')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelId: selectedChannel,
          title,
          content,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create thread')
        setIsLoading(false)
        return
      }

      router.push(`/app/thread/${data.id}`)
      router.refresh()
      onClose()
    } catch (err) {
      setError('Something went wrong')
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setTitle('')
    setContent('')
    setSelectedChannel('')
    setError('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create new thread"
      size="lg"
      footer={
        <>
          <button onClick={handleClose} className="btn-secondary">
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? 'Creating...' : 'Create thread'}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-asc text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Topic selector */}
        <div>
          <label className="block text-sm font-medium text-asc-text mb-1.5">
            Topic
          </label>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="input"
            required
          >
            <option value="">Select a topic...</option>
            {spaces.map((space) => (
              <optgroup key={space.id} label={space.name}>
                {space.channels.map((channel) => (
                  <option key={channel.id} value={channel.id}>
                    {channel.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-asc-text mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="What's your thread about?"
            required
            minLength={5}
            maxLength={200}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-asc-text mb-1.5">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input resize-none"
            placeholder="Write your message..."
            rows={6}
            required
            minLength={10}
          />
        </div>
      </form>
    </Modal>
  )
}

