'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { ReportCard } from '@/components/admin/report-card'

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  const loadReports = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/reports')
      if (res.ok) {
        const data = await res.json()
        setReports(data)
      }
    } catch (error) {
      console.error('Failed to load reports:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadReports()
  }, [])

  const filteredReports = filter === 'ALL'
    ? reports
    : reports.filter(r => r.status === filter)

  const statusCounts = {
    ALL: reports.length,
    PENDING: reports.filter(r => r.status === 'PENDING').length,
    REVIEWED: reports.filter(r => r.status === 'REVIEWED').length,
    RESOLVED: reports.filter(r => r.status === 'RESOLVED').length,
    DISMISSED: reports.filter(r => r.status === 'DISMISSED').length,
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-2">
          <AlertTriangle className="text-primary" size={32} />
          Report Management
        </h1>
        <p className="text-dark-300">Review and moderate user-reported content</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === status
                ? 'bg-primary text-white shadow-glow'
                : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white'
              }`}
          >
            {status} ({count})
          </button>
        ))}
      </div>

      {/* Reports */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="text-center py-16">
          <AlertTriangle size={64} className="mx-auto mb-4 text-dark-600 opacity-20" />
          <p className="text-dark-400">No reports found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} onUpdate={loadReports} />
          ))}
        </div>
      )}
    </div>
  )
}
