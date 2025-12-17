// app/app/[spaceSlug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { Hash, Plus } from "lucide-react";

type Props = {
  params: { spaceSlug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.spaceSlug} | Ascenders`,
  };
}

export default function SpacePage({ params }: Props) {
  // TODO: Fetch space data from database
  const space = {
    name: params.spaceSlug.charAt(0).toUpperCase() + params.spaceSlug.slice(1),
    slug: params.spaceSlug,
    description: "A space for discussing everything",
    memberCount: 234,
  };

  const channels = [
    { name: "general", slug: "general", unread: 3 },
    { name: "announcements", slug: "announcements", unread: 0 },
    { name: "random", slug: "random", unread: 12 },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Space Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{space.name}</h1>
          <p className="text-gray-400">{space.description}</p>
          <div className="text-sm text-gray-500 mt-2">{space.memberCount} members</div>
        </div>

        {/* Channels List */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Channels</h2>
            <Link
              href={`/app/${params.spaceSlug}/new/channel`}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              New Channel
            </Link>
          </div>

          <div className="space-y-2">
            {channels.map((channel) => (
              <Link
                key={channel.slug}
                href={`/app/${params.spaceSlug}/${channel.slug}`}
                className="flex items-center justify-between p-4 bg-black border border-zinc-700 rounded-lg hover:border-zinc-600 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="font-medium group-hover:text-white transition-colors">{channel.name}</span>
                </div>
                {channel.unread > 0 && (
                  <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
                    {channel
