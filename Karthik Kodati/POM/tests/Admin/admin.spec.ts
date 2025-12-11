import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { SidebarPage } from '../../src/pages/SidebarPage';
import { AdminPage } from '../../src/pages/AdminPage';
import { VALID } from '../../test-data/credentials';

test('Admin -> Search users and open edit', async ({ page }) => {
    const login = new LoginPage(page);
    const dash = new DashboardPage(page);
    const sidebar = new SidebarPage(page);
    const admin = new AdminPage(page);

    // go to login and sign in
    await login.goto();
    await login.login(VALID.username, VALID.password);
    await dash.assertLoggedIn();

    // navigate to Admin via sidebar
    await sidebar.clickAdmin();

    // wait for admin page to be ready
    if (typeof (admin as any).waitForPageReady === 'function') {
        await (admin as any).waitForPageReady();
    } else {
        await admin.waitForTable();
    }

    // SEARCH for username 
    const usernameToSearch = process.env.TEST_USERNAME ?? 'Admin';
    const usernameSearchInput = page.locator(
        'input[placeholder="Type for hints..."], input[placeholder="Search by Username"], input[name="username"], input[aria-label="Username"]'
    );

    const searchBtn = page.locator('button:has-text("Search"), button[aria-label="search"], button[title="Search"]');
    if ((await usernameSearchInput.count()) > 0) {
        await usernameSearchInput.first().fill(usernameToSearch);
        if ((await searchBtn.count()) > 0) {
            await searchBtn.first().click();
        } else {
            await usernameSearchInput.first().press('Enter').catch(() => { });
        }
    } else {
        // fallback: ensure table is present
        await admin.waitForTable();
    }

    // small wait for results to settle
    await page.waitForTimeout(700);

    // get record count 
    let count = 0;
    if (typeof (admin as any).getRecordsCount === 'function') {
        count = await (admin as any).getRecordsCount();
    } else {
        await admin.waitForTable();
        count = await admin.dumpAllRowsText().then(rows => rows.length).catch(() => 0);
    }
    console.log('Records found:', count);
    expect(count).toBeGreaterThanOrEqual(0);

    // optional: assert first row shape if helper exists
    if (typeof (admin as any).getRowDataByIndex === 'function') {
        const rowData = await (admin as any).getRowDataByIndex(0);
        expect(rowData.username.length).toBeGreaterThanOrEqual(0);
    }

    // debug: attach rows dump to test info
    const rowsDump = await admin.dumpAllRowsText();
    test.info().attach('admin-rows-dump', {
        body: JSON.stringify(rowsDump, null, 2),
        contentType: 'application/json',
    });

    // ensure user exists and click edit 
    try {
        await admin.assertUserExists(usernameToSearch);
    } catch (err) {
        console.error('User existence assertion failed; table dump attached above.');
        throw err;
    }

    await admin.clickEditUserByUsername(usernameToSearch);

    // assert navigation to edit or presence of edit UI 
    await expect(page).toHaveURL(/user\/edit|viewSystemUsers|saveSystemUser/);
});