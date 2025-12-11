import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { AccountsPage } from '../../src/pages/AccountsPage';
import { testUser } from '../../src/utils/testData';
test('UI - accounts overview accessible after login', async ({ page }) => {
    const login = new LoginPage(page);
    const accounts = new AccountsPage(page);
    await login.goto();
    await login.login(testUser.username, testUser.password);
    await accounts.goto();
    expect(await accounts.accountsTable.isVisible()).toBeTruthy();
});