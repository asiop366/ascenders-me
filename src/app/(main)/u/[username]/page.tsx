import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default async function UserProfilePage({
  params,
}: {
  params: { username: string }
}) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: { grade: true },
  })

  if (!user) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-dark-surface border border-dark-border rounded-xl p-8">
          <div className="flex items-start gap-6">
            <Avatar src={user.image} alt={user.username} size="xl" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{user.username}</h1>
                {user.grade && (
                  <Badge style={{ backgroundColor: user.grade.color }}>
                    {user.grade.name}
                  </Badge>
                )}
              </div>
              {user.bio && <p className="text-dark-muted">{user.bio}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

