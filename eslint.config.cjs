// eslint.config.js
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = [
  {
    files: ['**/*.{ts,js}'],
    ignores: [
      'node_modules',
      'dist',
      'build',
      'build.js',
      '.yarn',
      'yarn.lock',
      '*.json',
      '*.config.js',
      '*.config.cjs',
      '*.md',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      // 🔹 Auto-remove unused imports (takes priority over @typescript-eslint/no-unused-vars)
      'unused-imports/no-unused-imports': 'error',

      // 🔹 Warn on unused vars (ignore _var, _args) - replaces @typescript-eslint/no-unused-vars
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',

      // Import rules (optional but useful)
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'never',
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off', // TypeScript handles this

      // Prettier integration
      'prettier/prettier': 'error',

      // Allow console logs
      'no-console': 'off',
    },
  },
];
