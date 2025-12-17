import { User, Grade, Space, Channel, Thread, Post } from '@prisma/client'

export type UserWithGrade = User & {
  grade: Grade | null
}

export type ThreadWithAuthor = Thread & {
  author: UserWithGrade
  _count: {
    posts: number
  }
}

export type PostWithAuthor = Post & {
  author: UserWithGrade
}

export type ChannelWithSpace = Channel & {
  space: Space
}

