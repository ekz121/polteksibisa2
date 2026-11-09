import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:8082',
    browserName: 'chromium',
    channel: 'msedge',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'phone-320', use: { viewport: { width: 320, height: 740 } } },
    { name: 'phone-390', use: { viewport: { width: 390, height: 844 } } },
    { name: 'phone-430', use: { viewport: { width: 430, height: 932 } } },
    { name: 'tablet-768', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'landscape', use: { viewport: { width: 844, height: 390 } } },
  ],
  webServer: {
    command: 'npm.cmd run web -- --localhost --port 8082',
    url: 'http://localhost:8082',
    reuseExistingServer: false,
    timeout: 180_000,
    env: { CI: '1', EXPO_NO_TELEMETRY: '1' },
  },
});
