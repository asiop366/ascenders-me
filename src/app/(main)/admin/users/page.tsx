// app/admin/users/page.tsx
import { Metadata } from "next";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "User Management | Admin | Ascenders",
};

export default function AdminUsersPage() {
  const users = [
    { id: 1, username: "john_doe", email: "john@example.com", tier: "Gold", status: "Active" },
    { id: 2, username: "jane_smith", email: "jane@example.com", tier: "Silver", status: "Active" },
    { id: 3, username: "mike_wilson", email: "mike@example.com", tier: "Bronze", status: "Active" },
    { id: 4, username: "sarah_jones", email: "sarah@example.com", tier: "Bronze", status: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">User Management</h2>
          <p className="text-gray-400">Manage all platform users</p>
        </div>
        <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
          Add User
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Users Table */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-black border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Username</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Tier</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-zinc-800 last:border-0">
                <td className="px-6 py-4 font-medium">{user.username}</td>
                <td className="px-6 py-4 text-gray-400">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-white/10 rounded text-sm">{user.tier}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    user.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-500"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-sm text-blue-400 hover:text-blue-300">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
