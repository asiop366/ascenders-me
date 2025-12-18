import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security Settings | Ascenders',
}

export default function SettingsSecurityPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Security Settings</h1>
        <p className="text-zinc-400">Manage your account security and authentication</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Update Password
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800">
          <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
          <div className="p-4 bg-zinc-800/50 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">2FA Status</div>
                <div className="text-sm text-zinc-400">Not enabled</div>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Enable 2FA
              </button>
            </div>
          </div>
          <p className="text-sm text-zinc-400">
            Add an extra layer of security to your account by enabling two-factor authentication.
          </p>
        </div>

        <div className="pt-6 border-t border-zinc-800">
          <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
          <div className="space-y-3">
            <div className="p-4 bg-zinc-800/50 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-medium">Current Session</div>
                <div className="text-sm text-zinc-400">Chrome on Windows • Active now</div>
              </div>
              <button className="px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
