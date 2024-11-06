import { cn } from '@repo/utils'

export const StatusReview = ({
  className,
  fill = 'currentColor',
  percentage = 1,
}: {
  className?: string
  fill?: string
  percentage?: number
}) => (
  <svg
    className={cn('inline-block', className)}
    fill={fill}
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
      stroke={fill}
      strokeDasharray="3.14 0"
      strokeDashoffset="-0.7"
      strokeWidth="2"
    />
    <circle
      cx="7"
      cy="7"
      fill="none"
      r="2"
      stroke={fill}
      strokeDasharray={`${12 * percentage} 100`}
      strokeDashoffset="0"
      strokeWidth="4"
      transform="rotate(-90 7 7)"
    />
  </svg>
)
