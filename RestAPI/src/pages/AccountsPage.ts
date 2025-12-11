import { Page, Locator } from '@playwright/test';
export class AccountsPage {
    readonly page: Page;
    readonly accountsTable: Locator;
    readonly firstAccountLink: Locator;
    constructor(page: Page) {
        this.page = page;
        this.accountsTable = page.locator('table:has-text("Account")');
        this.firstAccountLink = page.locator('a.accountLink').first();
    }
    async goto() {
        await this.page.goto('/parabank/overview.htm');
        await this.accountsTable.waitFor({ state: 'visible' });
    }
    async openFirstAccount() {
        await this.firstAccountLink.click();
        await this.page.waitForLoadState('networkidle');
    }
}