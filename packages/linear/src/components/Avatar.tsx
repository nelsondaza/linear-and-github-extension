import { cn } from '@repo/utils'

interface AvatarProps {
  className?: string
  name?: string
  src?: string
}

export const Avatar = ({ className, name, src }: AvatarProps) => (
  <div className={cn('inline-flex relative items-center justify-center shrink-0 aspect-square size-4', className)}>
    <img
      alt={name ? `Avatar of ${name}` : undefined}
      aria-label={name}
      className="rounded-full object-cover size-full"
      src={src}
    />
  </div>
)
