/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  arrowParens: 'always',
  attributeGroups: ['^(key|id)$', '$DEFAULT'],
  bracketSameLine: false,
  bracketSpacing: true,
  overrides: [
    {
      files: '*.ts?x',
      options: {
        parser: 'typescript',
      },
    },
  ],
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-organize-attributes'],
  printWidth: 120,
  proseWrap: 'preserve',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
}

module.exports = config
