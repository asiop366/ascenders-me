import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'primary', size = 'sm', className }: BadgeProps) {
  const variants = {
    primary: 'bg-accent-primary/20 text-accent-primary border-accent-primary/30',
    secondary: 'bg-accent-secondary/20 text-accent-secondary border-accent-secondary/30',
    success: 'bg-accent-success/20 text-accent-success border-accent-success/30',
    warning: 'bg-accent-warning/20 text-accent-warning border-accent-warning/30',
    error: 'bg-accent-error/20 text-accent-error border-accent-error/30',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}

