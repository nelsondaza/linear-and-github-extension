import { cn } from '@repo/utils'

export const PriorityMedium = ({ className }: { className?: string }) => (
  <svg
    className={cn('inline-block', className)}
    fill="currentColor"
    height="1em"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="6" rx="1" width="3" x="1.5" y="8" />
    <rect height="9" rx="1" width="3" x="6.5" y="5" />
    <rect fillOpacity="0.4" height="12" rx="1" width="3" x="11.5" y="2" />
  </svg>
)
