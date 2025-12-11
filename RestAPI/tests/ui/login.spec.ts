import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';
import { testUser } from '../../src/utils/testData';
test.describe('UI - Login', () => {
    test('should login successfully via UI', async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        const home = new HomePage(page);
        await login.goto();
        await login.login(testUser.username, testUser.password);
        expect(await home.isVisible()).toBeTruthy();
    });
});