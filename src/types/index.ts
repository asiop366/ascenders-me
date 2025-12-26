import { User, Grade, ForumCategory, Topic, Thread, Post } from '@prisma/client'

export type UserWithGrade = User & {
  grade: Grade | null
}

export type CategoryWithTopics = ForumCategory & {
  topics: Topic[]
}

export type TopicWithCount = Topic & {
  _count: {
    threads: number
  }
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
