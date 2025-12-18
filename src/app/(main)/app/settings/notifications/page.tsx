import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notification Settings | Ascenders',
}

export default function SettingsNotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notification Settings</h1>
        <p className="text-zinc-400">Control how and when you receive notifications</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium">New replies to your threads</div>
                <div className="text-sm text-zinc-400">Get notified when someone replies</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium">Direct mentions</div>
                <div className="text-sm text-zinc-400">When someone @mentions you</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium">Weekly digest</div>
                <div className="text-sm text-zinc-400">Summary of top discussions</div>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium">Marketing emails</div>
                <div className="text-sm text-zinc-400">Updates and announcements</div>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800">
          <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium">Enable push notifications</div>
                <div className="text-sm text-zinc-400">Receive notifications on this device</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium">Sound alerts</div>
                <div className="text-sm text-zinc-400">Play sound for notifications</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}
