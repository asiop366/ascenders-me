'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle, AlertTriangle, Clock, Loader2, Trash2 } from 'lucide-react'
import { toast } from '@/components/ui/toast'

interface ReportCardProps {
    report: any
    onUpdate: () => void
}

export function ReportCard({ report, onUpdate }: ReportCardProps) {
    const [isUpdating, setIsUpdating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const updateStatus = async (status: string) => {
        setIsUpdating(true)
        try {
            const res = await fetch(`/api/admin/reports/${report.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            })

            if (res.ok) {
                toast.success(`Report marked as ${status.toLowerCase()}`)
                onUpdate()
            } else {
                throw new Error('Failed to update report')
            }
        } catch (error) {
            toast.error('Failed to update report')
        } finally {
            setIsUpdating(false)
        }
    }

    const deleteContent = async () => {
        if (!confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
            return
        }

        setIsDeleting(true)
        try {
            const res = await fetch(`/api/admin/reports/${report.id}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                toast.success('Content deleted successfully')
                onUpdate()
            } else {
                throw new Error('Failed to delete content')
            }
        } catch (error) {
            toast.error('Failed to delete content')
        } finally {
            setIsDeleting(false)
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING': return <Clock size={16} className="text-yellow-400" />
            case 'REVIEWED': return <AlertTriangle size={16} className="text-blue-400" />
            case 'RESOLVED': return <CheckCircle size={16} className="text-green-400" />
            case 'DISMISSED': return <XCircle size={16} className="text-gray-400" />
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
        <div className="glass rounded-xl p-6 hover:bg-white/[0.02] transition-all border border-white/5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-white">
                        {report.user.username[0].toUpperCase()}
                    </div>
                    <div>
                        <Link href={`/app/u/${report.user.username}`} className="font-medium text-white hover:text-primary transition-colors">
                            {report.user.username}
                        </Link>
                        <p className="text-xs text-dark-400">
                            {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    {report.status}
                </span>
            </div>

            {/* Reason */}
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-white mb-1">Reason:</h4>
                <p className="text-sm text-dark-300">{report.reason}</p>
            </div>

            {/* Reported Content */}
            <div className="bg-dark-800 border border-white/5 rounded-lg p-4 mb-4">
                {report.thread && (
                    <div>
                        <span className="text-xs font-semibold text-primary mb-2 block">THREAD</span>
                        <Link href={`/app/thread/${report.thread.id}`} className="text-sm text-white hover:text-primary transition-colors font-medium line-clamp-1">
                            {report.thread.title}
                        </Link>
                        <p className="text-sm text-dark-300 line-clamp-2 mt-1">{report.thread.content}</p>
                    </div>
                )}

                {report.post && (
                    <div>
                        <span className="text-xs font-semibold text-primary mb-2 block">POST</span>
                        <p className="text-sm text-dark-300 line-clamp-2">{report.post.content}</p>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
                {report.status === 'PENDING' && (
                    <>
                        <button
                            onClick={() => updateStatus('REVIEWED')}
                            disabled={isUpdating}
                            className="btn-secondary text-sm flex items-center gap-2"
                        >
                            {isUpdating ? <Loader2 className="animate-spin" size={14} /> : <AlertTriangle size={14} />}
                            Mark as Reviewed
                        </button>
                        <button
                            onClick={() => updateStatus('RESOLVED')}
                            disabled={isUpdating}
                            className="px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-sm font-medium transition-all flex items-center gap-2"
                        >
                            {isUpdating ? <Loader2 className="animate-spin" size={14} /> : <CheckCircle size={14} />}
                            Resolve
                        </button>
                        <button
                            onClick={() => updateStatus('DISMISSED')}
                            disabled={isUpdating}
                            className="px-3 py-1.5 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 border border-gray-500/20 text-gray-400 text-sm font-medium transition-all flex items-center gap-2"
                        >
                            {isUpdating ? <Loader2 className="animate-spin" size={14} /> : <XCircle size={14} />}
                            Dismiss
                        </button>
                    </>
                )}

                {report.status === 'REVIEWED' && (
                    <>
                        <button
                            onClick={() => updateStatus('RESOLVED')}
                            disabled={isUpdating}
                            className="px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-sm font-medium transition-all flex items-center gap-2"
                        >
                            {isUpdating ? <Loader2 className="animate-spin" size={14} /> : <CheckCircle size={14} />}
                            Resolve
                        </button>
                        <button
                            onClick={() => updateStatus('DISMISSED')}
                            disabled={isUpdating}
                            className="px-3 py-1.5 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 border border-gray-500/20 text-gray-400 text-sm font-medium transition-all flex items-center gap-2"
                        >
                            {isUpdating ? <Loader2 className="animate-spin" size={14} /> : <XCircle size={14} />}
                            Dismiss
                        </button>
                    </>
                )}

                {(report.status === 'RESOLVED' || report.status === 'DISMISSED') && (
                    <button
                        onClick={() => updateStatus('PENDING')}
                        disabled={isUpdating}
                        className="btn-secondary text-sm flex items-center gap-2"
                    >
                        {isUpdating ? <Loader2 className="animate-spin" size={14} /> : <Clock size={14} />}
                        Reopen
                    </button>
                )}

                <button
                    onClick={deleteContent}
                    disabled={isDeleting}
                    className="ml-auto px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-medium transition-all flex items-center gap-2"
                >
                    {isDeleting ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
                    Delete Content
                </button>
            </div>
        </div>
    )
}
