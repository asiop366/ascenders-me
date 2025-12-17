'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-asc-bg flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* 404 */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-asc-text mb-2">404</h1>
          <div className="w-24 h-1 bg-asc-border mx-auto" />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-asc-text mb-3">
          Page not found
        </h2>
        <p className="text-asc-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary flex items-center justify-center gap-2">
            <Home size={18} />
            Go home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Go back
          </button>
        </div>

        {/* Search suggestion */}
        <div className="mt-8 pt-8 border-t border-asc-border">
          <p className="text-sm text-asc-muted mb-3">Or try searching:</p>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-asc-muted" />
            <input
              type="text"
              placeholder="Search threads, topics..."
              className="input pl-11"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
