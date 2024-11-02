/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/react-internal.js'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}
