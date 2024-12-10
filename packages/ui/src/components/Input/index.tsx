import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { cn } from '@repo/utils'
import { forwardRef, useId } from 'react'

import { Tooltip } from '@repo/ui'

import type { InputHTMLAttributes, ReactNode } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: ReactNode
  inputClassName?: string
  label?: ReactNode
  labelComment?: ReactNode
  labelInfo?: ReactNode
  transparent?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      autoComplete = 'off',
      className,
      error,
      inputClassName,
      label,
      labelComment,
      labelInfo,
      maxLength = 249,
      minLength = 0,
      name,
      required,
      transparent = false,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const randId = useId()
    const htmlId = id || name || randId

    const input = (
      <input
        {...props}
        id={htmlId}
        autoComplete={autoComplete}
        className={cn(
          'block w-full outline-0 rounded-md border-0 shadow-sm placeholder:text-grey px-3 py-2 text-inherit bg-white',
          'ring-1 ring-inset ring-grey',
          'focus:ring-greyDark',
          'disabled:ring-greyLight disabled:focus:ring-grey',
          'read-only:ring-greyLight read-only:focus:ring-grey',
          transparent
            && 'shadow-none ring-transparent focus:ring-transparent disabled:ring-transparent read-only:ring-transparent',
          type === 'number' && 'text-right',
          error && 'ring-red focus:ring-red disabled:ring-red read-only:ring-red',
          inputClassName,
        )}
        maxLength={maxLength}
        minLength={required ? Math.max(minLength, 1) : minLength}
        name={name || htmlId}
        ref={ref}
        required={required}
        type={type}
      />
    )

    return (
      <div className={cn('Input', className)}>
        {label || labelComment || labelInfo ? (
          <label className="block font-bold mb-1" htmlFor={htmlId}>
            {label}
            {labelComment ? <small className="font-normal pl-1 leading-4">{labelComment}</small> : null}
            {required ? <sup className="text-red pl-1 leading-4 align-top">*</sup> : ''}
            {labelInfo ? (
              <Tooltip content={labelInfo}>
                <InformationCircleIcon className="size-4 ml-1 leading-4 text-blue align-top cursor-pointer" />
              </Tooltip>
            ) : null}
          </label>
        ) : null}
        <Tooltip className="border-redLight stroke-redLight" content={error} disabled={!error} initialOpen>
          {input}
        </Tooltip>
      </div>
    )
  },
)

Input.displayName = 'Input'
