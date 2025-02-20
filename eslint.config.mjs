import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/backend/**/*.{ts}', 'src/**/*.js'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } }
    },
    plugins: {
      perfectionist,
      react
    },
    rules: {
      'perfectionist/sort-imports': 'error',
      'perfectionist/sort-jsx-props': 'error',
      'perfectionist/sort-objects': 'error',
      'perfectionist/sort-object-types': 'error',
      'perfectionist/sort-interfaces': 'error',
      'perfectionist/sort-classes': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: 'if', prev: '*' },
        {
          blankLine: 'always',
          next: '*',
          prev: ['const', 'let', 'var']
        },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var']
        }
      ],
      'react/self-closing-comp': 'error'
    }
  },
  {
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
    files: ['src/backend/**/*.{ts}'],
    languageOptions: {
      globals: globals.node
    }
  }
);
