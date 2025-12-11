import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { TransferPage } from '../../src/pages/TransferPage';
import { testUser } from '../../src/utils/testData';
test('UI - transfer funds', async ({ page }) => {
    const login = new LoginPage(page);
    const transfer = new TransferPage(page);
    await login.goto();
    await login.login(testUser.username, testUser.password);
    await transfer.goto();
    // NOTE: These values must match actual account IDs visible in the UI selects
    // You might want to programmatically read the account ids first.
    await transfer.transfer('10.00', '12345', '54321');
    expect(await transfer.successMsg.isVisible()).toBeTruthy();
});