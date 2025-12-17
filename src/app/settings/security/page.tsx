// app/settings/security/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Settings | Ascenders",
};

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Security</h2>
        <p className="text-gray-400">Manage your account security settings</p>
      </div>

      <div className="space-y-6">
        {/* Change Password */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Update Password
            </button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="pt-6 border-t border-zinc-800">
          <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
          <div className="p-4 bg-black border border-zinc-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">2FA Status</div>
                <div className="text-sm text-gray-400
