import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { canAdmin } from '@/lib/permissions'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
  const session = await getServerSession(authOptions)

  if (!session || !canAdmin(session.user.role as any)) {
    redirect('/app')
  }

  const reports = await prisma.report.findMany({
    include: {
      user: { include: { grade: true } },
      post: {
        include: {
          author: { include: { grade: true } },
          thread: true,
        }
      },
      thread: {
        include: {
          author: { include: { grade: true } },
          channel: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  const statusCounts = {
    PENDING: reports.filter(r => r.status === 'PENDING').length,
    REVIEWED: reports.filter(r => r.status === 'REVIEWED').length,
    RESOLVED: reports.filter(r => r.status === 'RESOLVED').length,
    DISMISSED: reports.filter(r => r.status === 'DISMISSED').length,
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock size={16} className="text-yellow-400" />
      case 'REVIEWED': return <AlertTriangle size={16} className="text-blue-400" />
      case 'RESOLVED': return <CheckCircle size={16} className="text-green-400" />
      case 'DISMISSED': return <XCircle size={16} className="text-gray-400" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'REVIEWED': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'RESOLVED': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'DISMISSED': return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      default: return ''
    }
  }

  return (
    <div className="h-full flex flex-col bg-asc-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-asc-bg/80 backdrop-blur-lg border-b border-asc-border">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-asc-text mb-2">Reports</h1>
          <div className="flex gap-4">
            <div className="text-sm">
              <span className="text-asc-muted">Pending: </span>
              <span className="text-yellow-400 font-semibold">{statusCounts.PENDING}</span>
            </div>
            <div className="text-sm">
              <span className="text-asc-muted">Reviewed: </span>
              <span className="text-blue-400 font-semibold">{statusCounts.REVIEWED}</span>
            </div>
            <div className="text-sm">
              <span className="text-asc-muted">Resolved: </span>
              <span className="text-green-400 font-semibold">{statusCounts.RESOLVED}</span>
            </div>
            <div className="text-sm">
              <span className="text-asc-muted">Dismissed: </span>
              <span className="text-gray-400 font-semibold">{statusCounts.DISMISSED}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-4">
          {reports.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-asc-muted">No reports yet</p>
            </div>
          ) : (
            reports.map((report) => (
              <article 
                key={report.id} 
                className="bg-asc-surface border border-asc-border rounded-asc-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Link href={`/app/u/${report.user.username}`}>
                      <Avatar src={report.user.image} alt={report.user.username} size="sm" />
                    </Link>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/app/u/${report.user.username}`}
                          className="font-medium text-asc-text hover:underline"
                        >
                          {report.user.username}
                        </Link>
                        {report.user.grade && (
                          <Badge 
                            size="sm"
                            style={{ 
                              backgroundColor: report.user.grade.color + '20', 
                              color: report.user.grade.color 
                            }}
                          >
                            {report.user.grade.name}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-asc-muted">
                        {formatDate(report.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      {report.status}
                    </span>
                  </div>
                </div>

                {/* Reason */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-asc-text mb-1">Reason:</h3>
                  <p className="text-sm text-asc-secondary">{report.reason}</p>
                </div>

                {/* Reported content */}
                <div className="bg-asc-bg border border-asc-border rounded-asc p-4">
                  {report.thread && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-asc-muted">THREAD</span>
                        <Link 
                          href={`/app/thread/${report.thread.id}`}
                          className="text-sm text-asc-text hover:underline font-medium"
                        >
                          {report.thread.title}
                        </Link>
                      </div>
                      <p className="text-sm text-asc-secondary line-clamp-2">
                        {report.thread.content}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Avatar 
                          src={report.thread.author.image} 
                          alt={report.thread.author.username} 
                          size="xs" 
                        />
                        <span className="text-xs text-asc-muted">
                          by {report.thread.author.username}
                        </span>
                      </div>
                    </div>
                  )}

                  {report.post && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-asc-muted">POST</span>
                        <Link 
                          href={`/app/thread/${report.post.thread.id}`}
                          className="text-sm text-asc-text hover:underline"
                        >
                          in {report.post.thread.title}
                        </Link>
                      </div>
                      <p className="text-sm text-asc-secondary line-clamp-2">
                        {report.post.content}
                      </p>
                      
