import { cn } from '@repo/utils'
import { forwardRef } from 'react'

interface AvatarProps {
  className?: string
  name?: string
  src?: string
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ className, name, src }, ref) => (
  <div
    className={cn('inline-flex relative items-center justify-center shrink-0 aspect-square size-4', className)}
    ref={ref}
  >
    <img
      alt={name ? `Avatar of ${name}` : undefined}
      aria-label={name}
      className="rounded-full object-cover size-full"
      src={src}
    />
  </div>
))

Avatar.displayName = 'Avatar'
