'use client'

import { useState } from 'react'
import { X, Flag, Loader2, AlertCircle, Check } from 'lucide-react'

interface ReportModalProps {
    isOpen: boolean
    onClose: () => void
    threadId?: string
    postId?: string
    contentType: 'thread' | 'post'
}

const REPORT_REASONS = [
    { id: 'spam', label: 'Spam or advertising' },
    { id: 'harassment', label: 'Harassment or bullying' },
    { id: 'hate', label: 'Hate speech or discrimination' },
    { id: 'inappropriate', label: 'Inappropriate content' },
    { id: 'misinformation', label: 'Misinformation or fake content' },
    { id: 'other', label: 'Other' },
]

export function ReportModal({ isOpen, onClose, threadId, postId, contentType }: ReportModalProps) {
    const [selectedReason, setSelectedReason] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!selectedReason) {
            setError('Please select a reason for your report')
            return
        }

        setIsSubmitting(true)

        try {
            const res = await fetch('/api/reports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    threadId,
                    postId,
                    reason: `${REPORT_REASONS.find(r => r.id === selectedReason)?.label}${additionalInfo ? `: ${additionalInfo}` : ''}`,
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to submit report')
            }

            setSuccess(true)
            setTimeout(() => {
                onClose()
                setSuccess(false)
                setSelectedReason('')
                setAdditionalInfo('')
            }, 2000)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-dark-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <div className="flex items-center gap-2 text-white">
                        <Flag size={20} className="text-red-400" />
                        <h2 className="text-lg font-semibold">Report {contentType}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-dark-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-4">
                    {success ? (
                        <div className="py-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                                <Check size={32} className="text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Report Submitted</h3>
                            <p className="text-dark-400">Thank you for helping keep our community safe.</p>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-sm">
                                    <AlertCircle size={16} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <p className="text-dark-300 text-sm mb-4">
                                Please select the reason for reporting this content:
                            </p>

                            <div className="space-y-2 mb-4">
                                {REPORT_REASONS.map((reason) => (
                                    <label
                                        key={reason.id}
                                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedReason === reason.id
                                                ? 'border-primary bg-primary/10'
                                                : 'border-white/5 hover:border-white/10 hover:bg-white/5'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="reason"
                                            value={reason.id}
                                            checked={selectedReason === reason.id}
                                            onChange={(e) => setSelectedReason(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedReason === reason.id ? 'border-primary' : 'border-dark-500'
                                            }`}>
                                            {selectedReason === reason.id && (
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                            )}
                                        </div>
                                        <span className={selectedReason === reason.id ? 'text-white' : 'text-dark-300'}>
                                            {reason.label}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-dark-300 mb-2">
                                    Additional details (optional)
                                </label>
                                <textarea
                                    value={additionalInfo}
                                    onChange={(e) => setAdditionalInfo(e.target.value)}
                                    rows={3}
                                    maxLength={500}
                                    placeholder="Add any additional context..."
                                    className="w-full bg-dark-800/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none text-sm"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-3 bg-dark-800 hover:bg-dark-700 rounded-xl text-white font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !selectedReason}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-colors"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Flag size={18} />
                                            Submit Report
                                        </>
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </>
    )
}
