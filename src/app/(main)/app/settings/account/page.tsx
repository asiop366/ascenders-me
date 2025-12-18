import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account Settings | Ascenders',
}

export default function SettingsAccountPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-zinc-400">Manage your account preferences and privacy</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium">Show profile to public</div>
                <div className="text-sm text-zinc-400">Allow anyone to view your profile</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium">Show online status</div>
                <div className="text-sm text-zinc-400">Let others know when you're active</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium">Allow direct messages</div>
                <div className="text-sm text-zinc-400">Receive DMs from other users</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800">
          <h3 className="text-lg font-semibold mb-4 text-red-400">Danger Zone</h3>
          <button className="px-4 py-2 bg-red-600/20 border border-red-600 text-red-400 hover:bg-red-600/30 rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
