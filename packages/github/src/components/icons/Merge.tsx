import { cn } from '@repo/utils'
import { forwardRef } from 'react'

import type { SVGProps } from 'react'

export const Merge = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(({ className }, ref) => (
  <svg
    className={cn('inline-block', className)}
    fill="currentColor"
    height="1em"
    ref={ref}
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z" />
  </svg>
))

Merge.displayName = 'Merge'
