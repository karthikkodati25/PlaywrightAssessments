import { test, expect } from '@playwright/test';

test('Navigate to google and Search for playwright.dev in search box', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  console.log("Current URL:", page.url());

  const searchBar = page.locator("[name='q']");
  await searchBar.fill("Iphone 17 pro max 256 GB");
  await page.keyboard.press('Enter');
  
  const itemSelect = page.locator('div').filter({ hasText: 'Apple iPhone 17 Pro Max (Silver, 256 GB)' }).first();
  await itemSelect.click();
});

