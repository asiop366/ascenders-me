// app/admin/spaces/page.tsx
import { Metadata } from "next";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Space Management | Admin | Ascenders",
};

export default function AdminSpacesPage() {
  const spaces = [
    { id: 1, name: "General Discussion", owner: "john_doe", members: 234, threads: 45 },
    { id: 2, name: "Tech Talk", owner: "jane_smith", members: 156, threads: 78 },
    { id: 3, name: "Gaming", owner: "mike_wilson", members: 389, threads: 123 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Space Management</h2>
          <p className="text-gray-400">Manage all platform spaces</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search spaces..."
          className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Spaces Table */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-black border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Space Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Owner</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Members</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Threads</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spaces.map((space) => (
              <tr key={space.id} className="border-b border-zinc-800 last:border-0">
                <td className="px-6 py-4 font-medium">{space.name}</td>
                <td className="px-6 py-4 text-gray-400">{space.owner}</td>
                <td className="px-6 py-4 text-gray-400">{space.members}</td>
                <td className="px-6 py-4 text-gray-400">{space.threads}</td>
                <td className="px-6 py-4">
                  <button className="text-sm text-blue-400 hover:text-blue-300">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
