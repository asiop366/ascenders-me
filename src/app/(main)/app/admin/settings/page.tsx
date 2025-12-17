// app/admin/settings/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Settings | Ascenders",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Admin Settings</h2>
        <p className="text-gray-400">Configure platform-wide settings</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Platform Name</label>
              <input
                type="text"
                defaultValue="Ascenders"
                className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Support Email</label>
              <input
                type="email"
                defaultValue="support@ascenders.me"
                className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Registration Settings */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Registration Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 bg-black border border-zinc-700 rounded-lg cursor-pointer">
              <div>
                <div className="font-medium">Allow Public Registration</div>
                <div className="text-sm text-gray-400">Let anyone sign up for an account</div>
              </div>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between p-4 bg-black border border-zinc-700 rounded-lg cursor-pointer">
              <div>
                <div className="font-medium">Require Email Verification</div>
                <div className="text-sm text-gray-400">Users must verify email before accessing platform</div>
              </div>
              <input type="checkbox" defaultChecked />
            </label>
          </div>
        </div>

        {/* Content Moderation */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Content Moderation</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 bg-black border border-zinc-700 rounded-lg cursor-pointer">
              <div>
                <div className="font-medium">Auto-Moderate Content</div>
                <div className="text-sm text-gray-400">Automatically flag inappropriate content</div>
              </div>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between p-4 bg-black border border-zinc-700 rounded-lg cursor-pointer">
              <div>
                <div className="font-medium">Require Post Approval</div>
                <div className="text-sm text-gray-400">All posts must be approved by moderators</div>
              </div>
              <input type="checkbox" />
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
