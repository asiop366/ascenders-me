import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ProfileContent } from './profile-content'

interface PageProps {
  params: {
    username: string
  }
}

export default async function UserProfilePage({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      grade: true,
      threads: {
        take: 10,
        orderBy: { createdAt: 'desc' },
      },
      badges: {
        include: {
          badge: true,
        },
      },
      followers: {
        include: {
          follower: {
            select: { id: true, username: true, image: true },
          },
        },
      },
      following: {
        include: {
          following: {
            select: { id: true, username: true, image: true },
          },
        },
      },
      _count: {
        select: {
          threads: true,
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  })

  if (!user) {
    notFound()
  }

  const isOwnProfile = session?.user?.id === user.id

  const isFollowing = session?.user?.id
    ? await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: user.id,
        },
      },
    })
    : null

  return (
    <ProfileContent
      user={JSON.parse(JSON.stringify(user))}
      isOwnProfile={isOwnProfile}
      isFollowing={isFollowing}
      session={session}
    />
  )
}
