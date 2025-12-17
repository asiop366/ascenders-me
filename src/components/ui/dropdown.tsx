'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { clsx } from 'clsx'

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
}

export function Dropdown({ trigger, children, align = 'right' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      
      {isOpen && (
        <div
          className={clsx(
            'absolute top-full mt-2 w-56 bg-dark-surface border border-dark-border rounded-lg shadow-xl py-1 z-50',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps {
  onClick?: () => void
  children: ReactNode
  danger?: boolean
}

export function DropdownItem({ onClick, children, danger }: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full px-4 py-2 text-left text-sm hover:bg-dark-hover transition-colors',
        danger ? 'text-accent-error' : 'text-dark-text'
      )}
    >
      {children}
    </button>
  )
}

