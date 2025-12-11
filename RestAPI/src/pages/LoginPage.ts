import { Locator, Page } from '@playwright/test';
export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly forgotLink: Locator;
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"], input#username, input[placeholder="Username"]');
        this.passwordInput = page.locator('input[name="password"], input#password, input[placeholder="Password"]');
        this.loginButton = page.locator('button:has-text("Log In"), input[type="submit"][value="Log In"], button:has-text("LOGIN")');
        this.forgotLink = page.locator('text=Forgot login info');
    }
    async goto() {
        await this.page.goto('/parabank/index.htm');
    }
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        // Wait for navigation or some known selector on landing page
        await this.page.waitForLoadState('networkidle');
    }
}