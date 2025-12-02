import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.waitForSelector('a[class="logo"]');
    await page.getByTitle('Modal & Overlays').click();
    await page.waitForSelector('[class="ng-tns-c140-10 ng-star-inserted"]')
    await page.getByTitle('Dialog').click();
    await page.waitForTimeout(6000);
});

test('Open Dialog', async ({ page }) => {
    const dialogcard = page.locator('nb-card').filter({ hasText: 'Open Dialog' });
    await dialogcard.getByRole('button', { name: 'Open Dialog with component' }).click();
    const title = await page.locator('nb-dialog-container').locator('nb-card-header').first().textContent();
    expect(title).toEqual('This is a title passed to the dialog component');
    console.log('title', title);
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Dismiss Dialog' }).click();
    await page.waitForTimeout(4000);

    await dialogcard.getByRole('button', { name: 'Open Dialog with template' }).click();
    const title1 = await page.locator('nb-dialog-container').locator('nb-card-header').first().textContent();
    expect(title1).toEqual('Template Dialog');
    console.log('title', title1);
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Close Dialog' }).click();
    await page.waitForTimeout(4000);
});

test('Return result', async ({ page }) => {
    const dialogcard = page.locator('nb-card').filter({ hasText: 'Return Result From Dialog' });
    await dialogcard.getByRole('button', { name: 'Enter Name' }).click();
    const title = await page.locator('nb-dialog-container').locator('nb-card-header').first().textContent();
    expect(title).toEqual('Enter your name');
    console.log('title: ', title);
    await page.waitForTimeout(4000);
    await page.locator('nb-dialog-container').locator('input[placeholder="Name"]').fill('Ashwin');
    await page.waitForTimeout(4000);
    await page.locator('nb-dialog-container').getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(4000);

});

test('Backdrop', async ({ page }) => {
    const dialogcard = page.locator('nb-card', { has: page.locator('//nb-card-header[text()="Open Without Backdrop"]') });
    // dialogcard.highlight();
    await dialogcard.getByRole('button', { name: 'Open Dialog with backdrop' }).click();
    const title = await page.locator('nb-dialog-container').locator('nb-card-header').first().textContent();
    expect(title).toEqual('This is a title passed to the dialog component');
    console.log('title: ', title);
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Dismiss Dialog' }).click();
    await page.waitForTimeout(4000);

    await dialogcard.getByRole('button', { name: 'Open Dialog without backdrop' }).click();
    const title1 = await page.locator('nb-dialog-container').locator('nb-card-header').first().textContent();
    expect(title1).toEqual('Template Dialog');
    console.log('title: ', title1);
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Close Dialog' }).click();
    await page.waitForTimeout(4000);


});

test('Without Backdrop', async ({ page }) => {
    const dialogcard = page.locator('nb-card', { has: page.locator('//nb-card-header[text()="Open Without Backdrop Click"]') });
    // dialogcard.highlight();
    await dialogcard.getByRole('button', { name: 'Open Dialog with backdrop click' }).click();
    const title = await page.locator('nb-dialog-container').locator('nb-card-header').first().textContent();
    expect(title).toEqual('This is a title passed to the dialog component');
    console.log('title: ', title);
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Dismiss Dialog' }).click();
    await page.waitForTimeout(4000);

    await dialogcard.getByRole('button', { name: 'Open without backdrop click' }).click();
    const title1 = await page.locator('nb-dialog-container').locator('nb-card-header').first().textContent();
    expect(title1).toEqual('Template Dialog');
    console.log('title: ', title1);
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Close Dialog' }).click();
    await page.waitForTimeout(4000);
});

test.only('Without escape close', async ({ page }) => {
    const dialogcard = page.locator('nb-card', { hasText: 'Open Without Esc Close' });
    // dialogcard.highlight();
    await dialogcard.getByRole('button', { name: 'Open Dialog with esc close' }).click();
    const title = await page.locator('nb-dialog-container').locator('nb-card-header').first().textContent();
    expect(title).toEqual('This is a title passed to the dialog component');
    console.log('title: ', title);
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Dismiss Dialog' }).click();
    await page.waitForTimeout(4000);

    await dialogcard.getByRole('button', { name: 'Open Dialog without esc close' }).click();
    const title1 = await page.locator('nb-dialog-container').locator('nb-card-header').first().textContent();
    expect(title1).toEqual('Template Dialog');
    console.log('title: ', title1);
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Close Dialog' }).click();
    await page.waitForTimeout(4000);
});