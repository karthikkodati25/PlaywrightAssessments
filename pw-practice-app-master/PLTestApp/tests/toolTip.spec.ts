import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.waitForSelector('a[class="logo"]');
    await page.getByTitle('Modal & Overlays').click();
    await page.waitForSelector('[class="ng-tns-c140-10 ng-star-inserted"]')
    await page.getByTitle('Tooltip').click();
    await page.waitForTimeout(6000);
});
test.only('Tooltip PLACEMENTS', async ({ page }) => {
    const tooltipcard = page.locator('nb-card').filter({ hasText: 'Tooltip Placements' });
    //left
    await tooltipcard.getByRole('button', { name: 'Left' }).hover();
    // await page.waitForTimeout(3000);
    const tooltiptextleft = await page.locator('nb-tooltip').textContent();
    expect(tooltiptextleft).toEqual('This is a tooltip');
    const tooltippositionleft = await expect(tooltipcard.getByRole('button', { name: "Left" })).toHaveAttribute('ng-reflect-position', 'left')
    console.log('Tooltip position for left button is verified');
    await page.waitForTimeout(4000);
    //top
    await tooltipcard.getByRole('button', { name: 'Top' }).hover();
    //await page.waitForTimeout(3000);
    // await page.getByRole('tooltip').waitFor({state:'visible'})
    const tooltiptexttop = await page.locator('nb-tooltip').textContent();
    expect(tooltiptexttop).toEqual('This is a tooltip');
    const tooltippositiontop = await expect(tooltipcard.getByRole('button', { name: "Top" })).toHaveAttribute('ng-reflect-position', 'top')
    console.log('Tooltip position for top button is verified');
    await page.waitForTimeout(4000);
    //bottom
    await tooltipcard.getByRole('button', { name: 'Bottom' }).hover();
    //await page.waitForTimeout(3000);
    const tooltiptextbottom = await page.locator('nb-tooltip').textContent();
    expect(tooltiptextbottom).toEqual('This is a tooltip');
    const tooltippositionbottom = await expect(tooltipcard.getByRole('button', { name: "Bottom" })).toHaveAttribute('ng-reflect-position', 'bottom')
    console.log('Tooltip position for bottom button is verified');
    await page.waitForTimeout(4000);

    //right
    await tooltipcard.getByRole('button', { name: 'Right' }).hover();
    //await page.waitForTimeout(3000);
    const tooltiptextright = await page.locator('nb-tooltip').textContent();
    expect(tooltiptextright).toEqual('This is a tooltip');
    const tooltippositionright = await expect(tooltipcard.getByRole('button', { name: "Right" })).toHaveAttribute('ng-reflect-position', 'right')
    console.log('Tooltip position for right button is verified');
    await page.waitForTimeout(4000);

});

test('Tooltip with icon', async ({ page }) => {
    const tooltipiconcard = page.locator('nb-card').filter({ hasText: 'Tooltip with Icon' });
    await tooltipiconcard.getByRole('button', { name: 'Show Tooltip' }).first().hover();
    const tooltipicontext = await page.locator('nb-tooltip').textContent();
    console.log('tool tip context:', tooltipicontext);
    expect(tooltipicontext).toEqual('This is a tooltip');
    console.log('Tooltip with icon text is verified');
    const tooltip = await expect(tooltipiconcard.getByRole('button', { name: "Show Tooltip" }).first()).toHaveAttribute('ng-reflect-icon', 'home-outline')
    await page.waitForTimeout(4000);

    await tooltipiconcard.getByRole('button', { name: 'Show Tooltip' }).nth(1).hover();
    const tooltipicontext1 = await page.locator('//nb-icon[@ng-reflect-config="alert-triangle"]').getAttribute('ng-reflect-config');
    expect(tooltipicontext1).toEqual('alert-triangle');
    console.log('tool tip context:', tooltipicontext1);
    console.log('Tooltip with icon text is verified');
    const tooltip1 = await expect(tooltipiconcard.getByRole('button', { name: "Show Tooltip" }).nth(1)).toHaveAttribute('ng-reflect-icon', 'alert-triangle')
    await page.waitForTimeout(4000);
});

test('Tooltip with colors', async ({ page }) => {
    const tooltipcolorcard = page.locator('nb-card').filter({ hasText: 'Colored Tooltips' });
    //default
    await tooltipcolorcard.getByRole('button', { name: 'Default' }).hover();
    const tooltiptextdefault = await page.locator('nb-tooltip').textContent();
    console.log('tool tip context:', tooltiptextdefault);
    expect(tooltiptextdefault).toEqual('This is a tooltip');
    await expect(page.locator('nb-tooltip')).toHaveCSS('background-color', 'rgb(21, 26, 48)');

    //primary
    await tooltipcolorcard.getByRole('button', { name: 'Primary' }).hover();
    const tooltiptextprimary = await page.locator('nb-tooltip').textContent();
    console.log('tool tip context:', tooltiptextprimary);
    expect(tooltiptextprimary).toEqual('This is a tooltip');
    await expect(page.locator('nb-tooltip')).toHaveCSS('background-color', 'rgb(51, 102, 255)');
    //success
    await tooltipcolorcard.getByRole('button', { name: 'Success' }).hover();
    const tooltiptextsuccess = await page.locator('nb-tooltip').textContent();
    console.log('tool tip context:', tooltiptextsuccess);
    expect(tooltiptextsuccess).toEqual('This is a tooltip');
    await expect(page.locator('nb-tooltip')).toHaveCSS('background-color', 'rgb(0, 214, 143)');
    //danger
    await tooltipcolorcard.getByRole('button', { name: 'Danger' }).hover();
    const tooltiptextdanger = await page.locator('nb-tooltip').textContent();
    console.log('tool tip context:', tooltiptextdanger);
    expect(tooltiptextdanger).toEqual('This is a tooltip');
    await expect(page.locator('nb-tooltip')).toHaveCSS('background-color', 'rgb(255, 61, 113)');
    //info
    await tooltipcolorcard.getByRole('button', { name: 'Info' }).hover();
    const tooltiptextinfo = await page.locator('nb-tooltip').textContent();
    console.log('tool tip context:', tooltiptextinfo);
    expect(tooltiptextinfo).toEqual('This is a tooltip');
    await expect(page.locator('nb-tooltip')).toHaveCSS('background-color', 'rgb(0, 149, 255)');
    //warning
    await tooltipcolorcard.getByRole('button', { name: 'Warning' }).hover();
    const tooltiptextwarning = await page.locator('nb-tooltip').textContent();
    console.log('tool tip context:', tooltiptextwarning);
    expect(tooltiptextwarning).toEqual('This is a tooltip');
    await expect(page.locator('nb-tooltip')).toHaveCSS('background-color', 'rgb(255, 170, 0)');
});