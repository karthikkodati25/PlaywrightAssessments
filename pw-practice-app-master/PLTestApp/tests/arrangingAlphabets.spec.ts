import { test, expect } from '@playwright/test';

test.beforeEach('launch of url and naviagting to Tables & data --> Smart Table', async ({ page }) => {

    await page.goto('http://localhost:4200/pages/iot-dashboard');
    await page.waitForSelector('a[class="logo"]');
    await page.waitForTimeout(1000);

    await page.getByTitle('Tables & Data').waitFor({ state: 'visible' });
    await page.getByTitle('Tables & Data').click();
    await page.getByTitle('Smart Table').waitFor({ state: 'visible' });
    await page.getByTitle('Smart Table').click();
    await page.waitForSelector('nb-card');
    await page.waitForTimeout(2000);

});

test('Searching for First names starting with A B M and J then count and names and arrange first names alphabetically', async ({ page }) => {


    const alphabets = ["A", "B", "M", "J"];

    for (let dat of alphabets) {
        let arr = [];
        const firstNameInput = page.locator('input-filter').getByPlaceholder('First Name');
        await firstNameInput.hover();
        await page.waitForTimeout(1000);
        await firstNameInput.click();
        await firstNameInput.clear();
        await firstNameInput.fill(dat);
        await page.waitForTimeout(1000);

        const nextButton = await page.locator('a[aria-label="Next"]');
        if (await nextButton.isVisible()) {
            await nextButton.hover();
            await page.waitForTimeout(1000);
            while (true) {
                const columns = await page.locator('table tbody tr td:nth-child(3)');

                for (let firstName of await columns.all()) {
                    await expect(firstName).toContainText(new RegExp(dat, "i"));
                    arr.push(await firstName.textContent());
                }

                if (await page.locator('ng2-smart-table-pager ul li').last().getAttribute('class') === 'ng2-smart-page-item page-item disabled') {
                    await page.reload();
                    await page.waitForTimeout(1000);
                    await page.locator('input-filter').getByPlaceholder('First Name').waitFor({ state: 'visible' });
                    break;
                }

                await nextButton.click();
                await page.waitForTimeout(1000);

            }

        }

        else {

            const columns = await page.locator('table tbody tr td:nth-child(3)');
            for (let firstName of await columns.all()) {
                await expect(firstName).toContainText(new RegExp(dat, "i"));
                arr.push(await firstName.textContent());
            }

        }

        console.log('Filter value searched by ' + dat + "=" + [...arr].sort());
        console.log('Total length searched by ' + dat + "=" + arr.length);

    }


});