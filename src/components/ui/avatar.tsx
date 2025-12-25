import Image from 'next/image'
import { clsx } from 'clsx'

interface AvatarProps {
  src?: string | null
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Avatar({ src, alt = 'User avatar', size = 'md', className }: AvatarProps) {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div
      className={clsx(
        'relative rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white shadow-lg',
        sizes[size],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <span className="drop-shadow-md">{getInitials(alt)}</span>
      )}
    </div>
  )
}

