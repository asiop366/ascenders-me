import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { User, Mail, Shield, Bell, Palette, Lock } from 'lucide-react'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { grade: true },
  })

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 text-white rounded-lg transition-colors">
                <User size={18} />
                <span className="font-medium">Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-gray-400 rounded-lg transition-colors">
                <Lock size={18} />
                <span>Security</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-gray-400 rounded-lg transition-colors">
                <Bell size={18} />
                <span>Notifications</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-gray-400 rounded-lg transition-colors">
                <Palette size={18} />
                <span>Appearance</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Profile Section */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User size={20} />
                Profile Information
              </h2>

              <div className="space-y-6">
                {/* Avatar */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Avatar
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center font-bold text-2xl">
                      {user.username[0].toUpperCase()}
                    </div>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-gray-700 rounded text-sm transition-colors">
                      Change Avatar
                    </button>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue={user.username}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-white focus:outline-none transition-colors"
                    />
                    <button className="px-4 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-medium transition-colors">
                      Verify
                    </button>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Bio
                  </label>
                  <textarea
                    defaultValue={user.bio || ''}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-white focus:outline-none transition-colors resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum 500 characters</p>
                </div>

                {/* Role Badge */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Role
                  </label>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-gray-400" />
                    <span className="px-3 py-1 bg-white/10 border border-gray-700 rounded-full text-sm font-medium">
                      {user.role}
                    </span>
                  </div>
                </div>

                {/* Grade */}
                {user.grade && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Grade
                    </label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: user.grade.color }}
                      />
                      <span className="font-medium">{user.grade.name}</span>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-gray-800">
                  <button className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">0</div>
                <div className="text-sm text-gray-400">Threads</div>
              </div>
              <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">0</div>
                <div className="text-sm text-gray-400">Posts</div>
              </div>
              <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">0</div>
                <div className="text-sm text-gray-400">Reactions</div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-[#0a0a0a] border border-red-900/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-red-400">Danger Zone</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Delete Account</h3>
                    <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                  </div>
                  <button className="px-4 py-2 bg-red-900/20 hover:bg-red-900/30 border border-red-900 text-red-400 rounded-lg transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
