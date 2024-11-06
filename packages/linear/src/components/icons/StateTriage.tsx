import { cn } from '@repo/utils'

export const StateTriage = ({ className, fill = 'currentColor' }: { className?: string; fill?: string }) => (
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
      r="3.5"
      stroke={fill}
      strokeDasharray="2 0"
      strokeDashoffset="3.2"
      strokeWidth="7"
    />
    <circle
      cx="7"
      cy="7"
      fill="none"
      r="2"
      stroke={fill}
      strokeDasharray="0 100"
      strokeDashoffset="0"
      strokeWidth="4"
      transform="rotate(-90 7 7)"
    />
    <path
      d="M8.0126 7.98223V9.50781C8.0126 9.92901 8.52329 10.1548 8.85102 9.87854L11.8258 7.37066C12.0581 7.17486 12.0581 6.82507 11.8258 6.62927L8.85102 4.12139C8.52329 3.84509 8.0126 4.07092 8.0126 4.49212V6.01763H5.98739V4.49218C5.98739 4.07098 5.4767 3.84515 5.14897 4.12146L2.17419 6.62933C1.94194 6.82513 1.94194 7.17492 2.17419 7.37072L5.14897 9.8786C5.4767 10.1549 5.98739 9.92907 5.98739 9.50787V7.98223H8.0126Z"
      fill="white"
      stroke="none"
    />
  </svg>
)
