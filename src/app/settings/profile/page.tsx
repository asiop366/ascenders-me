// app/settings/profile/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Settings | Ascenders",
};

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
        <p className="text-gray-400">Manage your public profile information</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            placeholder="Your username"
            className="w-full px-4 py-2 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Display Name</label>
          <input
            type="text"
            placeholder="Your
