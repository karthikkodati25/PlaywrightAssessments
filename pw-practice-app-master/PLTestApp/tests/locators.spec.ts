import { test, expect } from '@playwright/test';

test('Naviagate to Test application echarts under Charts tab', async ({ page }) => {
    await page.goto('http://localhost:4200/pages/iot-dashboard');
    await expect(page).toHaveTitle('playwright-test-admin Demo Application');

    await page.waitForTimeout(6000);
    await page.locator('//a[@title="Charts"]').click();
    await page.waitForTimeout(6000);

    const Echart = page.locator('//a[@title="Echarts"]');
    await expect(Echart).toBeVisible();
    await page.waitForTimeout(6000);
    await page.getByTitle('Echarts').click();
    await page.waitForTimeout(6000);

    await page.hover('//nb-card-header[text()="Pie"]//following::div[@class="echart"][1]');
    const details = await page.locator('//div[contains(text(),"Countries")]').textContent();
    console.log('Details of the chart:', details);

    await page.hover('//nb-card-header[text()="Bar"]//following::div[@class="echart"][1]');
    const barchart = page.locator('//nb-card-header[text()="Bar"]//following::div[@class="echart"][1]//div[2]');
    const fullText = await barchart.textContent();
    const parts = fullText.trim().split(/\s+/);
    const day = parts[0];
    const score = parts[1];
    console.log('Day:', + day + ' Score:' + score);  

    await page.hover('//nb-card-header[text()="Line"]//following::div[@class="echart"][1]');
    const lineChart = page.locator('//nb-card-header[text()="Line"]//following::div[@class="echart"][1]//div[2]');
    const lineText = await lineChart.textContent();
    const lineParts = lineText.trim().split(/\s+/);
    const lineDay = lineParts[0];
    const lineValue = lineParts[1];
    console.log('Line Chart - Day:', + lineDay + ' Value:' + lineValue);   
    
    await page.hover('//nb-card-header[text()="Multiple x-axis"]//following::div[@class="echart"][1]'); 
    const multiXAxis = page.locator("//nb-card-header[text()='Multiple x-axis']//following::div[@class='echart'][1]//div[2]");
    const multiText = await multiXAxis.textContent();
    const multiParts = multiText.trim().split(/\s+/);
    const multiDay = multiParts[0];
    const multiValue = multiParts[1];
    console.log('Multiple x-axis - Day:', + multiDay + ' Value:' + multiValue);

    await page.hover('//nb-card-header[text()="Area Stack"]//following::div[@class="echart"][1]');
    const areaStack = page.locator("//nb-card-header[text()='Area Stack']//following::div[@class='echart'][1]//div[2]");
    const areaText = await areaStack.textContent();
    const areaParts = areaText.trim().split(/\s+/);
    const areaDay = areaParts[0];
    const areaValue = areaParts[1];
    console.log('Area Stack - Day:', + areaDay + ' Value:' + areaValue);

    await  page.hover('//nb-card-header[text()="Bar Animation"]//following::div[@class="echart"][1]');
    const barAnimation = page.locator("//nb-card-header[text()='Bar Animation']//following::div[@class='echart'][1]//div[1]");
    const barAnimText = await barAnimation.textContent();
    const barAnimParts = barAnimText.trim().split(/\s+/);
    const barAnimDay = barAnimParts[0];
    const barAnimValue = barAnimParts[1];
    console.log('Bar Animation - Day:', + barAnimDay + ' Value:' + barAnimValue);

    await page.hover('//nb-card-header[text()="Radar"]//following::div[@class="echart"][1]');
    const radarChart = page.locator("//nb-card-header[text()='Radar']//following::div[@class='echart'][1]//div[2]");    
    const radarText = await radarChart.textContent();
    const radarParts = radarText.trim().split(/\s+/);
    const radarIndicator = radarParts[0];
    const radarValue = radarParts[1];
    console.log('Radar Chart - Indicator:', radarIndicator + ' Value:' + radarValue);


});