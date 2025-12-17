import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

export default async function PricingPage() {
  const session = await getServerSession(authOptions)

  const grades = await prisma.grade.findMany({
    orderBy: { position: 'asc' },
  })

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Grade</h1>
          <p className="text-dark-muted text-lg">
            Unlock exclusive features and channels
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grades.map((grade) => (
            <div
              key={grade.id}
              className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-accent-primary/50 transition-all"
            >
              <div className="mb-4">
                <Badge style={{ backgroundColor: grade.color }}>
                  {grade.name}
                </Badge>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {grade.priceMonthly === 0 ? 'Free' : `$${grade.priceMonthly}`}
                </span>
                {grade.priceMonthly > 0 && (
                  <span className="text-dark-muted">/month</span>
                )}
              </div>

              <Button variant="primary" fullWidth>
                {grade.priceMonthly === 0 ? 'Current Plan' : 'Upgrade'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

