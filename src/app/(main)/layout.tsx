import { ReactNode } from 'react'
import { Sidebar } from '@/components/sidebar'
import { MobileSidebarToggle } from '@/components/mobile-sidebar-toggle'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function MainLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  const [topTopics, unreadCount] = await Promise.all([
    prisma.topic.findMany({
      select: {
        name: true,
        slug: true,
        color: true,
        _count: {
          select: { threads: true }
        }
      },
      take: 8,
      orderBy: {
        threads: { _count: 'desc' }
      }
    }),
    session?.user ? prisma.notification.count({
      where: {
        userId: session.user.id,
        read: false
      }
    }) : Promise.resolve(0)
  ])

  const formattedTopics = topTopics.map((t: any) => ({
    name: t.name,
    slug: t.slug,
    count: t._count.threads,
    color: t.color || undefined
  }))

  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar
          topTopics={formattedTopics}
          unreadCount={unreadCount}
        />
      </div>

      {/* Sidebar - Mobile Toggle */}
      <div className="lg:hidden">
        <MobileSidebarToggle
          topTopics={formattedTopics}
          unreadCount={unreadCount}
        />
      </div>

      <main className="flex-1 lg:ml-72 transition-all duration-300 pt-16 lg:pt-0">
        <div id="google_translate_element" className="fixed top-4 right-4 z-[100] scale-90 origin-top-right opacity-80 hover:opacity-100 transition-opacity" />
        {children}
      </main>
    </div>
  )
}
