'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { 
  User, 
  Lock, 
  Bell, 
  Palette, 
  Shield,
  Loader2,
  Camera,
  Trash2,
  LogOut,
  Eye,
  EyeOff
} from 'lucide-react'

interface SettingsFormProps {
  user: {
    id: string
    email: string
    username: string
    bio: string | null
    image: string | null
    role: string
    grade?: {
      name: string
      color: string
    } | null
  }
  stats?: {
    threads: number
    posts: number
    reactions: number
  }
}

type Tab = 'profile' | 'security' | 'notifications' | 'appearance'

export function SettingsForm({ user, stats }: SettingsFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Profile form state
  const [username, setUsername] = useState(user.username)
  const [bio, setBio] = useState(user.bio || '')
  const [email, setEmail] = useState(user.email)

  // Security form state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [replyNotifications, setReplyNotifications] = useState(true)
  const [mentionNotifications, setMentionNotifications] = useState(true)
  const [likeNotifications, setLikeNotifications] = useState(false)

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, bio }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update profile')
      }

      setSuccess('Profile updated successfully')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/user/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to change password')
      }

      setSuccess('Password changed successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ] as const

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="md:col-span-1">
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setError(''); setSuccess('') }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-asc transition-all duration-120 ${
                activeTab === tab.id
                  ? 'bg-asc-surface2 text-asc-text'
                  : 'text-asc-muted hover:bg-asc-hover hover:text-asc-text'
              }`}
            >
              <tab.icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Account Stats */}
        {stats && (
          <div className="mt-6 p-4 bg-asc-surface border border-asc-border rounded-asc">
            <h3 className="text-sm font-medium text-asc-text mb-3">Account Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-asc-muted">Threads</span>
                <span className="text-asc-text">{stats.threads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-asc-muted">Replies</span>
                <span className="text-asc-text">{stats.posts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-asc-muted">Reactions</span>
                <span className="text-asc-text">{stats.reactions}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="md:col-span-3">
        {/* Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-asc text-red-400 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-asc text-green-400 text-sm">
            {success}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="bg-asc-surface border border-asc-border rounded-asc-lg p-6">
              <h2 className="text-lg font-semibold text-asc-text mb-6 flex items-center gap-2">
                <User size={20} />
                Profile Information
              </h2>

              {/* Avatar */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-asc-secondary mb-2">Avatar</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-bold text-2xl relative group">
                    {user.username[0].toUpperCase()}
                    <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                      <Camera size={24} />
                    </div>
                  </div>
                  <div>
                    <button type="button" className="btn-secondary text-sm">Change Avatar</button>
                    <p className="text-xs text-asc-muted mt-1">JPG, PNG, GIF. Max 2MB.</p>
                  </div>
                </div>
              </div>

              {/* Username */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-asc-secondary mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-asc-secondary mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  disabled
                />
                <p className="text-xs text-asc-muted mt-1">Email cannot be changed</p>
              </div>

              {/* Bio */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-asc-secondary mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="textarea"
                  rows={4}
                  maxLength={500}
                />
                <p className="text-xs text-asc-muted mt-1">{bio.length}/500 characters</p>
              </div>

              {/* Role */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-asc-secondary mb-2">Role</label>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-asc-muted" />
                  <span className="badge">{user.role}</span>
                </div>
              </div>

              {/* Grade */}
              {user.grade && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-asc-secondary mb-2">Grade</label>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: user.grade.color }}
                    />
                    <span className="text-asc-text">{user.grade.name}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button type="submit" className="btn-primary flex items-center gap-2" disabled={loading}>
                {loading && <Loader2 size={16} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <form onSubmit={handleChangePassword} className="bg-asc-surface border border-asc-border rounded-asc-lg p-6">
              <h2 className="text-lg font-semibold text-asc-text mb-6 flex items-center gap-2">
                <Lock size={20} />
                Change Password
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-asc-secondary mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="input pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-asc-muted hover:text-asc-text"
                    >
                      {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-asc-secondary mb-2">New Password</label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input"
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-asc-muted mt-1">Minimum 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-asc-secondary mb-2">Confirm New Password</label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <button type="submit" className="btn-primary flex items-center gap-2" disabled={loading}>
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  Update Password
                </button>
              </div>
            </form>

            {/* Sessions */}
            <div className="bg-asc-surface border border-asc-border rounded-asc-lg p-6">
              <h2 className="text-lg font-semibold text-asc-text mb-4">Active Sessions</h2>
              <div className="p-4 bg-asc-bg border border-asc-border rounded-asc flex items-center justify-between">
                <div>
                  <p className="text-sm text-asc-text">Current Session</p>
                  <p className="text-xs text-asc-muted">This device  Active now</p>
                </div>
                <span className="w-2 h-2 bg-green-500 rounded-full" />
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-asc-surface border border-red-500/30 rounded-asc-lg p-6">
              <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-asc-bg border border-asc-border rounded-asc">
                  <div>
                    <p className="font-medium text-asc-text">Sign out everywhere</p>
                    <p className="text-sm text-asc-muted">Log out of all active sessions</p>
                  </div>
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out All
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-asc-bg border border-asc-border rounded-asc">
                  <div>
                    <p className="font-medium text-asc-text">Delete Account</p>
                    <p className="text-sm text-asc-muted">Permanently delete your account and all data</p>
                  </div>
                  <button className="btn-destructive flex items-center gap-2">
                    <Trash2 size={16} />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-asc-surface border border-asc-border rounded-asc-lg p-6">
            <h2 className="text-lg font-semibold text-asc-text mb-6 flex items-center gap-2">
              <Bell size={20} />
              Notification Preferences
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-asc-bg border border-asc-border rounded-asc cursor-pointer hover:border-asc-muted transition-colors">
                <div>
                  <p className="font-medium text-asc-text">Email Notifications</p>
                  <p className="text-sm text-asc-muted">Receive notifications via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-5 h-5 rounded border-asc-border bg-asc-bg text-asc-text"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-asc-bg border border-asc-border rounded-asc cursor-pointer hover:border-asc-muted transition-colors">
                <div>
                  <p className="font-medium text-asc-text">Reply Notifications</p>
                  <p className="text-sm text-asc-muted">When someone replies to your threads</p>
                </div>
                <input
                  type="checkbox"
                  checked={replyNotifications}
                  onChange={(e) => setReplyNotifications(e.target.checked)}
                  className="w-5 h-5 rounded border-asc-border bg-asc-bg text-asc-text"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-asc-bg border border-asc-border rounded-asc cursor-pointer hover:border-asc-muted transition-colors">
                <div>
                  <p className="font-medium text-asc-text">Mention Notifications</p>
                  <p className="text-sm text-asc-muted">When someone @mentions you</p>
                </div>
                <input
                  type="checkbox"
                  checked={mentionNotifications}
                  onChange={(e) => setMentionNotifications(e.target.checked)}
                  className="w-5 h-5 rounded border-asc-border bg-asc-bg text-asc-text"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-asc-bg border border-asc-border rounded-asc cursor-pointer hover:border-asc-muted transition-colors">
                <div>
                  <p className="font-medium text-asc-text">Like Notifications</p>
                  <p className="text-sm text-asc-muted">When someone likes your content</p>
                </div>
                <input
                  type="checkbox"
                  checked={likeNotifications}
                  onChange={(e) => setLikeNotifications(e.target.checked)}
                  className="w-5 h-5 rounded border-asc-border bg-asc-bg text-asc-text"
                />
              </label>
            </div>

            <div className="mt-6">
              <button className="btn-primary">Save Preferences</button>
            </div>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="bg-asc-surface border border-asc-border rounded-asc-lg p-6">
            <h2 className="text-lg font-semibold text-asc-text mb-6 flex items-center gap-2">
              <Palette size={20} />
              Appearance
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-asc-secondary mb-3">Theme</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 bg-asc-bg border-2 border-asc-text rounded-asc text-center">
                    <div className="w-full h-8 bg-asc-bg border border-asc-border rounded mb-2" />
                    <span className="text-sm font-medium text-asc-text">Dark</span>
                  </button>
                  <button className="p-4 bg-asc-bg border border-asc-border rounded-asc text-center opacity-50 cursor-not-allowed" disabled>
                    <div className="w-full h-8 bg-white border border-gray-200 rounded mb-2" />
                    <span className="text-sm text-asc-muted">Light (Coming soon)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-asc-secondary mb-3">Font Size</label>
                <select className="input">
                  <option value="sm">Small (14px)</option>
                  <option value="md" selected>Medium (16px)</option>
                  <option value="lg">Large (18px)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
