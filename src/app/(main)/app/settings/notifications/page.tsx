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

            <label className="flex items-center justify-between
