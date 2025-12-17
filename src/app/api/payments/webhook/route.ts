import { NextResponse } from 'next/server'

// STUB for Stripe webhook
export async function POST(req: Request) {
  try {
    // TODO: Verify Stripe signature
    // TODO: Handle webhook events (payment success, subscription canceled, etc.)
    
    const body = await req.json()
    console.log('Webhook received (STUB):', body)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}

