import { test, expect } from '@playwright/test';
import { PIMPage } from '../../src/pages/PIMPage';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { SidebarPage } from '../../src/pages/SidebarPage';
import { VALID } from '../../test-data/credentials';

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const dash = new DashboardPage(page);
    const sidebar = new SidebarPage(page);

    // go to login and sign in
    await login.goto();
    await login.login(VALID.username, VALID.password);
    await dash.assertLoggedIn();
});

    test.describe('PIM module - basic flows', () => {

        test('Employee List - search and reset', async ({ page }) => {
            const pim = new PIMPage(page);

            // go to employee list (assumes logged in)
            await pim.gotoEmployeeList();

            // basic visibility checks for form items
            await expect(pim.employeeNameInput).toBeVisible();
            await expect(pim.employeeIdInput).toBeVisible();
            await expect(pim.searchBtn).toBeVisible();

            // perform a search by id (this demo site has numeric ids)
            await pim.searchEmployee({ id: '0465' });

            // reset and ensure fields cleared (basic check)
            await pim.resetSearch();
            await expect(pim.employeeNameInput).toBeEmpty();
        });

        test('Configuration menu items visible', async ({ page }) => {
            const pim = new PIMPage(page);
            await pim.gotoEmployeeList();
            await pim.openConfiguration();

            // check for known configuration options
            await expect(page.locator('text=Optional Fields')).toBeVisible();
            await expect(page.locator('text=Custom Fields')).toBeVisible();
            await expect(page.locator('text=Data Import')).toBeVisible();
        });

        test('Open Add Employee, fill basics, cancel', async ({ page }) => {
            const pim = new PIMPage(page);
            await pim.gotoEmployeeList();

            // open Add Employee tab/page
            await pim.openAddEmployee();

            // fill form
            await pim.fillAddEmployeeForm('TestFirst', 'M', 'Last', '2000');

            // click Cancel to avoid making changes in demo account
            await pim.cancelBtn.click();

            // back to employee list
            await expect(pim.employeeListTab).toBeVisible();
        });

        test('Reports - open and view a predefined report', async ({ page }) => {
            const pim = new PIMPage(page);
            await pim.gotoEmployeeList();
            await pim.openReports();

            // There are predefined reports in the screenshots like "Employee Contact info report"
            const reportName = 'Employee Contact info report';
            const reportRow = page.locator("//div[@class='orangehrm-container']");
            await expect(reportRow).toBeVisible();

            // Open the report (click the row or action in that row)
            await reportRow.click();

            // verify report opened - look for report title
            await expect(page.locator(`text=${reportName}`)).toBeVisible();

        });
    });
