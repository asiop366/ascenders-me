import { clsx } from 'clsx'
import { CSSProperties } from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  className?: string
  style?: CSSProperties
}

export function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  className,
  style
}: BadgeProps) {
  const variants = {
    primary: 'bg-asc-text/10 text-asc-text border-asc-text/20',
    secondary: 'bg-asc-secondary/10 text-asc-secondary border-asc-secondary/20',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center font-bold rounded-full border backdrop-blur-sm transition-all duration-300',
        !style && variants[variant],
        sizes[size],
        className
      )}
      style={style}
    >
      {children}
    </span>
  )
}
