import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('check for background colors', async ({ page }) => {

    await page.goto('http://localhost:4200/pages/iot-dashboard');
    await page.waitForSelector('a[class="logo"]');
    await page.waitForTimeout(1000);


    const color = ["Light", "Dark", "Cosmic", "Corporate"];
    const rgbColor = {

        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    const themeButton = page.locator('ngx-header nb-select');
    await themeButton.click();
    await page.waitForTimeout(2000);
    const optionList = page.locator('div[class="cdk-overlay-pane"] nb-option-list');
    await optionList.locator('nb-option').filter({ hasText: color[0] }).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('nb-layout-header')).toHaveCSS('background-color', rgbColor.Light);

    await themeButton.click();
    await page.waitForTimeout(2000);
    await optionList.locator('nb-option').filter({ hasText: color[1] }).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('nb-layout-header')).toHaveCSS('background-color', rgbColor.Dark);

    await themeButton.click();
    await page.waitForTimeout(2000);
    await optionList.locator('nb-option').filter({ hasText: color[2] }).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('nb-layout-header')).toHaveCSS('background-color', rgbColor.Cosmic);

    await themeButton.click();
    await page.waitForTimeout(2000);
    await optionList.locator('nb-option').filter({ hasText: color[3] }).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('nb-layout-header')).toHaveCSS('background-color', rgbColor.Corporate);


    await page.waitForTimeout(3000);


});

test('select country', async ({ page }) => {

    await page.goto('https://www.globalsqa.com/demo-site/select-dropdown-menu/');
    const options = await page.waitForSelector('select');
    await page.waitForTimeout(2000);

    //select by visible text
    options.selectOption('India');
    //select by value
    //options.selectOption({value:'IND'}); 

    console.log('selected value=' + await options.innerText())
    await expect(page.locator('select')).toHaveValue('IND');
});