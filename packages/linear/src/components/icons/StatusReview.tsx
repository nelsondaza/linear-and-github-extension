import { cn } from '@repo/utils'

export const StatusReview = ({ className }: { className?: string }) => (
  <svg
    className={cn('inline-block', className)}
    fill="currentColor"
    height="1em"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="7"
      cy="7"
      fill="none"
      r="6"
      stroke="currentColor"
      strokeDasharray="3.14 0"
      strokeDashoffset="-0.7"
      strokeWidth="2"
    />
    <circle
      className="progress"
      cx="7"
      cy="7"
      fill="none"
      r="2"
      stroke="currentColor"
      strokeDasharray="9.377654070965532 100"
      strokeDashoffset="0"
      strokeWidth="4"
      transform="rotate(-90 7 7)"
    />
  </svg>
)
