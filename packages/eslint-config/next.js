/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    node: true,
  },

  extends: [require.resolve('@vercel/style-guide/eslint/next'), './base.js'],
}
