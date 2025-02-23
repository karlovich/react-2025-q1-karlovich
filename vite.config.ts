import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    coverage: {
      provider: 'v8',
      include: ['**/*.tsx'],
      exclude: ['node_modules', 'dist', '**/App.tsx', '**/main.tsx'],
      thresholds: {
        lines: 73,
        functions: 73,
        branches: 73,
        statements: 73,
      },
    },
  },
});
