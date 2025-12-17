import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// STUB for Stripe integration
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { gradeId } = await req.json()

    const grade = await prisma.grade.findUnique({
      where: { id: gradeId },
    })

    if (!grade) {
      return NextResponse.json({ error: 'Grade not found' }, { status: 404 })
    }

    // TODO: Create Stripe checkout session
    // For now, create a pending subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId: session.user.id,
        gradeId: grade.id,
        status: 'PENDING',
        provider: 'stripe',
        providerRef: `stub_${Date.now()}`,
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    })

    return NextResponse.json({
      message: 'Checkout session created (STUB)',
      subscriptionId: subscription.id,
      // In production, return Stripe checkout URL
      checkoutUrl: `/pricing?success=true&subscriptionId=${subscription.id}`,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}

