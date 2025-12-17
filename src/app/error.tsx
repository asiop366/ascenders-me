'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-asc-bg flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={32} className="text-red-400" />
        </div>

        {/* Error message */}
        <h1 className="text-2xl font-bold text-asc-text mb-3">
          Something went wrong
        </h1>
        <p className="text-asc-secondary mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>

        {/* Debug info */}
        {error.digest && (
          <div className="mb-6 p-3 bg-asc-surface border border-asc-border rounded-asc">
            <p className="text-xs text-asc-muted font-mono">
              Error ID: {error.digest}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Try again
          </button>
          <Link href="/" className="btn-secondary flex items-center justify-center gap-2">
            <Home size={18} />
            Go home
          </Link>
        </div>

        {/* Additional help */}
        <p className="text-xs text-asc-muted mt-6">
          If the problem persists, please contact support
        </p>
      </div>
    </div>
  )
}
