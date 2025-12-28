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
        console.log('Login attempt for:', credentials?.email)
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password')
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
          include: { grade: true },
        })

        if (!user) {
          console.log('User not found in DB:', credentials.email)
          throw new Error('Invalid credentials')
        }

        if (!user.hashedPassword) {
          console.log('User has no hashedPassword:', user.email)
          throw new Error('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isPasswordValid) {
          console.log('Invalid password for user:', user.email)
          throw new Error('Invalid credentials')
        }

        if (user.isBanned) {
          console.log('User is banned:', user.email)
          throw new Error('This account has been banned: ' + (user.banReason || 'No reason provided'))
        }

        console.log('Successful login for:', user.email)

        // Force role update for specific emails (self-healing)
        const ownerEmails = ['eya@ascenders.me', '4si0p.555@gmail.com']
        let role = user.role
        if (ownerEmails.includes(user.email.toLowerCase()) && user.role !== 'OWNER') {
          console.log('Forcing role update to OWNER for:', user.email)
          await prisma.user.update({
            where: { id: user.id },
            data: { role: 'OWNER' as any }
          })
          role = 'OWNER'
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          displayName: user.displayName,
          image: user.image,
          role: role,
          gradeId: user.gradeId,
          usernameChangedAt: user.usernameChangedAt,
          bio: user.bio,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.displayName = user.displayName
        token.role = user.role
        token.gradeId = user.gradeId ?? null
        token.usernameChangedAt = user.usernameChangedAt
        token.bio = (user as any).bio
      }

      // Update token if role was changed elsewhere or via force
      if (trigger === "update" && session?.role) {
        token.role = session.role
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.displayName = token.displayName as string | null
        session.user.role = token.role as any
        session.user.gradeId = (token.gradeId as string | null) ?? null
        session.user.usernameChangedAt = token.usernameChangedAt as Date | null
        session.user.bio = token.bio as string | null
      }
      return session
    },
  },
}
