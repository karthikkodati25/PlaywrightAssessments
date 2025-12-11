import { Page, Locator, expect } from '@playwright/test';

export class PIMPage {
    readonly page: Page;

    // Left navigation
    readonly employeeListTab: Locator;
    readonly addEmployeeTab: Locator;
    readonly reportsTab: Locator;
    readonly configurationToggle: Locator;

    // Employee List form elements
    readonly employeeNameInput: Locator;
    readonly employeeIdInput: Locator;
    readonly employmentStatusSelect: Locator;
    readonly includeSelect: Locator;
    readonly supervisorNameInput: Locator;
    readonly jobTitleSelect: Locator;
    readonly subUnitSelect: Locator;
    readonly searchBtn: Locator;
    readonly resetBtn: Locator;
    readonly addButton: Locator;

    // Employee table (list)
    readonly actionEditBtn: Locator;
    readonly actionDeleteBtn: Locator;

    // Add Employee page
    readonly addFirstName: Locator;
    readonly addMiddleName: Locator;
    readonly addLastName: Locator;
    readonly addEmployeeId: Locator;
    readonly createLoginToggle: Locator;
    readonly saveBtn: Locator;
    readonly cancelBtn: Locator;

    // Reports
    readonly reportsList: Locator;
    readonly predefinedReportRow: Locator;

    constructor(page: Page) {
        this.page = page;

        // left navigation

        this.employeeListTab = page.getByText('Employee List');
        this.addEmployeeTab = page.getByText('Add Employee');
        this.reportsTab = page.getByText('Reports');
        this.configurationToggle = page.getByText('Configuration');

        // search form (selectors selected based on visible placeholders/labels)
        this.employeeNameInput = page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input:nth-child(2)");

        // fallback specific label based selector if multiple similar fields exist
        this.employeeIdInput = page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']");
        this.employmentStatusSelect = page.locator('div').filter({ hasText: '-- Select --' }).first();
        this.includeSelect = page.getByText('Current Employees Only', { exact: true });
        this.supervisorNameInput = page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input:nth-child(2)");
        this.jobTitleSelect = page.locator('div').filter({ hasText: '-- Select --' }).first();
        this.subUnitSelect = page.locator('div').filter({ hasText: '-- Select --' }).first();
        this.searchBtn = page.locator('button:has-text("Search")');
        this.resetBtn = page.getByText('Reset');
        this.addButton = page.getByRole('button', { name: 'Add' });

        // employee table & actions
        this.actionEditBtn = page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1) > i:nth-child(1)");
        this.actionDeleteBtn = page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2) > i:nth-child(1)");

        // Add employee form
        this.addFirstName = page.locator('[name="firstName"]');
        this.addMiddleName = page.locator('[name="firstName"]');
        this.addLastName = page.locator('[name="lastName"]');
        this.addEmployeeId = page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']");
        this.createLoginToggle = page.locator("//span[@class='oxd-switch-input oxd-switch-input--active --label-right']");
        this.saveBtn = page.locator("//button[normalize-space()='Save']");
        this.cancelBtn = page.locator("//button[normalize-space()='Cancel']");

        // Reports
        this.reportsList = page.locator("//div[@class='orangehrm-horizontal-padding orangehrm-vertical-padding']");
        this.predefinedReportRow = page.locator("//div[@class='orangehrm-container']");
    }

    async gotoEmployeeList() {
        // navigate using UI to avoid redirect loop
        await this.page.click('nav >> text=PIM');
        await this.page.click('text=Employee List');
        
        // wait for form header or a stable label
        await this.page.locator('text=Employee Information').first().waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.employeeNameInput).toBeVisible();
    }

    async openAddEmployee() {
        await this.page.click('text=Add Employee');
        await expect(this.addFirstName).toBeVisible();
    }

    async openReports() {
        await this.page.click('text=Reports');
        await expect(this.page.locator('text=Employee Reports')).toBeVisible();
    }

    async openConfiguration() {
        await this.configurationToggle.click();
        // expect some dropdown items to appear
        await expect(this.page.locator("//span[@class='oxd-topbar-body-nav-tab-item']")).toBeVisible();
    }

    async searchEmployee(opts: {
        name?: string;
        id?: string;
        employmentStatus?: string;
        include?: string;
        supervisor?: string;
        jobTitle?: string;
        subUnit?: string;
    }) {
        if (opts.name) {
            await this.employeeNameInput.fill(opts.name);
        }
        if (opts.id) {
            await this.employeeIdInput.fill(opts.id);
        }
        if (opts.employmentStatus) {
            await this.employmentStatusSelect.selectOption({ label: opts.employmentStatus }).catch(() => { });
        }
        if (opts.include) {
            await this.includeSelect.selectOption({ label: opts.include }).catch(() => { });
        }
        if (opts.supervisor) {
            await this.supervisorNameInput.fill(opts.supervisor);
        }
        if (opts.jobTitle) {
            await this.jobTitleSelect.selectOption({ label: opts.jobTitle }).catch(() => { });
        }
        if (opts.subUnit) {
            await this.subUnitSelect.selectOption({ label: opts.subUnit }).catch(() => { });
        }
        await this.searchBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
    async resetSearch() {
        await this.resetBtn.click();
    }
    async clickAddButton() {
        await this.addButton.click();
        await expect(this.addFirstName).toBeVisible();
    }
    async fillAddEmployeeForm(first: string, middle: string | null, last: string, empId?: string) {
        await this.addFirstName.fill(first);
        if (middle) await this.addMiddleName.fill(middle);
        await this.addLastName.fill(last);
        if (empId) {
            await this.addEmployeeId.fill(empId);
        }
    }
    async saveAddEmployee() {
        await this.saveBtn.click();
    }
}