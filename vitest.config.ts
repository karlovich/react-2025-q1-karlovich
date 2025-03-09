import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { relative, resolve } from 'path';

export default defineConfig({
  plugins: [react(), stubNextAssetImport()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    exclude: ['node_modules', 'dist', '.next'],
    coverage: {
      provider: 'v8',
      include: ['**/*.tsx'],
      exclude: ['node_modules', 'dist', '.next'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});

function stubNextAssetImport() {
  return {
    name: 'stub-next-asset-import',
    transform(_code: string, id: string) {
      if (/(jpg|jpeg|png|webp|gif|svg)$/.test(id)) {
        const imgSrc = relative(process.cwd(), id).split('\\').join('/');

        return {
          code: `export default { src: '/${imgSrc}', height: 1, width: 1 }`,
        };
      }
    },
  };
}
