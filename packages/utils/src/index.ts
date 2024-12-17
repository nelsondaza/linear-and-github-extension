import { clsx } from 'clsx'
// eslint-disable-next-line import/no-unresolved
import cssText from 'data-text:~style.css'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export * from './hooks'
export * from './QueryClient'

export const cn = (...args: ClassValue[]) => twMerge(clsx(...args))

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}
