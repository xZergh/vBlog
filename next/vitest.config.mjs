import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setupTests.ts'],
    include: ['tests/**/*.test.{js,jsx,ts,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
