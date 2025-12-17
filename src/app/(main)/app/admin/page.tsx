import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  Shield, 
  Users, 
  MessageSquare, 
  Folder,
  Flag,
  TrendingUp,
  Settings,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Ban
} from 'lucide-react'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  // Check if user is admin or moderator
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MODERATOR')) {
    redirect('/app')
  }

  const isAdmin = session.user.role === 'ADMIN'

  // Fetch stats
  const [userCount, threadCount, postCount, spaceCount, reportCount] = await Promise.all([
    prisma.user.count(),
    prisma.thread.count(),
    prisma.post.count(),
    prisma.space.count(),
    prisma.report.count({ where: { status: 'PENDING' } }),
  ])

  // Recent reports
  const recentReports = await prisma.report.findMany({
    where: { status: 'PENDING' },
    include: {
      user: { select: { username: true } },
      post: { 
        select: {
          content: true,
          author: { select: { username: true } }
        }
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  // Recent users
  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    }
  })

  return (
    <div className="h-full overflow-y-auto bg-asc-bg">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-asc-text flex items-center gap-2">
              <Shield size={24} />
              {isAdmin ? 'Admin Panel' : 'Moderation Panel'}
            </h1>
            <p className="text-asc-muted mt-1">
              Manage your community
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard icon={Users} label="Users" value={userCount} />
          <StatCard icon={MessageSquare} label="Threads" value={threadCount} />
          <StatCard icon={Folder} label="Posts" value={postCount} />
          <StatCard 
            icon={Flag} 
            label="Pending Reports" 
            value={reportCount} 
            highlight={reportCount > 0}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/app/admin/users" className="card flex items-center gap-3 hover:border-asc-muted">
            <div className="w-10 h-10 bg-asc-surface2 rounded-asc flex items-center justify-center">
              <Users size={20} className="text-asc-muted" />
            </div>
            <div>
              <h3 className="font-medium text-asc-text">Manage Users</h3>
              <p className="text-xs text-asc-muted">View, edit, ban users</p>
            </div>
          </Link>

          {isAdmin && (
            <Link href="/app/admin/topics/new" className="card flex items-center gap-3 hover:border-asc-muted">
              <div className="w-10 h-10 bg-asc-surface2 rounded-asc flex items-center justify-center">
                <Plus size={20} className="text-asc-muted" />
              </div>
              <div>
                <h3 className="font-medium text-asc-text">Create Topic</h3>
                <p className="text-xs text-asc-muted">Add new space/channel</p>
              </div>
            </Link>
          )}

          <Link href="/app/admin/reports" className="card flex items-center gap-3 hover:border-asc-muted">
            <div className="w-10 h-10 bg-asc-surface2 rounded-asc flex items-center justify-center">
              <Flag size={20} className="text-asc-muted" />
            </div>
            <div>
              <h3 className="font-medium text-asc-text">Reports</h3>
              <p className="text-xs text-asc-muted">{reportCount} pending</p>
            </div>
          </Link>

          <Link href="/app/admin/logs" className="card flex items-center gap-3 hover:border-asc-muted">
            <div className="w-10 h-10 bg-asc-surface2 rounded-asc flex items-center justify-center">
              <Clock size={20} className="text-asc-muted" />
            </div>
            <div>
              <h3 className="font-medium text-asc-text">Mod Logs</h3>
              <p className="text-xs text-asc-muted">View activity</p>
            </div>
          </Link>
        </div>

        {/* Recent Reports */}
        <div className="bg-asc-surface border border-asc-border rounded-asc-lg p-4">
          <h2 className="font-semibold text-asc-text gap-2 mb-2">
            Pending Reports
          </h2>
          <div className="divide-y divide-asc-border">
            {recentReports.length === 0 ? (
              <div className="p-6 text-center">
                <CheckCircle size={24} className="text-green-500 mb-2 mx-auto" />
                <p className="text-sm text-asc-muted">No pending reports</p>
              </div>
            ) : (
              recentReports.map((report) => (
                <div key={report.id} className="p-4 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-asc-text line-clamp-2">
                      {report.post?.content || 'No content'}
                    </p>
                    <p className="text-xs text-asc-muted mt-1">
                      By @{report.post?.author?.username || 'unknown'} · Reported by @{report.user?.username || 'unknown'}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-green-500/20 rounded text-green-500" title="Dismiss">
                      <CheckCircle size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-red-500/20 rounded text-red-500" title="Remove">
                      <Ban size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-asc-surface border border-asc-border rounded-asc-lg p-4 mt-8">
          <h2 className="font-semibold text-asc-text gap-2 mb-2">
            Recent Users
          </h2>
          <div className="divide-y divide-asc-border">
            {recentUsers.map((user) => (
              <div key={user.id} className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-asc-text text-asc-bg rounded-full flex items-center justify-center font-semibold text-xs">
                  {user.username[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-asc-text">{user.username}</p>
                  <p className="text-xs text-asc-muted">{user.email}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-asc-surface2 rounded text-asc-muted">{user.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  highlight = false 
}: { 
  icon: any 
  label: string 
  value: number 
  highlight?: boolean 
}) {
  return (
    <div className={`bg-asc-surface border rounded-asc p-4 ${highlight ? 'border-red-500/50' : 'border-asc-border'}`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon size={18} className={highlight ? 'text-red-400' : 'text-asc-muted'} />
        <span className="text-sm text-asc-muted">{label}</span>
      </div>
      <p className={`text-2xl font-bold ${highlight ? 'text-red-400' : 'text-asc-text'}`}>
        {value.toLocaleString()}
      </p>
    </div>
  )
}
