import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    exclude: [
      'node_modules',
      'dist',
      '**/App.tsx',
      '**/main.tsx',
      '**/SearchResults.test.tsx',
      '**/SearchFallback.test.tsx',
      '**/Pager.test.tsx',
    ],
    coverage: {
      provider: 'v8',
      include: ['**/*.tsx'],
      exclude: ['node_modules', 'dist', '**/App.tsx', '**/main.tsx'],
      thresholds: {
        lines: 10,
        functions: 10,
        branches: 10,
        statements: 10,
      },
    },
  },
});
