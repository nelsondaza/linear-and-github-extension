import { cn } from '@repo/utils'
import { forwardRef } from 'react'

import type { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode

  accent?: 'blue' | 'default' | 'green' | 'orange' | 'red' | 'teal'
  className?: string
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ accent = 'default', className, ...props }, ref) => (
  <span
    {...props}
    className={cn(
      'Badge',
      'inline-flex items-center !leading-4 rounded-full px-2 py-1 text-xs ring-1 ring-inset',
      accent === 'blue' && 'bg-blueLightest ring-blueLight text-blue',
      accent === 'default' && 'bg-greyLightest ring-greyDark text-grey',
      accent === 'green' && 'bg-greenLightest ring-greenLight text-green',
      accent === 'orange' && 'bg-orangeLightest ring-orangeLight text-orange',
      accent === 'red' && 'bg-redLightest ring-redLight text-red',
      accent === 'teal' && 'bg-transparent ring-tealLight text-teal',
      className,
    )}
    ref={ref}
  >
    {props.children}
  </span>
))

Badge.displayName = 'Badge'
