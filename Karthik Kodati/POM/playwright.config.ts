import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
 testDir: 'tests',
 timeout: 30 * 1000,
 expect: { timeout: 5000 },
 retries: process.env.CI ? 2 : 0,
 reporter: [['list'], ['html', { outputFolder: 'reports/html-report' }]],
 use: {
   baseURL: process.env.ORANGEHRM_URL || 'https://opensource-demo.orangehrmlive.com/',
   headless: true,
   viewport: { width: 1280, height: 800 },
   actionTimeout: 10_000,
   ignoreHTTPSErrors: true,
   trace: 'on-first-retry'
 },
 projects: [
   { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
 ],
});