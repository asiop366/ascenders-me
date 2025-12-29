import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember Me', type: 'checkbox' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim()
        console.log(`[AUTH-DEBUG] Login attempt for: '${email}'`)

        if (!email || !credentials?.password) {
          console.log('[AUTH-DEBUG] Missing credentials')
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email },
          include: { grade: true },
        })

        const authorizeUser = async (u: any, p: string) => {
          if (!u.hashedPassword) {
            console.log('[AUTH-DEBUG] No password set')
            throw new Error('Invalid credentials')
          }

          const isPasswordValid = await bcrypt.compare(p, u.hashedPassword)
          console.log(`[AUTH-DEBUG] Pwd match result for ${u.email}: ${isPasswordValid}`)

          if (!isPasswordValid) {
            console.log('[AUTH-DEBUG] Password mismatch')
            throw new Error('Invalid credentials')
          }

          // Check if email is verified
          if (!u.emailVerified) {
            console.log('[AUTH-DEBUG] Email not verified')
            throw new Error('Please verify your email before logging in. Check your inbox for the verification link.')
          }

          return {
            id: u.id,
            email: u.email,
            username: u.username,
            displayName: u.displayName,
            image: u.image,
            role: u.role,
            gradeId: u.gradeId,
            usernameChangedAt: u.usernameChangedAt,
            bio: u.bio,
          }
        }

        if (!user) {
          console.log(`[AUTH-DEBUG] User NOT found in DB for email: '${email}'`)
          // Try findFirst as a fallback (some platforms have weird behavior with findUnique)
          const fallbackUser = await prisma.user.findFirst({
            where: { email: { equals: email, mode: 'insensitive' } }
          })

          if (!fallbackUser) {
            throw new Error('Invalid credentials')
          }
          // If we found a fallback user, let's continue with it
          console.log(`[AUTH-DEBUG] Fallback found user: ${fallbackUser.id}`)
          return authorizeUser(fallbackUser, credentials.password)
        }

        return authorizeUser(user, credentials.password)
      },


    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.displayName = user.displayName
        token.role = user.role
        token.gradeId = user.gradeId ?? null
        token.usernameChangedAt = user.usernameChangedAt
        token.bio = (user as any).bio
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.displayName = (token.displayName as string | null) ?? null
        session.user.role = token.role as string
        session.user.gradeId = (token.gradeId as string | null) ?? null
        session.user.usernameChangedAt = (token.usernameChangedAt as Date | null) ?? null
        session.user.bio = (token.bio as string | null) ?? null
      }
      return session
    },
  },
}
