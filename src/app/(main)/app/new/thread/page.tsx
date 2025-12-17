// app/app/new/thread/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Create New Thread | Ascenders",
};

export default function NewThreadPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link 
          href="/app"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Feed
        </Link>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Create New Thread</h1>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                placeholder="Share your thoughts..."
                rows={8}
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Space</label>
              <select className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors">
                <option>General</option>
                <option>Tech</option>
                <option>Gaming</option>
                <option>Music</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (optional)</label>
              <input
                type="text"
                placeholder="nextjs, react, typescript"
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
              />
              <p className="text-sm text-gray-400 mt-2">
                Separate tags with commas
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Create Thread
              </button>
              <Link
                href="/app"
                className="px-6 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors font-medium"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
