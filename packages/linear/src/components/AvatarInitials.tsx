import { cn } from '@repo/utils'

interface AvatarInitialsProps {
  backgroundColor?: string
  className?: string
  initials?: string
  name?: string
}

export const AvatarInitials = ({ backgroundColor, className, initials, name }: AvatarInitialsProps) => (
  <div className={cn('inline-flex relative items-center justify-center shrink-0 aspect-square size-4', className)}>
    <div
      aria-label={name}
      className="flex rounded-full size-full items-center justify-center shrink-0 leading-4 text-xxs text-white font-semibold"
      style={{ backgroundColor }}
    >
      {initials}
    </div>
  </div>
)
