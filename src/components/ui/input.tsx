import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-dark-text mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={clsx(
            'w-full px-4 py-2.5 bg-dark-surface border rounded-lg text-dark-text placeholder:text-dark-muted transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent',
            error
              ? 'border-accent-error focus:ring-accent-error'
              : 'border-dark-border hover:border-dark-muted',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-accent-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-dark-muted">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

