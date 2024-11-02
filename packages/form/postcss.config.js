/* eslint-disable @typescript-eslint/no-require-imports */
const sharedConfig = require('@repo/tailwind-config/postcss.config')

/** @type {import('postcss-load-config').Config} */
const config = {
  ...sharedConfig,
}

module.exports = config
