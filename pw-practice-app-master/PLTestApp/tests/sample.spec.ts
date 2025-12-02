import { expect, test } from "@playwright/test";

test.describe("Forms Layouts Test Suite", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:4200/forms/layouts");
        await page.locator('//a[@title="Forms"]').click();
        const layouts = page.locator('//a[@title="Form Layouts"]');
        await expect(layouts).toBeVisible();
        await page.waitForTimeout(6000);
        await page.getByTitle('Form Layouts').click();
    });

    test("Writing all Locator stratagies for Inline Forms", async ({ page }) => {

        const name = page.getByPlaceholder('Jane Doe');
        await name.fill('Karthik Kodati');
        const emailInput = page.locator("//form[@class='form-inline ng-untouched ng-pristine ng-valid']//input[@placeholder='Email']");
        await emailInput.fill('kodati.karthik@gmail.com');
        const rememberMeCheckbox = page.locator('label.label').locator('span').nth(0);
        await rememberMeCheckbox.check();
        await rememberMeCheckbox.click();

    });

    test('Writing Locator strategies for Grid Form', async ({ page }) => {
        console.log("Current URL:", page.url());
        const gridFormEmail = page.locator("//input[@id='inputEmail1']");
        await page.waitForTimeout(6000);
        await gridFormEmail.fill('karthik.kodati@gmail.com');
        const gridFormPassword = page.locator('#inputPassword2');
        await gridFormPassword.fill('Karthik@123');
        const radioButton = page.locator("//span[normalize-space()='Option 1']");
        await radioButton.click();
    });

    test('Writing Locator strategies for Basic Form', async ({ page }) => {
        const basicFormEmail = page.locator("#exampleInputEmail1");
        await basicFormEmail.fill('kodati.karthik@gmail.com');
        const basicFormPassword = page.locator("//input[@id='exampleInputPassword1']");
        await basicFormPassword.fill('Karthik@123');
        const checkMeOutCheckbox = page.getByLabel('Check me out');
        await checkMeOutCheckbox.click();
    });

    test('Writing Locator strategies for Form without labels and Horizontal Form', async ({ page }) => {
        const recipients = page.getByPlaceholder('Recipients')
        await recipients.fill('Karthik');
        await expect(recipients).toHaveValue('Karthik');
        const subject = page.getByRole('textbox', { name: 'Subject' });
        await subject.fill('Playwright Automation');
        await expect(subject).toHaveValue('Playwright Automation');
        const message = page.locator("//textarea[@placeholder='Message']");
        await message.fill('Hello All, This is Karthik here, Welcome to Playwright Automation');
        await expect(message).toHaveValue('Hello All, This is Karthik here, Welcome to Playwright Automation');
    });

    test('Writing Locator strategies for Block Form', async ({ page }) => {
        const firstName = page.getByRole('textbox', { name: /First Name/i });
        await firstName.fill('Karthik');
        await expect(firstName).toHaveValue('Karthik');
        const lastName = page.getByRole('textbox', { name: /Last Name/i });
        await lastName.fill('Kodati');
        await expect(lastName).toHaveValue('Kodati');
        const email = page.getByRole('textbox', { name: /Email/i });
        await email.fill('kodati.karthik@gmail.com');
        await expect(email).toHaveValue('kodati.karthik@gmail.com');
        const website = page.getByRole('textbox', { name: /Website/i });
        await website.fill('www.karthikkodati.com');
        await expect(website).toHaveValue('www.karthikkodati.com');

    });

});


