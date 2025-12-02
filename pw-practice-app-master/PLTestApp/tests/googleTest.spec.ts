import { test, expect } from '@playwright/test';
 
test('Navigate to google and Search for playwright.dev in search box', async ({ page }) => {
  await page.goto('https://www.google.com/');
  
  const searchBar = page.getByRole('combobox', { name: 'Search' });
  await expect(searchBar).toBeVisible();
  await searchBar.fill("playwright.dev");
  await searchBar.press("Enter");
});