import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validated = registerSchema.parse(body)

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validated.email },
          { username: validated.username },
        ],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 10)

    // Get default (Free) grade
    const freeGrade = await prisma.grade.findFirst({
      where: { slug: 'free' },
    })

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validated.email,
        username: validated.username,
        hashedPassword,
        gradeId: freeGrade?.id,
      },
    })

    return NextResponse.json(
      { message: 'User created successfully', userId: user.id },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}

