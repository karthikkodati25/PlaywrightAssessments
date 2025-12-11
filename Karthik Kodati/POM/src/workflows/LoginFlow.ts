import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
export class LoginFlow {
    readonly page: Page;
    readonly loginPage: LoginPage;
    readonly dashboardPage: DashboardPage;
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
    }
    async loginAs(username: string, password: string) {
        await this.loginPage.goto();
        await this.loginPage.login(username, password);
        await this.dashboardPage.assertLoggedIn();
    }
}