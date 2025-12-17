// app/admin/analytics/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics | Admin | Ascenders",
};

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Analytics</h2>
        <p className="text-gray-400">Platform performance metrics and insights</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <div className="text-sm text-gray-400 mb-2">Daily Active Users</div>
          <div className="text-3xl font-bold">847</div>
          <div className="text-sm text-green-500 mt-2">+12% from yesterday</div>
        </div>
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <div className="text-sm text-gray-400 mb-2">New Signups (24h)</div>
          <div className="text-3xl font-bold">23</div>
          <div className="text-sm text-green-500 mt-2">+8% from yesterday</div>
        </div>
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <div className="text-sm text-gray-400 mb-2">Avg. Session Time</div>
          <div className="text-3xl font-bold">18m</div>
          <div className="text-sm text-red-500 mt-2">-3% from yesterday</div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">User Growth</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Chart visualization coming soon
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Top Spaces by Activity</h3>
        <div className="space-y-3">
          {[
            { name: "General Discussion", activity: 234 },
            { name: "Tech Talk", activity: 189 },
            { name: "Gaming", activity: 156 },
            { name: "Music", activity: 98 },
          ].map((space, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <span className="font-medium">{space.name}</span>
              <span className="text-gray-400">{space.activity} interactions</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
