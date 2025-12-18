import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Profile Settings | Ascenders',
}

export default async function SettingsProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-zinc-400">Manage your public profile information</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            defaultValue={session.user?.username || ''}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500"
            disabled
          />
          <p className="text-xs text-zinc-500 mt-1">Username cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            defaultValue={session.user?.email || ''}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            rows={4}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Profile Picture</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-zinc-800 overflow-hidden">
              {session.user?.image && (
                <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
              )}
            </div>
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
              Upload New
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
