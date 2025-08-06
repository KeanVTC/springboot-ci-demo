// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:8086', // staging container
  },
  retries: 1,
  reporter: 'list',
});
