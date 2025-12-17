// app/app/[spaceSlug]/[channelSlug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { Hash, Send } from "lucide-react";

type Props = {
  params: { 
    spaceSlug: string;
    channelSlug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `#${params.channelSlug} - ${params.spaceSlug} | Ascenders`,
  };
}

export default function ChannelPage({ params }: Props) {
  // TODO: Fetch channel data and messages from database
  const messages = [
    {
      id: 1,
      author: "john_doe",
      authorTier: "Gold",
      content: "Hey everyone! Welcome to the channel.",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      author: "jane_smith",
      authorTier: "Silver",
      content: "Thanks! Excited to be here.",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      author: "mike_wilson",
      authorTier: "Bronze",
      content: "This looks great! Can't wait to start contributing.",
      timestamp: "10:35 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Channel Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 px-6 py-4">
        <div className="flex items-center gap-3">
          <Hash className="w-6 h-6 text-gray-400" />
          <h1 className="text-xl font-bold">{params.channelSlug}</h1>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          <Link href={`/app/${params.spaceSlug}`} className="hover:underline">
            {params.spaceSlug}
          </Link>
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-4 hover:bg-zinc-900/30 p-3 rounded-lg transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold flex-shrink-0">
              {message.author.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Link href={`/u/${message.author}`} className="font-medium hover:underline">
                  {message.author}
                </Link>
                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded text-xs font-medium">
                  {message.authorTier}
                </span>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
              <p className="text-gray-300">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-zinc-800 bg-zinc-900/50 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder={`Message #${params.channelSlug}`}
            className="flex-1 px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
          />
          <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2">
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
