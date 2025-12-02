import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' });

test.beforeEach('launch url', async ({ page }) => {

    await page.goto('http://localhost:4200/pages/iot-dashboard');
    await page.waitForSelector('a[class="logo"]');
    await page.waitForTimeout(1000);
});

test('practice -Temperature sliders on homepage please practice code for mouse movements and 5 set of coordinates for tempguage sliders', async ({ page }) => {

    // update attribute
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempGauge.evaluate(node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })
    await tempGauge.click()
    await page.waitForTimeout(1000);

    // mouse movement
    const tempBox = page.locator('nb-tab[tabtitle="Temperature"]').locator('ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();

    // finding the position
    const box = await tempBox.boundingBox();

    // get the middle position
    const x = box.x + box.width / 2;
    const y = box.y + box.width / 2;
    await page.waitForTimeout(1000);

    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x + 100, y);
    await page.waitForTimeout(1000);
    await page.mouse.move(x + 100, y + 100);
    await page.waitForTimeout(1000);
    await page.mouse.move(x + 100, y - 50);//outside bounding box
    await page.waitForTimeout(1000);
    await page.mouse.move(x + 100, y - 100);
    await page.waitForTimeout(1000);
    await page.mouse.move(x + 100, y - 200);
    await page.waitForTimeout(1000);
    await page.mouse.move(x + 100, y - 300);
    await page.waitForTimeout(1000);
    await page.mouse.move(x - 100, y - 400);
    await page.waitForTimeout(1000);
    await page.mouse.up();

    await page.waitForTimeout(1000);
    await expect(tempBox).toContainText(' 20  Celsius ');

});
