import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-asc-bg flex flex-col">
      {/* Header */}
      <div className="border-b border-asc-border bg-asc-surface px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-asc-text">
          WELCOME TO ASCENDERS
        </h1>
        
        <Link
          href="/app/new-thread"
          className="inline-flex items-center gap-2 px-6 py-3 bg-asc-text text-asc-bg rounded-lg font-semibold hover:bg-white transition-all"
        >
          <Plus size={20} />
          CREATE NEW THREAD
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Feed will go here */}
          <div className="space-y-4">
            <div className="text-center py-20 text-asc-muted">
              <p className="text-lg">No threads yet. Be the first to create one!</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="border-t border-asc-border bg-asc-surface px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xl">
            {session?.user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <div className="font-semibold text-asc-text">
              {session?.user?.username || 'Guest'}
            </div>
            <div className="text-sm text-asc-muted">
              {session?.user?.email || 'Not signed in'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
