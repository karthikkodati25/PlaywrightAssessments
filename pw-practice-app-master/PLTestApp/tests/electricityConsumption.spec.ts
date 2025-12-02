import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' });

test.beforeEach('launch url', async ({ page }) => {

    await page.goto('http://localhost:4200/pages/iot-dashboard');
    await page.waitForSelector('a[class="logo"]');
    await page.waitForTimeout(1000);
});

test('Test 15 locate photo manager and transfer all photos to trash', async ({ page }) => {

    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');
    await page.locator('[id="header"]').waitFor({ state: 'visible' });

    await page.waitForSelector('[rel-title="Photo Manager"] iframe');
    const frame1 = page.frameLocator('[rel-title="Photo Manager"] iframe');

    const data1 = frame1.getByText("High Tatras", { exact: true });
    await data1.waitFor({ state: 'visible' });
    const data2 = frame1.getByText("High Tatras 2", { exact: true });
    const data3 = frame1.getByText("High Tatras 3", { exact: true });
    const data4 = frame1.getByText("High Tatras 4", { exact: true });
    const dragTo = frame1.locator('#trash');

    // drag and drop
    await data1.dragTo(dragTo);
    await page.waitForTimeout(500);
    await data2.dragTo(dragTo);
    await page.waitForTimeout(100);

    //using mouse actions
    await data3.hover();
    await page.mouse.down();
    await dragTo.hover();
    await page.mouse.up();
    await page.waitForTimeout(500);

    await data4.hover();
    await page.mouse.down();
    await dragTo.hover();
    await page.mouse.up();
    await page.waitForTimeout(1000);

    //assertion
    await expect(frame1.locator('div[id="trash"] li')).toHaveCount(4);
    await expect(frame1.locator('[rel-title="Photo Manager"] iframe')).toHaveCount(0);

    await page.waitForTimeout(3000);

});

