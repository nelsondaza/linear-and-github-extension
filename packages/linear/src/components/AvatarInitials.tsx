import { cn } from '@repo/utils'
import { forwardRef } from 'react'

interface AvatarInitialsProps {
  backgroundColor?: string
  className?: string
  initials?: string
  name?: string
}

export const AvatarInitials = forwardRef<HTMLDivElement, AvatarInitialsProps>(
  ({ backgroundColor, className, initials, name }, ref) => (
    <div
      className={cn('inline-flex relative items-center justify-center shrink-0 aspect-square size-4', className)}
      ref={ref}
    >
      <div
        aria-label={name}
        className="flex rounded-full size-full items-center justify-center shrink-0 leading-4 text-xxs text-white font-semibold"
        style={{ backgroundColor }}
      >
        {initials}
      </div>
    </div>
  ),
)

AvatarInitials.displayName = 'AvatarInitials'
