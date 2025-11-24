import { defineConfig } from 'eslint/config'
import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
      sourceType: 'commonjs',
    },
    ignores: [
      'coverage/*',
      'node_modules/*',
      'build/*',
    ],
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': ['error'],
      'no-case-declarations': [0],
      'no-constant-condition': [0],
      'no-async-promise-executor': [0],
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    ignores: [
      'coverage/*',
      'node_modules/*',
      'build/*',
    ],
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': ['error'],
      'no-case-declarations': [0],
      'no-constant-condition': [0],
      'no-async-promise-executor': [0],
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/camelcase': 0,
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-empty-object-type': 0,
    },
  },
],
)
