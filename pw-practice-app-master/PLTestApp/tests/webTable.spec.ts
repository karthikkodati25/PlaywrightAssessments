import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' });

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

test('Test to Accept/Dismiss the dialog or alert after click on delete', async ({ page }) => {

    page.on('dialog', async dialog => {

        console.log('alart is=' + dialog.message());
        await page.waitForTimeout(1000);
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        await dialog.accept();
    })

    const tableAll = page.locator('table tbody');
    const deleteButton = tableAll.locator('tr').filter({ hasText: 'mdo@gmail.com' }).locator('.nb-trash');
    await deleteButton.hover();
    await deleteButton.click();
    await expect(tableAll.locator('tr').first()).not.toHaveText('mdo@gmail.com');
    //await expect(tableAll.locator('tr').first()).toHaveText('1MarkOtto@mdomdo@gmail.com28');
    console.log('accept and dismiss is working');
});

test('Test for changing the value of row no 4', async ({ page }) => {

    const tableAll = page.locator('table tbody');
    //  const editButton = tableAll.locator('tr').filter({ hasText: 'snow@gmail.com' }).locator('.nb-edit');
    const editButton = tableAll.locator('tr').nth(3).locator('.nb-edit');
    await editButton.hover();

    const locator_4thRrow = tableAll.locator('tr').nth(3).locator('td');
    let allDataOf_4thRow = await locator_4thRrow.allTextContents();
    allDataOf_4thRow.shift();// removing the first element due to blank value
    console.log('values are=' + allDataOf_4thRow);

    // before edit all data
    const userId = allDataOf_4thRow[0];
    const userFirstName = allDataOf_4thRow[1];
    const userLastName = allDataOf_4thRow[2];
    const userName = allDataOf_4thRow[3];
    const userEmail = allDataOf_4thRow[4];
    const userAge = allDataOf_4thRow[5];

    console.log('userId=' + userId);
    console.log('userFirstName=' + userFirstName);
    console.log('userLastName=' + userLastName);
    console.log('userName=' + userName);
    console.log('userEmail=' + userEmail);
    console.log('userAge=' + userAge);

    // click on edit button
    await editButton.click();

    // enter first name
    await tableAll.locator('input[placeholder="First Name"]').waitFor({ state: 'visible' });
    await expect(tableAll.locator('input[placeholder="First Name"]')).toBeVisible();
    await expect(tableAll.locator('input[placeholder="First Name"]')).toBeEditable();
    await tableAll.locator('input[placeholder="First Name"]').clear();
    await tableAll.locator('input[placeholder="First Name"]').fill('karthik');

    // enter last name
    await tableAll.locator('input[placeholder="Last Name"]').waitFor({ state: 'visible' });
    await expect(tableAll.locator('input[placeholder="Last Name"]')).toBeVisible();
    await expect(tableAll.locator('input[placeholder="Last Name"]')).toBeEditable();
    await tableAll.locator('input[placeholder="Last Name"]').clear();
    await tableAll.locator('input[placeholder="Last Name"]').fill('tung');

    // enter user name
    await tableAll.locator('input[placeholder="Username"]').waitFor({ state: 'visible' });
    await expect(tableAll.locator('input[placeholder="Username"]')).toBeVisible();
    await expect(tableAll.locator('input[placeholder="Username"]')).toBeEditable();
    await tableAll.locator('input[placeholder="Username"]').clear();
    await tableAll.locator('input[placeholder="Username"]').fill('@karthik');

    // enter email
    await tableAll.locator('input[placeholder="E-mail"]').waitFor({ state: 'visible' });
    await expect(tableAll.locator('input[placeholder="E-mail"]')).toBeVisible();
    await expect(tableAll.locator('input[placeholder="E-mail"]')).toBeEditable();
    await tableAll.locator('input[placeholder="E-mail"]').clear();
    await tableAll.locator('input[placeholder="E-mail"]').fill('karthik@gmail.com');

    // enter age
    await tableAll.locator('input[placeholder="Age"]').waitFor({ state: 'visible' });
    await expect(tableAll.locator('input[placeholder="Age"]')).toBeVisible();
    await expect(tableAll.locator('input[placeholder="Age"]')).toBeEditable();
    await tableAll.locator('input[placeholder="Age"]').clear();
    await tableAll.locator('input[placeholder="Age"]').fill('30');

    // updating data
    await tableAll.locator('tr').nth(3).locator('.nb-checkmark').click();
    await editButton.waitFor({ state: 'visible' });

    // fetch the latest data
    const updatelocator_4thRrow = tableAll.locator('tr').nth(3).locator('td');
    let allUpdatedDataOf_4thRow = await updatelocator_4thRrow.allTextContents();
    allUpdatedDataOf_4thRow.shift();// removing the first element due to blank value
    console.log('values are=' + allUpdatedDataOf_4thRow);

    // Now assert the exact value which we add
    await expect(await updatelocator_4thRrow.nth(1)).toHaveText('4');
    await expect(await updatelocator_4thRrow.nth(2)).toHaveText('karthik');
    await expect(await updatelocator_4thRrow.nth(3)).toHaveText('tung');
    await expect(await updatelocator_4thRrow.nth(4)).toHaveText('@karthik');
    await expect(await updatelocator_4thRrow.nth(5)).toHaveText('karthik@gmail.com');
    await expect(await updatelocator_4thRrow.nth(6)).toHaveText('30');

    // Now assert the old value which is not present in that 4th column
    await expect(updatelocator_4thRrow.nth(1)).not.toHaveText(userFirstName);
    await expect(updatelocator_4thRrow.nth(2)).not.toHaveText(userLastName);
    await expect(updatelocator_4thRrow.nth(3)).not.toHaveText(userName);
    await expect(updatelocator_4thRrow.nth(4)).not.toHaveText(userFirstName);
    await expect(updatelocator_4thRrow.nth(5)).not.toHaveText(userEmail);
    await expect(updatelocator_4thRrow.nth(6)).not.toHaveText(userAge);


    await page.waitForTimeout(5000);
})

test('Test 3', async ({ page }) => {

    const data = page.locator('ng2-smart-table-pager nav li');
    await data.locator('a[class="ng2-smart-page-link page-link ng-star-inserted"]').nth(1).hover();

    while (true) {
        if ((await data.allTextContents()).includes('6')) {
            console.log('==========found ========');
            break;
        }

        await page.locator('a[aria-label="Next"]').click();
        await page.waitForTimeout(1000);
    }

    await data.locator('a[class="ng2-smart-page-link page-link ng-star-inserted"]').filter({ hasText: '6' }).click();

    const tableAll = page.locator('table tbody');
    const editButton = tableAll.locator('tr').nth(5).locator('.nb-edit');
    await editButton.hover();

    const locator_4thRrow = tableAll.locator('tr').nth(3).locator('td');
    let allDataOf_4thRow = await locator_4thRrow.allTextContents();
    allDataOf_4thRow.shift();// removing the first element due to blank value
    console.log('values are=' + allDataOf_4thRow);

    // before edit all data
    const userId = allDataOf_4thRow[0];
    const userFirstName = allDataOf_4thRow[1];
    const userLastName = allDataOf_4thRow[2];
    const userName = allDataOf_4thRow[3];
    const userEmail = allDataOf_4thRow[4];
    const userAge = allDataOf_4thRow[5];

    console.log('userId=' + userId);
    console.log('userFirstName=' + userFirstName);
    console.log('userLastName=' + userLastName);
    console.log('userName=' + userName);
    console.log('userEmail=' + userEmail);
    console.log('userAge=' + userAge);

    // click on edit button
    await editButton.click();

    // enter first name
    await tableAll.locator('input[placeholder="First Name"]').waitFor({ state: 'visible' });
    await expect(tableAll.locator('input[placeholder="First Name"]')).toBeVisible();
    await expect(tableAll.locator('input[placeholder="First Name"]')).toBeEditable();
    await tableAll.locator('input[placeholder="First Name"]').clear();
    await tableAll.locator('input[placeholder="First Name"]').fill('karthik');

    // enter last name
    await tableAll.locator('input[placeholder="Last Name"]').waitFor({ state: 'visible' });
    await expect(tableAll.locator('input[placeholder="Last Name"]')).toBeVisible();
    await expect(tableAll.locator('input[placeholder="Last Name"]')).toBeEditable();
    await tableAll.locator('input[placeholder="Last Name"]').clear();
    await tableAll.locator('input[placeholder="Last Name"]').fill('tung');

    // enter user name
    await tableAll.locator('input[placeholder="Username"]').waitFor({ state: 'visible' });
    await expect(tableAll.locator('input[placeholder="Username"]')).toBeVisible();
    await expect(tableAll.locator('input[placeholder="Username"]')).toBeEditable();
    await tableAll.locator('input[placeholder="Username"]').clear();
    await tableAll.locator('input[placeholder="Username"]').fill('@karthik');

    // enter email
    await tableAll.locator('input[placeholder="E-mail"]').waitFor({ state: 'visible' });
    await expect(tableAll.locator('input[placeholder="E-mail"]')).toBeVisible();
    await expect(tableAll.locator('input[placeholder="E-mail"]')).toBeEditable();
    await tableAll.locator('input[placeholder="E-mail"]').clear();
    await tableAll.locator('input[placeholder="E-mail"]').fill('karthik@gmail.com');

    // enter age
    await tableAll.locator('input[placeholder="Age"]').waitFor({ state: 'visible' });
    await expect(tableAll.locator('input[placeholder="Age"]')).toBeVisible();
    await expect(tableAll.locator('input[placeholder="Age"]')).toBeEditable();
    await tableAll.locator('input[placeholder="Age"]').clear();
    await tableAll.locator('input[placeholder="Age"]').fill('30');

    // updating data
    await tableAll.locator('tr').nth(5).locator('.nb-checkmark').click();
    await editButton.waitFor({ state: 'visible' });

    // fetch the latest data
    const updatelocator_4thRrow = tableAll.locator('tr').nth(5).locator('td');
    let allUpdatedDataOf_4thRow = await updatelocator_4thRrow.allTextContents();
    allUpdatedDataOf_4thRow.shift();// removing the first element due to blank value
    console.log('values are=' + allUpdatedDataOf_4thRow);

    // Now assert the exact value which we add
    await expect(await updatelocator_4thRrow.nth(1)).toHaveText('56');
    await expect(await updatelocator_4thRrow.nth(2)).toHaveText('karthik');
    await expect(await updatelocator_4thRrow.nth(3)).toHaveText('tung');
    await expect(await updatelocator_4thRrow.nth(4)).toHaveText('@karthik');
    await expect(await updatelocator_4thRrow.nth(5)).toHaveText('karthik@gmail.com');
    await expect(await updatelocator_4thRrow.nth(6)).toHaveText('30');

    // Now assert the old value which is not present in that 4th column
    await expect(updatelocator_4thRrow.nth(1)).not.toHaveText(userFirstName);
    await expect(updatelocator_4thRrow.nth(2)).not.toHaveText(userLastName);
    await expect(updatelocator_4thRrow.nth(3)).not.toHaveText(userName);
    await expect(updatelocator_4thRrow.nth(4)).not.toHaveText(userFirstName);
    await expect(updatelocator_4thRrow.nth(5)).not.toHaveText(userEmail);
    await expect(updatelocator_4thRrow.nth(6)).not.toHaveText(userAge);



    await page.waitForTimeout(5000);
})

test.skip('Practice Enter age and validate', async ({ page }) => {

    const ages = ["20", "30", "40", "200"]

    for (let age of ages) {
        const ageInput = page.locator('input-filter').getByPlaceholder('Age');
        await ageInput.click();
        await ageInput.clear();
        await ageInput.fill(age);
        await page.waitForTimeout(1000);
        const ageRows = page.locator('table tbody tr');
        for (let row of await ageRows.all()) {

            const cellValue = await row.locator('td').last().textContent();
            console.log('last values=' + cellValue);
            if (age == "200") {
                expect(await row.locator('td').textContent()).toContain('No data found')
            }
            else {
                expect(cellValue).toEqual(age);
            }

        }
    }

});