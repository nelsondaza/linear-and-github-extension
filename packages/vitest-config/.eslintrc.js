/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/base.js'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['.', 'node_modules'],
        paths: ['.'],
      },
    },
  },
}
