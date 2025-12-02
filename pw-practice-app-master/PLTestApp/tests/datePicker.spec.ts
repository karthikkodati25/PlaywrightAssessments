/*

task 11: -> for date picker please write code for 2 days from local dates - within same month 
and 21 days from local date - selection in another month . select one date from common date calendar 
separate from current date.

task 12:-> for Date picker With Range please write code for range of 1 month from local date time.

*/

import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' });

test.beforeEach('launch url', async ({ page }) => {

    await page.goto('http://localhost:4200/pages/iot-dashboard');
    await page.waitForSelector('a[class="logo"]');
    await page.waitForTimeout(1000);

    await page.getByTitle('Forms').click();
    await page.getByTitle('Datepicker').waitFor({ state: 'visible' });
    await page.getByTitle('Datepicker').click();
    await page.waitForSelector('nb-card');
    await page.waitForTimeout(2000);

});

test('select 2 days after current date', async ({ page }) => {

    const fromDate = page.getByPlaceholder('Form Picker');
    await fromDate.click();
    await page.locator('nb-card-header nb-calendar-view-mode').waitFor({ state: 'visible' });
    const dateHeader = page.locator('nb-card-header nb-calendar-view-mode');
    await page.waitForTimeout(1000);

    // Create a date object for current date
    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    console.log("all date with time=" + date);
    console.log("current date=" + dd);
    console.log("current month=" + mm);
    console.log("current year=" + yyyy);

    // Select date after 2 days
    date.setDate(date.getDate() + 2);
    const future_dd = date.getDate();
    console.log("future dd=" + future_dd);
    const future_mm = date.getMonth() + 1;
    console.log("future mm=" + future_mm);
    const future_yyyy = date.getFullYear();
    console.log("future yyyy=" + future_yyyy);
    const monthFullName = date.toLocaleString('default', { month: 'long' });
    const futureMonthShortName = date.toLocaleString('default', { month: 'short' });
    console.log('month full name=' + monthFullName);
    console.log('month sort name=' + futureMonthShortName);

    const dateShow = (await dateHeader.locator('button').textContent()).trim();
    console.log('date=' + dateShow);

    const futureMMYYYY = monthFullName + " " + future_yyyy;
    console.log('future month with year=' + futureMMYYYY);

    console.log('date=' + futureMMYYYY);

    const futureSortMonthDateYear = futureMonthShortName + " " + future_dd + ", " + future_yyyy;

    const locatorForwardClick = page.locator('nb-calendar-pageable-navigation button[class="next-month appearance-ghost size-medium shape-rectangle icon-start icon-end status-basic nb-transition"]');

    // call the forward function for select 2 days forward
    await dateForwardClick(page, dateHeader, futureMMYYYY, locatorForwardClick);

    const calenderLocator = page.locator('[class="day-cell ng-star-inserted"]');
    await calenderLocator.getByText(future_dd.toString(), { exact: true }).click();
    await page.waitForTimeout(1000);

    await expect(page.getByPlaceholder('Form Picker')).toHaveValue(futureSortMonthDateYear);
    await page.waitForTimeout(1000);

    // task 2-> within same month and 21 days from local date
    await fromDate.click();
    await page.locator('nb-card-header nb-calendar-view-mode').waitFor({ state: 'visible' });
    await page.waitForTimeout(1000);

    // after 21 days
    date.setDate(date.getDate() + 21);
    const future_dd21 = date.getDate();
    console.log("future_dd21=" + future_dd21);
    const future_mm21 = date.getMonth() + 1;
    console.log("future mm21=" + future_mm21);
    const future_yyyy21 = date.getFullYear();
    console.log("future yyyy21=" + future_yyyy21);
    const monthFullName21 = date.toLocaleString('default', { month: 'long' });
    const futureMonthShortName21 = date.toLocaleString('default', { month: 'short' });
    console.log('month full name 21=' + monthFullName21);
    console.log('month sort name 21=' + futureMonthShortName21);

    const futureMMYYYY21 = monthFullName21 + " " + future_yyyy21;
    console.log('future month with year 21=' + futureMMYYYY21);
    console.log('date 21=' + futureMMYYYY21);

    const futureSortMonthDateYear21 = futureMonthShortName21 + " " + future_dd21 + ", " + future_yyyy21;
    console.log('after 21 days=' + futureSortMonthDateYear21);

    // call the forward function for select 2 days forward
    await dateForwardClick(page, dateHeader, futureMMYYYY21, locatorForwardClick);

    await calenderLocator.getByText(future_dd21.toString(), { exact: true }).click();
    await page.waitForTimeout(1000);

    await expect(page.getByPlaceholder('Form Picker')).toHaveValue(futureSortMonthDateYear21);


    // task 3-> within 2 month forward
    await fromDate.click();
    await page.locator('nb-card-header nb-calendar-view-mode').waitFor({ state: 'visible' });
    await page.waitForTimeout(1000);
    // after 2 month 
    date.setMonth(date.getMonth() + 2);
    const future_dd2m = date.getDate();
    console.log("future_dd2m=" + future_dd2m);
    const future_mm2m = date.getMonth() + 1;
    console.log("future mm2m=" + future_mm2m);
    const future_yyyy2m = date.getFullYear();
    console.log("future yyyy2m=" + future_yyyy2m);
    const monthFullName2m = date.toLocaleString('default', { month: 'long' });
    const futureMonthShortName2m = date.toLocaleString('default', { month: 'short' });
    console.log('month full name 2m=' + monthFullName2m);
    console.log('month sort name 2m=' + futureMonthShortName2m);

    const futureMMYYYY2m = monthFullName2m + " " + future_yyyy2m;
    console.log('future month with year 2m=' + futureMMYYYY2m);
    console.log('date 2m=' + futureMMYYYY2m);

    const futureSortMonthDateYear2m = futureMonthShortName2m + " " + future_dd2m + ", " + future_yyyy2m;
    console.log('after 2m days=' + futureSortMonthDateYear2m);

    // call the forward function for select 2 month forward
    await dateForwardClick(page, dateHeader, futureMMYYYY2m, locatorForwardClick);

    await calenderLocator.getByText(future_dd2m.toString(), { exact: true }).click();
    await page.waitForTimeout(1000);

    await expect(page.getByPlaceholder('Form Picker')).toHaveValue(futureSortMonthDateYear2m);


    await page.waitForTimeout(3000);

})

test('range of 1 month from local date time', async ({ page }) => {

    const rangePicker = page.getByPlaceholder('Range Picker');
    await rangePicker.click();
    await page.locator('nb-card-header nb-calendar-view-mode').waitFor({ state: 'visible' });
    const dateHeader = page.locator('nb-card-header nb-calendar-view-mode');
    await page.waitForTimeout(1000);

    // date
    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    console.log("all date with time=" + date);
    console.log("current date=" + dd);
    console.log("current month=" + mm);
    console.log("current year=" + yyyy);
    const currentMonthSort = date.toLocaleString('default', { month: 'short' });
    console.log('month sort name=' + currentMonthSort);

    const currentSortMonthDateYear = currentMonthSort + " " + dd + ", " + yyyy;
    console.log('after 2m days=' + currentSortMonthDateYear);


    // call the forward function for select current date
    // const calenderLocator = page.locator('[class="range-cell day-cell ng-star-inserted"]');
    // const exactSelected=page.locator('nb-calendar-range-day-cell[class="range-cell day-cell selected ng-star-inserted"]');
    // await page.getByText(dd.toString()).nth(1).click();
    await page.getByText(dd.toString()).nth(1).click();
    await page.waitForTimeout(1000);

    // after 1 month 
    date.setMonth(date.getMonth() + 1);
    const future_dd2m = date.getDate();
    console.log("future_dd2m=" + future_dd2m);
    const future_mm2m = date.getMonth() + 1;
    console.log("future mm2m=" + future_mm2m);
    const future_yyyy2m = date.getFullYear();
    console.log("future yyyy2m=" + future_yyyy2m);
    const monthFullName2m = date.toLocaleString('default', { month: 'long' });
    const futureMonthShortName2m = date.toLocaleString('default', { month: 'short' });
    console.log('month full name 2m=' + monthFullName2m);
    console.log('month sort name 2m=' + futureMonthShortName2m);

    const futureMMYYYY2m = monthFullName2m + " " + future_yyyy2m;
    console.log('future month with year 2m=' + futureMMYYYY2m);
    console.log('date 2m=' + futureMMYYYY2m);

    const futureSortMonthDateYear2m = futureMonthShortName2m + " " + future_dd2m + ", " + future_yyyy2m;
    console.log('after 2m days=' + futureSortMonthDateYear2m);

    const locatorForwardClick = page.locator('nb-calendar-pageable-navigation button[class="next-month appearance-ghost size-medium shape-rectangle icon-start icon-end status-basic nb-transition"]');
    const calenderLocator = page.locator('[class="range-cell day-cell ng-star-inserted"]');
    // call the forward function for select 2 month forward
    await dateForwardClick(page, dateHeader, futureMMYYYY2m, locatorForwardClick);

    await calenderLocator.getByText(future_dd2m.toString(), { exact: true }).click();
    await page.waitForTimeout(1000);

    const finalDate = currentSortMonthDateYear + " - " + futureSortMonthDateYear2m;
    await expect(page.getByPlaceholder('Range Picker')).toHaveValue(finalDate);


    await page.waitForTimeout(5000);


})


async function dateForwardClick(page, locatordateHeader, futureMMYYYY, locatorForwardClick) {

    while (true) {
        const value = await locatordateHeader.locator('button').textContent()
        console.log('shift value=' + value);

        if (value.trim() === futureMMYYYY) {
            console.log('Date found was =' + futureMMYYYY);
            break;
        }
        await locatorForwardClick.click();
        await page.waitForTimeout(1000);
    }
}