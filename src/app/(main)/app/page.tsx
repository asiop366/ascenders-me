import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function AppPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // Get the first space to redirect to
  const firstSpace = await prisma.space.findFirst({
    orderBy: { position: 'asc' },
    include: {
      channels: {
        orderBy: { position: 'asc' },
        take: 1,
      },
    },
  })

  if (firstSpace && firstSpace.channels[0]) {
    redirect(`/app/${firstSpace.slug}/${firstSpace.channels[0].slug}`)
  }

  // If no spaces exist, show welcome page
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Ascenders
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Your community platform is being set up. Please contact an administrator to create spaces and channels.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/settings"
            className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Settings
          </a>
          <a
            href="/api/auth/signout"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-700"
          >
            Sign Out
          </a>
        </div>
      </div>
    </div>
  )
}
