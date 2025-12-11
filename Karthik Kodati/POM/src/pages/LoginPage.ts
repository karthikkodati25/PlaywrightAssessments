import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly forgotPasswordLink: Locator;
    readonly rememberMeCheckbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"], input#txtUsername, input[placeholder="Username"]');
        this.passwordInput = page.locator('input[name="password"], input#txtPassword, input[placeholder="Password"]');
        this.loginButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Login")');
        this.errorMessage = page.locator('.oxd-text--span, .message, .oxd-alert, .error').first();
        this.forgotPasswordLink = page.locator('a:has-text("Forgot"), a[href*="reset"], a:has-text("Reset")');
        this.rememberMeCheckbox = page.locator('input[type="checkbox"][name*="remember"], input#remember');
    }

    async goto(url?: string) {
        const finalUrl = url ?? '/';
        await this.page.goto(finalUrl);
        await expect(this.usernameInput).toBeVisible({ timeout: 5000 });
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async assertLoginFailed(message?: RegExp | string) {
        await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
        if (message) await expect(this.errorMessage).toContainText(message);
    }

    async clearForm() {
        await this.usernameInput.fill('');
        await this.passwordInput.fill('');
    }

    async submitEmpty() {
        await this.loginButton.click();
    }

    async isForgotPasswordVisible() {
        return this.forgotPasswordLink.isVisible();
    }
    
    async toggleRememberMe() {
        if ((await this.rememberMeCheckbox.count()) > 0) await this.rememberMeCheckbox.click();
    }
}