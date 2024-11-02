/* eslint-disable @typescript-eslint/no-require-imports */
const { mergeConfig } = require('vitest/config')

export default mergeConfig(require('@repo/vitest-config/vitest.config'), {
  // custom config here
})
