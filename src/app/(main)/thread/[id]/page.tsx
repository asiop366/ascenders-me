// app/thread/[id]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Heart, Share2 } from "lucide-react";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Thread #${params.id} | Ascenders`,
  };
}

export default function ThreadPage({ params }: Props) {
  // TODO: Fetch thread data from database
  const thread = {
    id: params.id,
    title: "How to get started with Next.js?",
    author: "john_doe",
    authorTier: "Gold",
    content: "I'm new to Next.js and want to learn the best practices. What resources do you recommend?",
    createdAt: "2 hours ago",
    likes: 12,
    replies: 5,
  };

  const replies = [
    {
      id: 1,
      author: "jane_smith",
      authorTier: "Silver",
      content: "The official Next.js documentation is great! Start with the tutorial.",
      createdAt: "1 hour ago",
      likes: 5,
    },
    {
      id: 2,
      author: "mike_wilson",
      authorTier: "Bronze",
      content: "I also recommend checking out Vercel's YouTube channel for video tutorials.",
      createdAt: "45 minutes ago",
      likes: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/app" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Feed
        </Link>

        {/* Thread Content */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 mb-6">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold">
              {thread.author.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link href={`/u/${thread.author}`} className="font-medium hover:underline">
                  {thread.author}
                </Link>
                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded text-xs font-medium">
                  {thread.authorTier}
                </span>
              </div>
              <div className="text-sm text-gray-400">{thread.createdAt}</div>
            </div>
          </div>

          {/* Thread Title & Content */}
          <h1 className="text-2xl font-bold mb-4">{thread.title}</h1>
          <p className="text-gray-300 mb-6">{thread.content}</p>

          {/* Actions */}
          <div className="flex items-center gap-6 pt-4 border-t border-zinc-800">
            <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
              <span>{thread.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span>{thread.replies}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Reply Form */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-4">Add a reply</h3>
          <textarea
            placeholder="Write your reply..."
            rows={4}
            className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors resize-none mb-4"
          />
          <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
            Post Reply
          </button>
        </div>

        {/* Replies */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">{replies.length} Replies</h3>
          {replies.map((reply) => (
            <div key={reply.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold">
                  {reply.author.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link href={`/u/${reply.author}`} className="font-medium hover:underline">
                      {reply.author}
                    </Link>
                    <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded text-xs font-medium">
                      {reply.authorTier}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">{reply.createdAt}</div>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{reply.content}</p>
              <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm">
                <Heart className="w-4 h-4" />
                <span>{reply.likes}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
