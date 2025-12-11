// src/pages/SidebarPage.ts

import { Page, Locator, expect } from '@playwright/test';

export class SidebarPage {

    readonly page: Page;

    // container for the whole sidebar (best-effort selection)

    readonly sidebarContainer: Locator;

    // explicit menu item locators (common items visible in screenshot)

    readonly admin: Locator;

    readonly pim: Locator;

    readonly leave: Locator;

    readonly time: Locator;

    readonly recruitment: Locator;

    readonly myInfo: Locator;

    readonly performance: Locator;

    readonly dashboard: Locator;

    readonly directory: Locator;

    readonly maintenance: Locator;

    // a locator for every menu item text (scoped)

    readonly menuItems: Locator;

    constructor(page: Page) {

        this.page = page;

        // Try to scope the sidebar; fallback to searching globally by text

        this.sidebarContainer = page.locator('aside, nav[role="navigation"], .oxd-sidepanel, .sidebar').first();

        // Individual items: prefer role/text locators, fallback to common selectors

        const mk = (text: string) =>

            this.sidebarContainer.locator(`a:has-text("${text}"), button:has-text("${text}"), span:has-text("${text}"), li:has-text("${text}")`);

        this.admin = mk('Admin').first();

        this.pim = mk('PIM').first();

        this.leave = mk('Leave').first();

        this.time = mk('Time').first();

        this.recruitment = mk('Recruitment').first();

        this.myInfo = mk('My Info').first();

        this.performance = mk('Performance').first();

        this.dashboard = mk('Dashboard').first();

        this.directory = mk('Directory').first();

        this.maintenance = mk('Maintenance').first();

        // Generic list of items inside sidebar (useful for enumerations)

        this.menuItems = this.sidebarContainer.locator('a, button, li, span').filter({ hasText: /[A-Za-z]/ });
    }

    // Wait until the sidebar is visible & stable

    async waitForSidebar(timeout = 7000) {

        await expect(this.sidebarContainer).toBeVisible({ timeout });

    }

    // Click specific known items with helpful error message

    async clickAdmin() {

        await this._clickMenuItem(this.admin, 'Admin');

    }

    async clickPIM() {

        await this._clickMenuItem(this.pim, 'PIM');

    }

    async clickLeave() {

        await this._clickMenuItem(this.leave, 'Leave');

    }

    async clickTime() {

        await this._clickMenuItem(this.time, 'Time');

    }

    async clickRecruitment() {

        await this._clickMenuItem(this.recruitment, 'Recruitment');

    }

    async clickMyInfo() {

        await this._clickMenuItem(this.myInfo, 'My Info');

    }

    async clickPerformance() {

        await this._clickMenuItem(this.performance, 'Performance');

    }

    async clickDashboard() {

        await this._clickMenuItem(this.dashboard, 'Dashboard');

    }

    async clickDirectory() {

        await this._clickMenuItem(this.directory, 'Directory');

    }

    async clickMaintenance() {

        await this._clickMenuItem(this.maintenance, 'Maintenance');

    }

    // Generic click by visible menu text (case-insensitive)

    async clickMenuByName(name: string) {

        // try scoped first

        const scoped = this.sidebarContainer.locator(`a:has-text("${name}"), button:has-text("${name}"), li:has-text("${name}"), span:has-text("${name}")`);

        if (await scoped.count() > 0) {

            await scoped.first().click();

            return;

        }

        // fallback: global search

        const global = this.page.locator(`text=${name}`);

        if (await global.count() > 0) {

            await global.first().click();

            return;

        }

        throw new Error(`Sidebar menu item not found: "${name}"`);

    }

    // return visible menu item texts in order

    async getVisibleMenuTexts(): Promise<string[]> {

        await this.waitForSidebar();

        const texts: string[] = [];

        const itemsCount = await this.menuItems.count();

        for (let i = 0; i < itemsCount; i++) {

            const t = (await this.menuItems.nth(i).innerText()).trim();

            if (t) texts.push(t);

        }

        // Filter duplicates and empty

        return [...new Set(texts)].filter(s => s.length > 0);

    }

    // Assert that a particular menu item is visible (with helpful timeout)

    async assertMenuItemVisible(name: string, timeout = 5000) {

        const item = this.sidebarContainer.locator(`a:has-text("${name}"), button:has-text("${name}"), li:has-text("${name}"), span:has-text("${name}")`);

        await expect(item.first()).toBeVisible({ timeout });

    }

    // helper: private click routine with message

    private async _clickMenuItem(locator: Locator, friendlyName: string) {

        if (await locator.count() === 0) {

            // If the explicit locator did not match, try generic name-click

            await this.clickMenuByName(friendlyName);

            return;

        }

        await locator.first().click();

    }

}
