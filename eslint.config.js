import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', '.yarn/**'],
  },
  // JavaScript 파일용
  {
    files: ['**/*.js'],
    ...eslint.configs.recommended,
    rules: {
      'no-console': 'warn',
    },
  },
  // TypeScript 파일용
  {
    files: ['**/*.ts'],
    ...eslint.configs.recommended,
    ...tseslint.configs.recommended[0],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'warn',
    },
  },
];
