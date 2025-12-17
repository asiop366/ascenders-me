import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username: string
      role: string
      gradeId: string | null
    } & DefaultSession['user']
  }

  interface User {
    id: string
    email: string
    username: string
    image?: string | null
    role: string
    gradeId?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    username: string
    role: string
    gradeId: string | null
  }
}
