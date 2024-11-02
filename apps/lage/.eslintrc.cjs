/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/react-internal.js', 'plugin:storybook/recommended'],
  globals: {
    ajaxIntercept: true,
    createTestComponent: true,
    epicToPromise: true,
    expectBecameFalse: true,
    expectBecameTrue: true,
    expectChange: true,
    expectKeys: true,
    expectNoChange: true,
    FEATURES_FLAGS: true,
    SYSTEM: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
        moduleDirectory: ['src', 'src/packages', 'node_modules'],
        paths: ['src', 'src/packages'],
      },
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
}
