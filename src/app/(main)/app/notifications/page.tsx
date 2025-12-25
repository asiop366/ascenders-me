import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { NotificationHeader } from './notification-header'
import { NotificationList } from './notification-list'

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 50,
  })

  return (
    <div className="h-full overflow-y-auto bg-dark-950">
      <div className="max-w-3xl mx-auto p-6 lg:p-12">
        <NotificationHeader
          unreadCount={notifications.filter(n => !n.read).length}
        />

        <NotificationList
          initialNotifications={notifications.map(n => ({
            ...n,
            createdAt: n.createdAt.toISOString() // Serialize for client component
          }))}
          userId={session.user.id}
        />
      </div>
    </div>
  )
}
