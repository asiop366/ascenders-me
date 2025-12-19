import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .transform(val => val.toLowerCase()),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const threadSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  channelId: z.string(),
})

export const postSchema = z.object({
  content: z.string().min(1, 'Content is required').max(5000),
  threadId: z.string(),
})

export const profileUpdateSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/).optional(),
  bio: z.string().max(500).optional(),
  image: z.string().url().optional().or(z.literal('')),
})
