import { prisma } from "@/lib/prisma";
import { Users, Layers, MessageSquare, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [totalUsers, totalThreads, totalPosts, totalTopics] = await Promise.all([
    prisma.user.count(),
    prisma.thread.count(),
    prisma.post.count(),
    prisma.topic.count(),
  ]);

  const recentActivity = await prisma.thread.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { username: true } } }
  });

  const stats = [
    { label: "Total Users", value: totalUsers.toString(), icon: Users, change: "+0%" },
    { label: "Topics", value: totalTopics.toString(), icon: Layers, change: "+0%" },
    { label: "Threads", value: totalThreads.toString(), icon: MessageSquare, change: "+0%" },
    { label: "Total Posts", value: totalPosts.toString(), icon: TrendingUp, change: "+0%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Dashboard Overview</h2>
        <p className="text-dark-400">Monitor your platform's performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 bg-dark-900 border border-white/5 rounded-2xl shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-primary" />
                <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold mb-1 text-white">{stat.value}</div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-dark-900 border border-white/5 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-4 text-white">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity: any, i: number) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div>
                <span className="font-medium text-white">{activity.author.username}</span>
                <span className="text-dark-400"> created a new thread: </span>
                <span className="text-primary hover:underline cursor-pointer">{activity.title}</span>
              </div>
              <span className="text-sm text-dark-500">{formatDate(activity.createdAt)}</span>
            </div>
          ))}
          {recentActivity.length === 0 && (
            <p className="text-dark-500 italic">No recent activity found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
