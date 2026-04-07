import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    loader: 'jsx',
    include: /.*\.[jt]sx?$/,
    jsx: 'automatic',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setupTests.js'],
    include: ['tests/**/*.test.{js,jsx}'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
