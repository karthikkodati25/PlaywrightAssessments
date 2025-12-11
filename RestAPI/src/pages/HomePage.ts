import { Page, Locator } from '@playwright/test';
export class HomePage {
    readonly page: Page;
    readonly welcomeBanner: Locator;
    readonly logoutLink: Locator;
    readonly accountsLink: Locator;
    constructor(page: Page) {
        this.page = page;
        this.welcomeBanner = page.locator('text=Welcome to ParaBank').first();
        this.logoutLink = page.locator('text=Log Out, text=Logout');
        this.accountsLink = page.locator('a:has-text("Accounts Overview"), text=Accounts Overview');
    }
    async isVisible() {
        return await this.welcomeBanner.isVisible();
    }
}