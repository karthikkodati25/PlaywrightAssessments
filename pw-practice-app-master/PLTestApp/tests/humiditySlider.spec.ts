import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' });

test.beforeEach('launch url', async ({ page }) => {

    await page.goto('http://localhost:4200/pages/iot-dashboard');
    await page.waitForSelector('a[class="logo"]');
    await page.waitForTimeout(1000);
});

test('Test 13 for humidity slider please write code for these values 10  50  100', async ({ page }) => {


    const humidity = page.getByText('Humidity');
    await humidity.click();
    await page.locator('[tabtitle="Humidity"] ngx-temperature-dragger').waitFor({ state: 'visible' });

    const tempBox = page.locator('nb-tab[tabtitle="Humidity"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();

    const box = await tempBox.boundingBox();
    if (!box) throw new Error('ngx-temperature-dragger boundingBox() returned null.');

    const xCenter = box.x + box.width / 2;
    const yCenter = box.y + box.height / 2;

    await page.mouse.move(xCenter, yCenter);
    await page.waitForTimeout(200);

    const target = 10;
    let attempts = 0;
    const maxAttempts = 300;
    const step = 1;

    //------------- move slider to 10 ------------------
    await page.mouse.down();

    while (true) {

        const value = (await tempBox.textContent() || '').trim();
        console.log('Current value=' + value);

        if (value.includes('10')) {
            console.log('Found value 10');
            break;
        }

        // Nudge the mouse a bit each iteration
        await page.mouse.move(xCenter - attempts * step, yCenter - attempts * step, { steps: 2 });
        await page.waitForTimeout(100);
        await page.mouse.wheel(0, 2);
        attempts++;
    }

    await page.mouse.up();
    await page.waitForTimeout(1000);
    await expect(tempBox).toContainText(' 9 ');

    //------------------------move to 50 --------------------------------
    await page.reload();
    page.waitForTimeout(2000);
    await page.waitForSelector('a[class="logo"]');
    await humidity.click();
    await page.locator('[tabtitle="Humidity"] ngx-temperature-dragger').waitFor({ state: 'visible' });

    await page.mouse.move(xCenter, yCenter);
    await page.waitForTimeout(2000);
    await page.mouse.down();
    await page.waitForTimeout(1000);
    await expect(tempBox).toContainText(' 50 ');

    //-----------------  move to 100 -----------

    await page.reload();
    page.waitForTimeout(2000);
    await page.waitForSelector('a[class="logo"]');
    await humidity.click();
    await page.locator('[tabtitle="Humidity"] ngx-temperature-dragger').waitFor({ state: 'visible' });

    await page.mouse.move(xCenter, yCenter);
    await page.waitForTimeout(2000);
    await page.mouse.down();


    //------------- move slider to 100 ------------------

    while (true) {

        const value = (await tempBox.textContent() || '').trim();
        console.log('Current value=' + value);

        if (value === '100') {
            console.log('Found value 100');
            break;
        }

        // Nudge the mouse a bit each iteration
        await page.mouse.move(xCenter + attempts * step, yCenter + attempts * step, { steps: 2 });
        await page.waitForTimeout(100);
        await page.mouse.wheel(0, 2);
        attempts++;
    }

    await page.mouse.up();
    await page.waitForTimeout(1000);
    await expect(tempBox).toContainText(' 100 ');

    await page.waitForTimeout(3000);

});