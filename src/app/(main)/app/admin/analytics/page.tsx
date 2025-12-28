import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function AdminAnalyticsPage() {
  const [totalUsers, newUsers24h, totalInteractions, topTopics] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      }
    }),
    prisma.post.count(),
    prisma.topic.findMany({
      take: 5,
      include: {
        _count: {
          select: { threads: true }
        }
      },
      orderBy: {
        threads: {
          _count: 'desc'
        }
      }
    })
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Analytics</h2>
        <p className="text-dark-400">Platform performance metrics and insights</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-dark-900 border border-white/5 rounded-2xl shadow-xl">
          <div className="text-sm text-dark-400 mb-2">Total Users</div>
          <div className="text-3xl font-bold text-white">{totalUsers}</div>
          <div className="text-sm text-green-500 mt-2">All-time</div>
        </div>
        <div className="p-6 bg-dark-900 border border-white/5 rounded-2xl shadow-xl">
          <div className="text-sm text-dark-400 mb-2">New Signups (24h)</div>
          <div className="text-3xl font-bold text-white">{newUsers24h}</div>
          <div className="text-sm text-green-500 mt-2">Last 24 hours</div>
        </div>
        <div className="p-6 bg-dark-900 border border-white/5 rounded-2xl shadow-xl">
          <div className="text-sm text-dark-400 mb-2">Total Posts</div>
          <div className="text-3xl font-bold text-white">{totalInteractions}</div>
          <div className="text-sm text-primary mt-2">Engagement metric</div>
        </div>
      </div>

      {/* Topics Activity */}
      <div className="bg-dark-900 border border-white/5 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-4 text-white">Top Topics by Threads</h3>
        <div className="space-y-3">
          {topTopics.map((topic: any) => (
            <div key={topic.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="font-medium text-white">{topic.name}</span>
              <span className="text-dark-400">{topic._count.threads} threads</span>
            </div>
          ))}
          {topTopics.length === 0 && (
            <p className="text-dark-500 italic">No activity data yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
