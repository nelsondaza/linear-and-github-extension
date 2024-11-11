import { cn } from '@repo/utils'
import { forwardRef } from 'react'

import type { SVGProps } from 'react'

export const PRDraft = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(({ className }, ref) => (
  <svg
    className={cn('inline-block', className)}
    fill="currentColor"
    height="1em"
    ref={ref}
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3.25 1A2.25 2.25 0 0 1 4 5.372v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.251 2.251 0 0 1 3.25 1Zm9.5 14a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM2.5 3.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0ZM3.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm9.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM14 7.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm0-4.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" />
  </svg>
))

PRDraft.displayName = 'PRDraft'
