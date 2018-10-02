module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:lodash/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:react/all',
  ],
  overrides: [
    { files: ['src/index.js'], rules: { 'filenames/no-index': 'off' } },

    // Development overrides
    {
      files: [
        '**/*.test.js',
        '**/__tests__/*.js',
        '.storybook/*.js',
        'config/jest/setup.js',
        'config/webpack/*.js',
      ],
      rules: { 'import/no-extraneous-dependencies': 'off' },
    },

    // NodeJS overrides
    {
      files: ['jest.config.js', 'config/webpack/*.js'],
      rules: { 'import/no-commonjs': 'off', 'import/no-nodejs-modules': 'off' },
    },
  ],
  plugins: [
    'classes',
    'compat',
    'eslint-comments',
    'filenames',
    'import',
    'jest',
    'lodash',
    'promise',
    'react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: '2017',
    sourceType: 'module',
  },
  root: true,
  rules: {
    'classes/style': 'error',
    'classes/name': ['error', 'class', 'method'],
    'classes/space': 'error',
    'compat/compat': 'error',
    'filenames/match-exported': ['error', 'kebab'],
    'filenames/no-index': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/exports-last': 'error',
    'import/extensions': ['error', 'always', { js: 'never' }],
    'import/first': 'error',
    'import/group-exports': 'warn', // TODO: Change to error once fixed
    'import/max-dependencies': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-anonymous-default-export': 'error',
    'import/no-commonjs': 'error',
    'import/no-cycle': 'error',
    'import/no-deprecated': 'error',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/no-mutable-exports': 'error',
    'import/no-named-default': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-nodejs-modules': 'error',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          { target: './src', from: './stories' },
          { target: './src', from: './.storybook' },
        ],
      },
    ],
    'import/no-self-import': 'error',
    'import/no-unassigned-import': [
      'error',
      {
        allow: [
          '**/*.css',
          'babel-polyfill',
          'jest-dom/extend-expect',
          '@storybook/addon-options/register',
          '@storybook/addon-backgrounds/register',
          'storybook-addon-jsx/register',
        ],
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'warn',
    'jest/consistent-test-it': ['error', { fn: 'it' }],
    'jest/lowercase-name': 'error',
    'jest/no-disabled-tests': 'error',
    'jest/no-jasmine-globals': 'error',
    'jest/no-jest-import': 'error',
    'jest/no-large-snapshots': 'error',
    'jest/prefer-to-be-null': 'error',
    'jest/prefer-to-be-undefined': 'error',
    'jest/prefer-to-have-length': 'error',
    'jest/valid-describe': 'error',
    'jest/valid-expect-in-promise': 'error',
    'lodash/import-scope': ['error', 'full'],
    'lodash/prefer-lodash-method': 'off',
    'promise/no-nesting': 'error',
    'promise/no-promise-in-callback': 'error',
    'promise/no-callback-in-promise': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/valid-params': 'error',
    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'error',
    'react/forbid-component-props': ['warn', { forbid: ['style'] }], // TODO: Convert to error once fixed
    'react/forbid-dom-props': ['warn', { forbid: ['style'] }], // TODO: Convert to error once fixed
    'react/forbid-prop-types': 'warn', // TODO: Convert to error once fixed
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-max-depth': ['error', { max: 5 }],
    'react/jsx-no-literals': 'off',
    'react/jsx-no-bind': 'warn', // TODO: Convert to error once fixed
    'react/jsx-one-expression-per-line': 'off',
    'react/no-set-state': 'off',
  },
};