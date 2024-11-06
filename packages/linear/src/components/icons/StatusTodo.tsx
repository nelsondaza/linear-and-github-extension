import { cn } from '@repo/utils'

export const StatusTodo = ({ className, fill = 'currentColor' }: { className?: string; fill?: string }) => (
  <svg
    className={cn('inline-block', className)}
    fill={fill}
    height="1em"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="none" height="12" rx="6" stroke={fill} strokeWidth="2" width="12" x="1" y="1" />
    <path d="M 3.5,3.5 L3.5,0 A3.5,3.5 0 0,1 3.5, 0 z" fill={fill} stroke="none" transform="translate(3.5,3.5)" />
  </svg>
)
