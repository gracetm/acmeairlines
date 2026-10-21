import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:5174', channel: 'chrome', ...devices['Desktop Chrome'] },
  webServer: { command: 'npm run dev -- --port 5174', url: 'http://localhost:5174', reuseExistingServer: true },
});
