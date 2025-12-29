import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json()

        if (!token) {
            return NextResponse.json(
                { error: 'Verification token is required' },
                { status: 400 }
            )
        }

        // Find the verification token
        const verificationToken = await prisma.verificationToken.findUnique({
            where: {
                token,
            },
        })

        if (!verificationToken) {
            return NextResponse.json(
                { error: 'Invalid or expired verification token' },
                { status: 400 }
            )
        }

        // Check if token has expired
        if (verificationToken.expires < new Date()) {
            await prisma.verificationToken.delete({
                where: { token },
            })
            return NextResponse.json(
                { error: 'Verification token has expired. Please register again.' },
                { status: 400 }
            )
        }

        // Find the user and update emailVerified
        const user = await prisma.user.findUnique({
            where: {
                email: verificationToken.identifier,
            },
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Update user's emailVerified field
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                emailVerified: new Date(),
            },
        })

        // Delete the used verification token
        await prisma.verificationToken.delete({
            where: { token },
        })

        // Send welcome email
        await sendWelcomeEmail(user.email, user.username)

        return NextResponse.json(
            {
                success: true,
                message: 'Email verified successfully! You can now log in.'
            },
            { status: 200 }
        )
    } catch (error: any) {
        console.error('Email verification error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
