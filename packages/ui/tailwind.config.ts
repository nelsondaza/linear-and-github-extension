import sharedConfig from '@repo/tailwind-config/tailwind.config'

import type { Config } from 'tailwindcss'

const config: Pick<Config, 'content' | 'presets'> = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', '../../packages/ui/src/**/*.{js,jsx,ts,tsx}'],
  presets: [sharedConfig],
}

export default config
