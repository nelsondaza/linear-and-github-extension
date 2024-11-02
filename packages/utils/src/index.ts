import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export * from './hooks'
export * from './QueryClient'

export const cn = (...args: ClassValue[]) => twMerge(clsx(...args))
