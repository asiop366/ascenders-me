// app/settings/account/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings | Ascenders",
};

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
        <p className="text-gray-400">Manage your account preferences</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Language</label>
          <select className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors">
            <option>English</option>
            <option>Français</option>
            <option>Español</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Timezone</label>
          <select className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors">
            <option>UTC</option>
            <option>America/New_York</option>
            <option>Europe/Paris</option>
            <option>Asia/Tokyo</option>
          </select>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <h3 className="text-lg font-semibold mb-4 text-red-500">Danger Zone</h3>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
