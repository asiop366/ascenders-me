'use client'

import { useEffect, useState } from 'react'
import {
  Users,
  MessageSquare,
  FileText,
  Mail,
  TrendingUp,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react'

interface Stats {
  totalUsers: number
  verifiedUsers: number
  unverifiedUsers: number
  totalThreads: number
  totalPosts: number
  totalMessages: number
  recentUsers: number
  userGrowth: Array<{ date: Date; count: number }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-dark-800 rounded-xl w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-dark-800 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      icon: Users,
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      subtitle: `${stats?.verifiedUsers || 0} verified`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: FileText,
      label: 'Total Threads',
      value: stats?.totalThreads || 0,
      subtitle: 'All discussions',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: MessageSquare,
      label: 'Total Posts',
      value: stats?.totalPosts || 0,
      subtitle: 'Community replies',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Mail,
      label: 'Total Messages',
      value: stats?.totalMessages || 0,
      subtitle: 'Private messages',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
        <p className="text-dark-300">Overview of your community</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                <card.icon className={card.color} size={24} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{card.value.toLocaleString()}</div>
            <div className="text-sm text-dark-300">{card.label}</div>
            <div className="text-xs text-dark-400 mt-1">{card.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="text-primary" size={24} />
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div>
                <div className="text-white font-medium">New Users (Last 7 Days)</div>
                <div className="text-sm text-dark-400">Recent registrations</div>
              </div>
              <div className="text-2xl font-bold text-primary">
                {stats?.recentUsers || 0}
              </div>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div>
                <div className="text-white font-medium flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Verified Users
                </div>
                <div className="text-sm text-dark-400">Email verified accounts</div>
              </div>
              <div className="text-2xl font-bold text-green-500">
                {stats?.verifiedUsers || 0}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium flex items-center gap-2">
                  <XCircle size={16} className="text-orange-500" />
                  Unverified Users
                </div>
                <div className="text-sm text-dark-400">Pending verification</div>
              </div>
              <div className="text-2xl font-bold text-orange-500">
                {stats?.unverifiedUsers || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Growth Chart Placeholder */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="text-primary" size={24} />
            User Growth
          </h2>
          <div className="h-64 flex items-center justify-center text-dark-400">
            <div className="text-center">
              <TrendingUp size={48} className="mx-auto mb-2 opacity-20" />
              <p>Growth chart visualization</p>
              <p className="text-sm mt-1">Last 30 days: {stats?.userGrowth?.length || 0} days tracked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
