import { NextRequest, NextResponse } from 'next/server'
import { authService } from '@/lib/services/auth-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Delegate to service layer
    const user = await authService.register(body)

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        message: 'Please check your email to verify your account'
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('[API] Registration error:', error.message)

    // Handle specific business logic errors vs generic server errors
    const knownErrors = ['Email already in use', 'Username already taken']
    if (knownErrors.includes(error.message) || error.message.includes('must be')) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
