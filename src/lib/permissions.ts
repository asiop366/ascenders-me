
export function canModerate(role: any): boolean {
  return role === 'MODERATOR' || role === 'ADMIN' || role === 'OWNER'
}

export function canAdmin(role: any): boolean {
  return role === 'ADMIN' || role === 'OWNER'
}

export function canEditPost(authorId: string, userId: string, role: any): boolean {
  return authorId === userId || canModerate(role)
}

export function canDeletePost(authorId: string, userId: string, role: any): boolean {
  return authorId === userId || canModerate(role)
}

export function canLockThread(role: any): boolean {
  return canModerate(role)
}

export function canPinThread(role: any): boolean {
  return canModerate(role)
}

