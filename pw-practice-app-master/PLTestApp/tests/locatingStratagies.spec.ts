import { expect, test } from "@playwright/test";

test.describe("Forms Layouts Test Suite", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:4200/forms/layouts");
    });

    test("Writing all Locator stratagies for Form Layouts", async ({ page }) => {
        await page.waitForTimeout(6000);
        await page.locator('//a[@title="Forms"]').click();
        await page.waitForTimeout(6000);

        const layouts = page.locator('//a[@title="Form Layouts"]');
        await expect(layouts).toBeVisible();
        await page.waitForTimeout(6000);
        await page.getByTitle('Form Layouts').click();
        await page.waitForTimeout(6000);

        const name = page.getByPlaceholder('Jane Doe');
        await name.fill('Karthik Kodati');
        const emailInput = page.locator("//form[@class='form-inline ng-untouched ng-pristine ng-valid']//input[@placeholder='Email']");
        await emailInput.fill('kodati.karthik@gmail.com');
        const rememberMeCheckbox = page.locator('label.label').locator('span').nth(0);
       await rememberMeCheckbox.check();
        await rememberMeCheckbox.click();
        // const submitBtn = page.locator("form[class='form-inline ng-untouched ng-pristine ng-valid'] button[type='submit']");

        const UsingTheGrid = page.locator('#inputEmail1');
        await UsingTheGrid.clear();
        await UsingTheGrid.fill('kodati.karthik@gmail.com');
        const passwordGrid = page.locator('#inputPassword2');
        await passwordGrid.fill('Karthik@123');
        const radioButton = page.locator("//span[normalize-space()='Option 1']");
        await radioButton.click();
        const signInButton = page.locator("//button[@class='appearance-filled size-medium shape-rectangle status-primary nb-transition'][normalize-space()='Sign in']");


        const BasicForm = page.getByRole('textbox', { name: /Email address/i });
        await BasicForm.fill('kodati.karthik@gmail.com');
        const basicPassword = page.locator('#exampleInputPassword1');
        await basicPassword.fill('Karthik@123');
        const chekBox = page.locator('label.label').locator('span').nth(0);
        await chekBox.click();
        const submitBasicForm = page.locator("//button[@class='appearance-filled size-medium shape-rectangle status-danger nb-transition']");


        const FormWithoutLabelsEmail = page.locator('//nb-card-header[text()="Form without labels"]//following::input[@id="inputEmail3"]'); 
        const recipients = page.getByPlaceholder('Recipients')
        await recipients.fill('Karthik');
        const subject = page.getByRole('textbox', { name: 'Subject' });
        await subject.fill('Playwright Automation');
        const message = page.locator("//textarea[@placeholder='Message']");
        await message.fill('Hello All, This is Karthik here, Welcome to Playwright Automation');
        const sendBtn = page.locator("//button[normalize-space()='Send']");


        const HorizontalFormEmail = page.locator('//nb-card-header[text()="Horizontal form"]//following::input[@id="inputEmail3"]');
        await HorizontalFormEmail.fill('kodati.karthik@gmail.com');
        const horizontalPassword = page.locator('//nb-card-header[text()="Horizontal form"]//following::input[@id="inputPassword3"]');  
        await horizontalPassword.fill('Karthik@123');
        const rememberMe = page.locator("div[class='checkbox'] span[class='custom-checkbox']");
        await rememberMe.click();
        const signInBtn = page.locator('//nb-card-header[text()="Horizontal form"]//following::button[@type="submit"]');
    });
});