import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest) {
    try {
        const email = 'eya@ascenders.me'
        const newPassword = 'y44281454.'
        const hashedPassword = await bcrypt.hash(newPassword, 12)

        // Log limited DB URL info for debugging (be careful not to leak secrets)
        const dbUrl = process.env.DATABASE_URL || ''
        const dbInfo = dbUrl.split('@')[1] || 'URL too short or missing'

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        })

        if (!user) {
            return NextResponse.json({
                status: 'USER_NOT_FOUND',
                dbHostSnippet: dbInfo.substring(0, 20),
                message: `User ${email} not found in the current database.`
            })
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                hashedPassword,
                role: 'OWNER'
            }
        })

        return NextResponse.json({
            status: 'SUCCESS',
            dbHostSnippet: dbInfo.substring(0, 20),
            message: `Password reset successfully for ${email} in host ${dbInfo.substring(0, 10)}...`
        })

    } catch (error: any) {
        return NextResponse.json({
            status: 'ERROR',
            error: error.message
        }, { status: 500 })
    }
}
