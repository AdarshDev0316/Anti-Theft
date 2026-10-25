import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@vladmandic/face-api': path.resolve(__dirname, 'node_modules/@vladmandic/face-api/dist/face-api.esm.js'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
  },
});
