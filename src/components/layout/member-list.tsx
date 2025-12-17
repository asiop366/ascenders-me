'use client'

import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface Member {
  id: string
  username: string
  image: string | null
  role: string
  grade?: { name: string; color: string } | null
}

interface MemberListProps {
  members: Member[]
  title?: string
}

export function MemberList({ members, title = 'Members' }: MemberListProps) {
  if (members.length === 0) {
    return null
  }

  return (
    <div className="bg-asc-surface border border-asc-border rounded-asc-lg p-4">
      <h3 className="text-sm font-semibold text-asc-text mb-3">{title}</h3>
      <div className="space-y-2">
        {members.map((member) => (
          <Link
            key={member.id}
            href={`/app/u/${member.username}`}
            className="flex items-center gap-3 p-2 rounded-asc hover:bg-asc-hover transition-colors"
          >
            <Avatar src={member.image} alt={member.username} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-asc-text truncate">
                {member.username}
              </p>
              {member.grade && (
                <Badge 
                  size="sm"
                  style={{ 
                    backgroundColor: member.grade.color + '20', 
                    color: member.grade.color 
                  }}
                >
                  {member.grade.name}
                </Badge>
              )}
            </div>
            <div className={`w-2 h-2 rounded-full ${member.role === 'ADMIN' ? 'bg-red-400' : member.role === 'MODERATOR' ? 'bg-yellow-400' : 'bg-green-400'}`} />
          </Link>
        ))}
      </div>
    </div>
  )
}

