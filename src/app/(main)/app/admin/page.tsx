// app/admin/page.tsx
import { Metadata } from "next";
import { Users, Layers, MessageSquare, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard | Ascenders",
};

export default function AdminPage() {
  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { label: "Active Spaces", value: "56", icon: Layers, change: "+8%" },
    { label: "Total Threads", value: "3,456", icon: MessageSquare, change: "+23%" },
    { label: "Growth Rate", value: "18%", icon: TrendingUp, change: "+5%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-gray-400">Monitor your platform's performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-gray-400" />
                <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { user: "john_doe", action: "created a new space", time: "2 minutes ago" },
            { user: "jane_smith", action: "upgraded to Silver tier", time: "15 minutes ago" },
            { user: "mike_wilson", action: "posted a new thread", time: "1 hour ago" },
            { user: "sarah_jones", action: "joined the platform", time: "2 hours ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
              <div>
                <span className="font-medium">{activity.user}</span>
                <span className="text-gray-400"> {activity.action}</span>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
