// app/app/new/space/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Create New Space | Ascenders",
};

export default function NewSpacePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link 
          href="/app"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </Link>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Create New Space</h1>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Space Name</label>
              <input
                type="text"
                placeholder="My Awesome Space"
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL Slug</label>
              <input
                type="text"
                placeholder="my-awesome-space"
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
              />
              <p className="text-sm text-gray-400 mt-2">
                This will be your space's URL: ascenders.me/app/your-slug
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                placeholder="What is this space about?"
                rows={4}
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Visibility</label>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 bg-black border border-zinc-700 rounded-lg cursor-pointer hover:border-zinc-600 transition-colors">
                  <input type="radio" name="visibility" defaultChecked className="mt-1" />
                  <div>
                    <div className="font-medium">Public</div>
                    <div className="text-sm text-gray-400">Anyone can find and join this space</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 bg-black border border-zinc-700 rounded-lg cursor-pointer hover:border-zinc-600 transition-colors">
                  <input type="radio" name="visibility" className="mt-1" />
                  <div>
                    <div className="font-medium">Private</div>
                    <div className="text-sm text-gray-400">Only invited members can access</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Create Space
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
