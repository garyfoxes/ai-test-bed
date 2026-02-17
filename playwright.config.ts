import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  /* Global timeout for each test (30 s) */
  timeout: 30_000,

  /* Timeout for each expect assertion (10 s) */
  expect: {
    timeout: 10_000,
  },

  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',

    /* Navigation / action timeouts to handle slow network */
    navigationTimeout: 15_000,
    actionTimeout: 10_000,
  },

  webServer: {
    command: 'npx http-server -p 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
