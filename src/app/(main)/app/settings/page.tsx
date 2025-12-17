import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { SettingsForm } from '@/components/settings/settings-form'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { grade: true },
  })

  if (!user) {
    redirect('/login')
  }

  const stats = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      _count: {
        select: { threads: true, posts: true, reactions: true }
      }
    }
  })

  return (
    <div className="h-full overflow-y-auto bg-asc-bg">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-asc-text mb-2">Settings</h1>
          <p className="text-asc-secondary">Manage your account settings and preferences</p>
        </div>

        <SettingsForm user={user} stats={stats?._count} />
      </div>
    </div>
  )
}
