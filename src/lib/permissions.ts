import { Role } from '@prisma/client'

export function canModerate(role: Role): boolean {
  return role === 'MODERATOR' || role === 'ADMIN'
}

export function canAdmin(role: Role): boolean {
  return role === 'ADMIN'
}

export function canEditPost(authorId: string, userId: string, role: Role): boolean {
  return authorId === userId || canModerate(role)
}

export function canDeletePost(authorId: string, userId: string, role: Role): boolean {
  return authorId === userId || canModerate(role)
}

export function canLockThread(role: Role): boolean {
  return canModerate(role)
}

export function canPinThread(role: Role): boolean {
  return canModerate(role)
}

