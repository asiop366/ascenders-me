'use client'

import { signOut, useSession } from 'next-auth/react'
import { Avatar } from '@/components/ui/avatar'
import { Dropdown, DropdownItem } from '@/components/ui/dropdown'
import { ChevronDown, User, LogOut } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface NavbarProps {
  channelName?: string
  gradeName?: string | null
  gradeColor?: string | null
}

export function Navbar({ channelName, gradeName, gradeColor }: NavbarProps) {
  const { data: session } = useSession()

  return (
    <div className="h-16 bg-dark-surface border-b border-dark-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {channelName && (
          <>
            <span className="text-dark-muted">#</span>
            <h1 className="font-semibold text-lg">{channelName}</h1>
          </>
        )}
      </div>

      <Dropdown
        trigger={
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-dark-hover transition-colors">
            <Avatar

