import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username: string
      displayName?: string | null
      role: string
      gradeId: string | null
      usernameChangedAt?: Date | null
      bio?: string | null
    } & DefaultSession['user']
  }

  interface User {
    id: string
    email: string
    username: string
    displayName?: string | null
    image?: string | null
    role: string
    gradeId?: string | null
    usernameChangedAt?: Date | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    username: string
    displayName?: string | null
    role: string
    gradeId: string | null
    usernameChangedAt?: Date | null
  }
}
