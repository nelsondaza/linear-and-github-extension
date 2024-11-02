import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  ...options,
  dts: true,
  entry: ['src/index.{ts,tsx}'],
  external: ['react'],
  format: ['cjs', 'esm'],
  outDir: './dist/public/',
  sourcemap: true,
  treeshake: true,
}))
