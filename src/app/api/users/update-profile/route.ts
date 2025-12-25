import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateProfileSchema = z.object({
    displayName: z.string().min(1).max(50).optional(),
    username: z.string().min(3).max(20).regex(/^[a-z0-9_]+$/).optional(),
    bio: z.string().max(500).optional(),
    image: z.string().url().or(z.literal('')).optional(),
})

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const validated = updateProfileSchema.parse(body)

        // Get current user data
        const currentUser = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { username: true, usernameChangedAt: true }
        })

        if (!currentUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Check username change restrictions
        let usernameUpdate = {}
        if (validated.username && validated.username !== currentUser.username) {
            // Check if username is already taken
            const existingUser = await prisma.user.findUnique({
                where: { username: validated.username }
            })

            if (existingUser) {
                return NextResponse.json(
                    { error: 'Username is already taken' },
                    { status: 400 }
                )
            }

            // Check 7-day restriction
            if (currentUser.usernameChangedAt) {
                const lastChange = new Date(currentUser.usernameChangedAt)
                const now = new Date()
                const diffDays = (now.getTime() - lastChange.getTime()) / (1000 * 60 * 60 * 24)

                if (diffDays < 7) {
                    return NextResponse.json(
                        { error: `You can change your username in ${Math.ceil(7 - diffDays)} days` },
                        { status: 400 }
                    )
                }
            }

            usernameUpdate = {
                username: validated.username,
                usernameChangedAt: new Date()
            }
        }

        // Update user
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                displayName: validated.displayName,
                bio: validated.bio,
                image: validated.image === '' ? null : validated.image,
                ...usernameUpdate
            },
            select: {
                id: true,
                username: true,
                displayName: true,
                bio: true,
                image: true,
                usernameChangedAt: true
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error: any) {
        console.error('Error updating profile:', error)

        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Invalid input', details: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        )
    }
}
