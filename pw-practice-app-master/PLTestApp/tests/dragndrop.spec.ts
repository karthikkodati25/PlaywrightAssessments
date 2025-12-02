import { expect, test } from '@playwright/test'
test('drag and drop with iFrame', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li').getByText("High Tatras", { exact: true }).dragTo(frame.locator('#trash'))
    await frame.locator('li', { hasText: "High Tatras 2" }).dragTo(frame.locator('#trash'))
    await frame.locator('li', { hasText: "High Tatras 3" }).dragTo(frame.locator('#trash'))
    await frame.locator('li', { hasText: "High Tatras 4" }).dragTo(frame.locator('#trash'))
    // more precise control
    await expect(frame.locator('#gallery')).toBeEmpty()
})