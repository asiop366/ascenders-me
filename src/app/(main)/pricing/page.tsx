import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
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
                <span
                  className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full"
                  style={{ 
                    backgroundColor: `${grade.color}20`,
                    color: grade.color,
                    border: `1px solid ${grade.color}30`
                  }}
                >
                  {grade.name}
                </span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {grade.priceMonthly === 0 ? 'Free' : `$${grade.priceMonthly}`}
                </span>
                {grade.priceMonthly > 0 && (
                  <span className="text-dark-muted">/month</span>
                )}
              </div>

              <button
                className="w-full px-4 py-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-lg transition-colors font-medium"
              >
                {grade.priceMonthly === 0 ? 'Current Plan' : 'Upgrade'}
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-dark-muted">
                  <Check className="w-4 h-4 text-accent-success" />
                  <span>Access to basic channels</span>
                </div>
                {grade.priceMonthly > 0 && (
                  <>
                    <div className="flex items-center gap-2 text-sm text-dark-muted">
                      <Check className="w-4 h-4 text-accent-success" />
                      <span>Exclusive channels</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-dark-muted">
                      <Check className="w-4 h-4 text-accent-success" />
                      <span>Custom badge</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {grades.length === 0 && (
          <div className="text-center py-16">
            <p className="text-dark-muted text-lg">No grades available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
