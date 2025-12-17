import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function AdminGradesPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/app')
  }

  const grades = await prisma.grade.findMany({
    include: {
      _count: {
        select: { users: true },
      },
    },
    orderBy: { position: 'asc' },
  })

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Manage Grades</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grades.map((grade) => (
            <div
              key={grade.id}
              className="bg-dark-surface border border-dark-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${grade.color}20`, color: grade.color }}
                >
                  {grade.name}
                </span>
                {grade.icon && <span className="text-2xl">{grade.icon}</span>}
              </div>
              
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-dark-muted">Price:</span>{' '}
                  <span className="text-dark-text font-medium">
                    {grade.priceMonthly === 0 ? 'Free' : `$${grade.priceMonthly}/mo`}
                  </span>
                </p>
                <p>
                  <span className="text-dark-muted">Users:</span>{' '}
                  <span className="text-dark-text font-medium">{grade._count.users}</span>
                </p>
                <p>
                  <span className="text-dark-muted">Position:</span>{' '}
                  <span className="text-dark-text font-medium">{grade.position}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

