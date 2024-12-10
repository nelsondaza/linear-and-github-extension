import { cn } from '@repo/utils'
import { forwardRef } from 'react'

import type { AccentColor } from '../contants'
import type { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  accent?: AccentColor
  asIcon?: boolean
  asLink?: boolean
  className?: string
  type?: 'button' | 'reset' | 'submit'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ accent = 'default', asIcon = false, asLink = false, className, type, ...props }, ref) => (
    <button
      {...props}
      className={cn(
        'Button inline-flex items-center justify-center gap-1',
        'text-base text-text font-inherit-family font-bold',
        'rounded-md shadow-sm',
        'ring-1 ring-transparent',
        'cursor-pointer disabled:cursor-default',
        'hover:opacity-90 disabled:opacity-75 disabled:hover:opacity-75',
        accent === 'blue' && 'text-white bg-blue',
        accent === 'default'
          && 'text-text bg-white ring-greyLightMed hover:bg-greyLightest disabled:text-greyDark disabled:hover:bg-white',
        accent === 'gray'
          && 'text-text bg-greyLightest ring-grey hover:bg-greyLightest disabled:text-greyDark disabled:hover:bg-greyLightest',
        accent === 'green' && 'text-white bg-green',
        accent === 'orange' && 'text-white bg-orange',
        accent === 'red' && 'text-white bg-red',
        accent === 'teal' && 'text-white bg-teal',
        asLink
          && 'text-black font-inherit-weight bg-transparent ring-0 shadow-none px-1 py-0underline-offset-2 hover:underline hover:bg-transparent disabled:hover:bg-transparent disabled:text-greyDark',
        asIcon && 'p-0.5 rounded-full',
        !asLink && !asIcon && 'ring-inset px-3 py-1.5',
        className,
      )}
      ref={ref}
      // eslint-disable-next-line react/button-has-type
      type={type || props.form ? 'submit' : 'button'}
    >
      {props.children}
    </button>
  ),
)

Button.displayName = 'Button'
