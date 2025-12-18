import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Appearance Settings | Ascenders',
}

export default function SettingsAppearancePage() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Appearance Settings</h1>
        <p className="text-zinc-400">Customize how Ascenders looks for you</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Theme</h3>
          <div className="grid grid-cols-3 gap-4">
            <button className="p-4 border-2 border-blue-500 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
              <div className="w-full h-20 bg-zinc-950 rounded mb-2"></div>
              <div className="text-sm font-medium">Dark</div>
            </button>
            <button className="p-4 border-2 border-zinc-700 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors opacity-50 cursor-not-allowed">
              <div className="w-full h-20 bg-white rounded mb-2"></div>
              <div className="text-sm font-medium">Light (Coming Soon)</div>
            </button>
            <button className="p-4 border-2 border-zinc-700 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors opacity-50 cursor-not-allowed">
              <div className="w-full h-20 bg-gradient-to-br from-zinc-950 to-white rounded mb-2"></div>
              <div className="text-sm font-medium">Auto (Coming Soon)</div>
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800">
          <h3 className="text-lg font-semibold mb-4">Display Options</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Font Size</label>
              <select className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500">
                <option>Small</option>
                <option selected>Medium</option>
                <option>Large</option>
              </select>
            </div>

            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium">Compact mode</div>
                <div className="text-sm text-zinc-400">Show more content on screen</div>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium">Show avatars</div>
                <div className="text-sm text-zinc-400">Display user profile pictures</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>
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
