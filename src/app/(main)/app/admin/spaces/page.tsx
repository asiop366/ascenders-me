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
        <Search className="absolute left-4 top-1
