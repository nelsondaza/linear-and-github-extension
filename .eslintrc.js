const path = require('node:path')

const project = path.resolve(process.cwd(), 'tsconfig.json')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: [
    // .gitignore
  ],
  overrides: [
    // JS + TS
    {
      env: {
        browser: true,
        commonjs: true,
        es6: true,
      },
      extends: [
        'airbnb',
        'airbnb/hooks',
        'prettier',
        'plugin:unicorn/recommended',
        'plugin:perfectionist/recommended-natural-legacy',
      ],
      files: ['**/*.{j,t}s{x,}'],
      plugins: ['import', 'tailwindcss', 'perfectionist', 'sort-class-members'],
      rules: {
        'arrow-parens': ['error', 'always'],
        'comma-dangle': ['warn', 'always-multiline'],
        curly: ['error', 'all'],
        'global-require': 'off',
        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
        'import/no-cycle': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-import-module-exports': 'off',
        'import/order': [
          'warn',
          {
            alphabetize: {
              /* ignore case. Options: [true, false] */
              caseInsensitive: true,
              /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
              order: 'asc',
              orderImportKind: 'asc',
            },
            groups: [
              'builtin', // node
              'external', // third party
              'internal', // local webpack
              'parent', // ../*
              'sibling', // ./*
              'index', // ./
              'object', // import log = console.log;
              'type', // import type *
              'unknown', //
            ],
            'newlines-between': 'always',
            pathGroups: [
              {
                group: 'internal',
                pattern: '*/**',
                position: 'after',
              },
              {
                group: 'unknown',
                pattern: './index.scss',
                position: 'after',
              },
            ],
            // warnOnUnassignedImports: true,
          },
        ],
        'import/prefer-default-export': 'off',
        indent: ['error', 2, { SwitchCase: 1 }],
        'max-classes-per-file': ['error', 2],
        'max-len': [
          'warn',
          {
            code: 120,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreUrls: true,
            tabWidth: 2,
          },
        ],
        'no-multiple-empty-lines': [
          'warn',
          {
            max: 1,
            maxBOF: 1,
            maxEOF: 1,
          },
        ],
        'no-restricted-syntax': 'off',
        'no-shadow': 'off',
        'object-curly-newline': [
          'warn',
          {
            consistent: true,
            minProperties: 9,
            multiline: true,
          },
        ],
        'operator-linebreak': ['warn', 'before'],
        'perfectionist/sort-array-includes': [
          'warn',
          {
            groupKind: 'literals-first',
            ignoreCase: true,
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-astro-attributes': 'off',
        'perfectionist/sort-classes': [
          'off',
          {
            groups: [
              'index-signature',
              'static-property',
              'private-property',
              'property',
              'constructor',
              'static-method',
              'private-method',
              'method',
            ],
            ignoreCase: true,
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-interfaces': [
          'warn',
          {
            customGroups: {
              id: 'id',
              uuid: 'uuid',
              key: 'key',
            },
            groups: ['id', 'uuid', 'key', 'unknown'],
            ignoreCase: true,
            order: 'asc',
            partitionByNewLine: true,
            type: 'natural',
          },
        ],
        'perfectionist/sort-jsx-props': [
          'warn',
          {
            customGroups: {
              id: 'id',
              uuid: 'uuid',
              key: 'key',
            },
            groups: ['id', 'uuid', 'key', 'unknown'],
            ignoreCase: true,
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-named-imports': [
          'warn',
          {
            ignoreCase: true,
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-object-types': [
          'warn',
          {
            customGroups: {
              id: 'id',
              uuid: 'uuid',
              key: 'key',
            },
            groups: ['id', 'uuid', 'key', 'unknown'],
            ignoreCase: true,
            order: 'asc',
            partitionByNewLine: true,
            type: 'natural',
          },
        ],
        'perfectionist/sort-objects': [
          'warn',
          {
            customGroups: {
              id: 'id',
              uuid: 'uuid',
              key: 'key',
            },
            groups: ['id', 'uuid', 'key', 'unknown'],
            ignoreCase: true,
            order: 'asc',
            partitionByNewLine: true,
            type: 'natural',
          },
        ],
        'perfectionist/sort-svelte-attributes': 'off',
        'perfectionist/sort-vue-attributes': 'off',
        quotes: ['warn', 'single', { avoidEscape: true }],
        semi: ['warn', 'never'],
        'sort-imports': [
          'warn',
          {
            allowSeparatedGroups: true,
            ignoreCase: true,
            ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          },
        ],
        'sort-keys': 'off',
        'unicorn/better-regex': 'off',
        'unicorn/catch-error-name': 'off',
        'unicorn/consistent-destructuring': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/explicit-length-check': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/import-index': 'off',
        'unicorn/no-abusive-eslint-disable': 'off',
        'unicorn/no-anonymous-default-export': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-array-push-push': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-console-spaces': 'off',
        'unicorn/no-empty-file': 'off',
        'unicorn/no-for-loop': 'off',
        'unicorn/no-keyword-prefix': 'off',
        'unicorn/no-lonely-if': 'off',
        'unicorn/no-nested-ternary': 'off',
        'unicorn/no-new-array': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-object-as-default-parameter': 'off',
        'unicorn/no-unnecessary-polyfills': 'off',
        'unicorn/no-useless-fallback-in-spread': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/no-zero-fractions': 'off',
        'unicorn/numeric-separators-style': 'off',
        'unicorn/prefer--includes': 'off',
        'unicorn/prefer-array-some': 'off',
        'unicorn/prefer-date-now': 'off',
        'unicorn/prefer-dom-node-dataset': 'off',
        'unicorn/prefer-dom-node-remove': 'off',
        'unicorn/prefer-export-from': 'off',
        'unicorn/prefer-global-this': 'off',
        'unicorn/prefer-includes': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/prefer-node-protocol': 'off',
        'unicorn/prefer-number-properties': 'off',
        'unicorn/prefer-object-from-entries': 'off',
        'unicorn/prefer-optional-catch-binding': 'off',
        'unicorn/prefer-query-selector': 'off',
        'unicorn/prefer-regexp-test': 'off',
        'unicorn/prefer-set-has': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/prefer-string-replace-all': 'off',
        'unicorn/prefer-string-slice': 'off',
        'unicorn/prefer-switch': 'off',
        'unicorn/prevent-abbreviations': 'off',
      },
    },
    // Typescript
    {
      extends: ['plugin:@typescript-eslint/recommended'],
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        createDefaultProgram: true,
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          {
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],
        '@typescript-eslint/no-implied-eval': 'off',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/sort-type-constituents': 'off',
        'react/prop-types': 'off',
      },

      settings: {
        'import/resolver': {
          typescript: {
            project,
          },
        },
      },
    },
    // React
    {
      files: ['**/*.{js{x,},tsx}'],
      globals: {
        JSX: true,
        React: true,
      },
      plugins: ['react', 'react-hooks', 'tailwindcss', 'sort-class-members'],
      rules: {
        'jsx-a11y/control-has-associated-label': 'off',
        'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
        'jsx-quotes': ['warn', 'prefer-double'],
        'react/destructuring-assignment': 'off',
        'react/forbid-prop-types': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-curly-brace-presence': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/jsx-fragments': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-sort-props': ['off', { ignoreCase: true }],
        'react/jsx-uses-react': 'off',
        'react/no-array-index-key': 'off',
        'react/no-danger-with-children': 'off',
        'react/no-deprecated': 'off',
        'react/no-string-refs': 'off',
        'react/no-unstable-nested-components': 'off',
        'react/prefer-exact-props': 'off',
        'react/prefer-stateless-function': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'react/sort-comp': [
          'off',
          {
            groups: { 'sub-rendering': ['/^(shouldRender|render).+$/'] },
            order: ['instance-variables', 'lifecycle', 'everything-else', 'sub-rendering', 'render'],
          },
        ],
        'react/state-in-constructor': 'off',
        'react/static-property-placement': 'off',
        'react-hooks/exhaustive-deps': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'sort-class-members/sort-class-members': [
          'warn',
          {
            accessorPairPositioning: 'getThenSet',
            groups: {
              all: [
                {
                  name: '/^(?!render).+/',
                  sort: 'alphabetical',
                },
              ],
              lifecycle: [
                'displayName',
                'propTypes',
                'contextTypes',
                'childContextTypes',
                'getChildContext',
                'defaultProps',
                'getDefaultProps',
                'state',
                'getInitialState',
                'constructor',
                'getDerivedStateFromProps',
                'componentWillMount',
                'UNSAFE_componentWillMount',
                'componentDidMount',
                'componentWillReceiveProps',
                'UNSAFE_componentWillReceiveProps',
                'shouldComponentUpdate',
                'componentWillUpdate',
                'UNSAFE_componentWillUpdate',
                'getSnapshotBeforeUpdate',
                'componentDidUpdate',
                'componentDidCatch',
                'componentWillUnmount',
              ],
              'render-methods': [
                {
                  name: '/^render.+/',
                  sort: 'alphabetical',
                },
              ],
              statics: [
                {
                  name: '/(.+)/',
                  sort: 'alphabetical',
                  static: true,
                  type: 'property',
                },
              ],
            },
            order: ['[lifecycle]', '[all]', '[render-methods]', 'render'],
          },
        ],
        'tailwindcss/classnames-order': 'off',
        'tailwindcss/enforces-negative-arbitrary-values': 'error',
        'tailwindcss/enforces-shorthand': 'error',
        'tailwindcss/migration-from-tailwind-2': 'error',
        'tailwindcss/no-arbitrary-value': 'off',
        'tailwindcss/no-contradicting-classname': 'error',
        'tailwindcss/no-custom-classname': 'off',
      },
      settings: {
        react: {
          pragma: 'React',
          version: 'detect',
        },
      },
    },
    // Vitest
    {
      env: {
        node: true,
      },
      files: ['**/*.{test,spec}?(s).ts?(x)'],
    },
    // Module Config
    {
      env: {
        node: true,
      },
      files: ['**/*.{c,m}js'],
    },
  ],
  root: true,
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
}
