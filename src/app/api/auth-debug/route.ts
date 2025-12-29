import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        })

        if (!user || !user.hashedPassword) {
            return NextResponse.json({
                error: 'User or password hash not found',
                details: { userExists: !!user, hashExists: !!user?.hashedPassword }
            })
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword)

        return NextResponse.json({
            email,
            isMatch,
            storedHash: user.hashedPassword.substring(0, 10) + '...',
            role: user.role
        })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}
