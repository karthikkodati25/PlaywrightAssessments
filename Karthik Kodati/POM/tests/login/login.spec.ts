import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { VALID, INVALID } from '../../test-data/credentials';

test.describe('OrangeHRM Login (POM)', () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
    });
    test('Successful login', async ({ page }) => {
        const login = new LoginPage(page);
        const dash = new DashboardPage(page);
        await login.goto();
        await login.login(VALID.username, VALID.password);
        await dash.assertLoggedIn();
        await expect(page).toHaveURL(/dashboard|pim|index/);
    });

    test('Invalid credentials show error', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login(INVALID.username, INVALID.password);
        await login.assertLoginFailed(/invalid|fail|incorrect/i);
    });
    
    test('Empty fields validation', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.clearForm();
        await login.submitEmpty();
        await login.assertLoginFailed(/required|enter|please/i);
    });
});