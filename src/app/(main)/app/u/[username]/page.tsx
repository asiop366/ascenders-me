// app/u/[username]/page.tsx
import { Metadata } from "next";
import { Calendar, MapPin, Link as LinkIcon } from "lucide-react";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `@${params.username} | Ascenders`,
  };
}

export default function UserProfilePage({ params }: Props) {
  // TODO: Fetch user data from database
  const user = {
    username: params.username,
    displayName: params.username.charAt(0).toUpperCase() + params.username.slice(1),
    bio: "Building cool things on the internet",
    tier: "Gold",
    joinedDate: "January 2024",
    location: "San Francisco, CA",
    website: "https://example.com",
    stats: {
      threads: 42,
      replies: 156,
      followers: 89,
      following: 34,
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 mb-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold flex-shrink-0">
              {user.displayName.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{user.displayName}</h1>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium">
                  {user.tier}
                </span>
              </div>
              <div className="text-gray-400 mb-4">@{user.username}</div>
              <p className="text-gray-300 mb-4">{user.bio}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joined {user.joinedDate}
                </div>
                {user.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {user.location}
                  </div>
                )}
                {user.website && (
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                    <LinkIcon className="w-4 h-4" />
                    {user.website.replace('https://', '')}
                  </a>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
                Follow
              </button>
              <button className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
                Message
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-zinc-800">
            <div className="text-center">
              <div className="text-2xl font-bold">{user.stats.threads}</div>
              <div className="text-sm text-gray-400">Threads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{user.stats.replies}</div>
              <div className="text-sm text-gray-400">Replies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{user.stats.followers}</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{user.stats.following}</div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="text-center py-12 text-gray-400">
            No recent activity to display
          </div>
        </div>
      </div>
    </div>
  );
}
