/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('node:path')

const { defineConfig } = require('vitest/config')

const exclude = ['**/{node_modules,dist,build,out}/**', '**/[.]*/**']

module.exports = defineConfig({
  cacheDir: './dist/.vitestcache',
  plugins: [require('@vitejs/plugin-react')()],
  test: {
    clearMocks: true,
    coverage: {
      all: false,
      enabled: true,
      exclude: [...exclude, '**/*.stories.*', '**/*.test?(s).*'],
      reporter: ['html', 'text-summary'],
      reportsDirectory: './dist/coverage',
      thresholds: {
        // Thresholds for all files
        branches: 30,
        functions: 30,
        lines: 30,
        statements: 30,
      },
    },
    dir: '.',
    environment: 'jsdom',
    exclude,
    globals: true,
    include: ['**/*.test?(s).ts?(x)'],
    maxWorkers: '40%',
    minWorkers: '1',
    outputFile: {
      json: './dist/coverage/test-results.json',
    },
    passWithNoTests: true,
    reporters: ['json', 'default'],
    root: process.cwd(),
    setupFiles: [path.resolve(__dirname, 'setup.ts')],
    watch: false,
  },
})
