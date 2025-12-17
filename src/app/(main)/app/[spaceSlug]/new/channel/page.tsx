// app/app/[spaceSlug]/new/channel/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: { spaceSlug: string };
};

export const metadata: Metadata = {
  title: "Create New Channel | Ascenders",
};

export default function NewChannelPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link 
          href={`/app/${params.spaceSlug}`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {params.spaceSlug}
        </Link>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Create New Channel</h1>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Channel Name</label>
              <input
                type="text"
                placeholder="general"
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
              />
              <p className="text-sm text-gray-400 mt-2">
                Channel names must be lowercase with no spaces
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                placeholder="What is this channel about?"
                rows={4}
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors resize-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <div>
                  <div className="font-medium">Private Channel</div>
                  <div className="text-sm text-gray-400">Only invited members can access this channel</div>
                </div>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Create Channel
              </button>
              <Link
                href={`/app/${params.spaceSlug}`}
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
