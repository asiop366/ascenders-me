'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User, Upload, Loader2, Check, AlertCircle, Clock } from 'lucide-react'

export default function SettingsProfilePage() {
  const { data: session, update } = useSession()
  const router = useRouter()

  const [displayName, setDisplayName] = useState(session?.user?.displayName || session?.user?.username || '')
  const [username, setUsername] = useState(session?.user?.username || '')
  const [bio, setBio] = useState(session?.user?.bio || '')
  const [image, setImage] = useState(session?.user?.image || '')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Check if username can be changed (once per week)
  const canChangeUsername = () => {
    if (!session?.user?.usernameChangedAt) return true
    const lastChange = new Date(session.user.usernameChangedAt)
    const now = new Date()
    const diffDays = (now.getTime() - lastChange.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays >= 7
  }

  const daysUntilUsernameChange = () => {
    if (!session?.user?.usernameChangedAt) return 0
    const lastChange = new Date(session.user.usernameChangedAt)
    const now = new Date()
    const diffDays = (now.getTime() - lastChange.getTime()) / (1000 * 60 * 60 * 24)
    return Math.max(0, Math.ceil(7 - diffDays))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/users/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: displayName.trim(),
          username: username.trim(),
          bio: bio.trim(),
          image: image.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      setSuccess('Profile updated successfully!')
      await update() // Refresh session

    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-dark-400">Manage your public profile information</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400">
          <Check size={20} />
          <span>{success}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="gradient-border p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-white overflow-hidden shrink-0 border-2 border-primary/20">
              {image ? (
                <img src={image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                session?.user?.username?.[0]?.toUpperCase() || 'U'
              )}
            </div>
            <div className="flex-1">
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full bg-dark-800/50 border border-white/5 rounded-xl px-4 py-2 text-white placeholder-dark-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
              <p className="text-xs text-dark-500 mt-2">
                Paste a link to an image. JPG, PNG or GIF.
              </p>
            </div>
          </div>
        </div>

        {/* Display Name */}
        <div className="gradient-border p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Display Name</h2>
          <div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
              maxLength={50}
              className="w-full bg-dark-800/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <p className="text-xs text-dark-500 mt-2">
              This is the name displayed on your posts. You can change it anytime.
            </p>
          </div>
        </div>

        {/* Username */}
        <div className="gradient-border p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Username</h2>
          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="username"
                maxLength={20}
                disabled={!canChangeUsername()}
                className="w-full bg-dark-800/50 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            {canChangeUsername() ? (
              <p className="text-xs text-dark-500 mt-2">
                Your unique username. Can only be changed once every 7 days.
              </p>
            ) : (
              <p className="text-xs text-orange-400 mt-2 flex items-center gap-1">
                <Clock size={12} />
                You can change your username in {daysUntilUsernameChange()} days
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="gradient-border p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Bio</h2>
          <div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              maxLength={500}
              placeholder="Tell us about yourself..."
              className="w-full bg-dark-800/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
            <div className="flex justify-end mt-2">
              <span className="text-xs text-dark-500">{bio.length}/500</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
