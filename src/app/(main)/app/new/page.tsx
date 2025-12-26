import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, X, Image, Link as LinkIcon, Bold, Italic, List } from 'lucide-react'
import { CreateThreadForm } from '@/components/thread/create-thread-form'

export default async function CreateThreadPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // Fetch categories and topics for selection
  const categories = await prisma.forumCategory.findMany({
    include: {
      topics: {
        orderBy: { position: 'asc' }
      }
    },
    orderBy: { position: 'asc' }
  })

  return (
    <div className="h-full flex flex-col bg-asc-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-asc-bg border-b border-asc-border">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/app"
              className="p-2 hover:bg-asc-hover rounded-asc transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-asc-secondary" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-asc-text">Create new thread</h1>
              <p className="text-sm text-asc-muted">Start a discussion with the community</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6">
          <CreateThreadForm categories={categories as any} userId={session.user.id} />
        </div>
      </div>
    </div>
  )
}
