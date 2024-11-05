import { cn } from '@repo/utils'

export const LinearIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('inline-block', className)}
    fill="currentColor"
    height="1em"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.147 9.383c-.027-.114.109-.186.192-.103L6.72 13.66c.083.083.011.219-.103.192a6.015 6.015 0 0 1-4.47-4.47ZM2 7.627a.119.119 0 0 0 .035.091l6.247 6.247a.119.119 0 0 0 .091.035c.285-.018.564-.055.836-.111a.117.117 0 0 0 .057-.198L2.31 6.734a.117.117 0 0 0-.198.057 6.007 6.007 0 0 0-.11.836ZM2.505 5.565a.119.119 0 0 0 .025.132l7.773 7.773a.118.118 0 0 0 .132.025c.215-.096.422-.203.623-.322a.118.118 0 0 0 .022-.185L3.012 4.92a.118.118 0 0 0-.185.022c-.119.2-.226.408-.322.623ZM3.519 4.169a.118.118 0 0 1-.005-.163 6.006 6.006 0 1 1 8.48 8.48.118.118 0 0 1-.163-.005L3.52 4.169Z" />
  </svg>
)
