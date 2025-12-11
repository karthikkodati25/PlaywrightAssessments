import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir: './tests',
 reporter: [
   ['list'],
   ['allure-playwright']
 ],
 use: {
   baseURL: 'https://restful-booker.herokuapp.com',
   extraHTTPHeaders: {
     'Content-Type': 'application/json'
   }
 }
});