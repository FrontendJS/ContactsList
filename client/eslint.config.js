import globals from 'globals';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react,
      prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
];
