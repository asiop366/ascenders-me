import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations' // Assuming this exists or will utilize existing validation
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { emailService } from './email-service'

export class AuthService {
    async register(data: any) {
        // 1. Validation Logic
        const validation = registerSchema.safeParse(data)
        if (!validation.success) {
            throw new Error(validation.error.errors[0].message)
        }

        const { email, username, password } = validation.data

        // 2. Duplicate Check
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email.toLowerCase() },
                    { username: username.toLowerCase() }
                ]
            }
        })

        if (existingUser) {
            if (existingUser.email === email.toLowerCase()) throw new Error('Email already in use')
            throw new Error('Username already taken')
        }

        // 3. Password Hashing
        const hashedPassword = await bcrypt.hash(password, 12)

        // 4. Token Generation
        const verificationToken = crypto.randomBytes(32).toString('hex')
        const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000)

        // 5. Transaction
        // Using transaction ensures user is not created if token creation fails
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: email.toLowerCase(),
                    username: username.toLowerCase(),
                    hashedPassword,
                    emailVerified: null,
                }
            })

            await tx.verificationToken.create({
                data: {
                    identifier: email.toLowerCase(),
                    token: verificationToken,
                    expires: tokenExpiry,
                }
            })

            return { user, verificationToken }
        })

        // 6. Async Side Effect: Send Email
        // We do NOT await this to block the response, but we log it.
        // In a real production app, this would go to a queue (Redis/Bull).
        emailService.sendVerificationEmail(
            result.user.email,
            result.verificationToken,
            result.user.username
        ).catch(err => {
            console.error('[AuthService] Failed to send verification email (background):', err)
        })

        return {
            id: result.user.id,
            email: result.user.email,
            username: result.user.username
        }
    }
}

export const authService = new AuthService()
