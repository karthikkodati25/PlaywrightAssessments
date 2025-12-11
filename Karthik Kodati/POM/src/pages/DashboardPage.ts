import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
 readonly page: Page;
 readonly header: Locator;
 readonly profileMenu: Locator;
 
 constructor(page: Page) {
   this.page = page;
   // Stable unique selectors
   this.header = page.locator('header.oxd-topbar'); // only 1 element
   this.profileMenu = page.locator('.oxd-userdropdown-name'); // only 1 element
 }
 
 async assertLoggedIn() {
   await expect(this.header).toBeVisible({ timeout: 7000 });
   await expect(this.profileMenu).toBeVisible({ timeout: 7000 });
 }
}