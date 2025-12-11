import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();
export default defineConfig({
    testDir: './tests',
    timeout: 60_000,
    expect: { timeout: 5000 },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: [['list']],
    use: {
        baseURL: process.env.BASE_URL || 'https://parabank.parasoft.com',
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10_000,
        navigationTimeout: 30_000,
        video: 'retain-on-failure'
    },
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'webkit', use: { browserName: 'webkit' } }
    ]
});