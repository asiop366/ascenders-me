import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function AdminReportsPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MODERATOR')) {
    redirect('/app')
  }

  const reports = await prisma.report.findMany({
    include: {
      reporter: { include: { grade: true } },
      post: {
        include: {
          author: { include: { grade: true } },
          thread: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Reports</h1>
        
        {reports.length === 0 ? (
          <div className="bg-dark-surface border border-dark-border rounded-xl p-8 text-center">
            <p className="text-dark-muted">No reports yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-dark-surface border border-dark-border rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      report.status === 'PENDING' ? 'bg-accent-warning/20 text-accent-warning' :
                      report.status === 'RESOLVED' ? 'bg-accent-success/20 text-accent-success' :
                      'bg-dark-muted/20 text-dark-muted'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <span className="text-sm text-dark-muted">
                    {new Date(report.createdAt).toLocaleString()}
                  </span>
                </div>
                
                <p className="text-dark-muted mb-4">{report.reason}</p>
                
                <div className="text-sm">
                  <p>
                    <span className="text-dark-muted">Reported by:</span>{' '}
                    <span className="text-dark-text">{report.reporter.username}</span>
                  </p>
                  <p>
                    <span className="text-dark-muted">Post author:</span>{' '}
                    <span className="text-dark-text">{report.post.author.username}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

