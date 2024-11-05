import { cn } from '@repo/utils'

export const DotsIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('inline-block', className)}
    fill="currentColor"
    height="1em"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="1.5" opacity="0.9" rx="0.5" width="3" x="1.5" y="7.25" />
    <rect height="1.5" opacity="0.9" rx="0.5" width="3" x="6.5" y="7.25" />
    <rect height="1.5" opacity="0.9" rx="0.5" width="3" x="11.5" y="7.25" />
  </svg>
)
