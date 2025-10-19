import { expect, test } from '@playwright/test';
import exp from 'constants';

test('First Playwright Tests', async ({browser, page})=> 
 {
    // {browser, page} are global variant
 // chrome browser
 //const context = await browser.newContext();
 //const page = await context.newPage();
 await page.goto("https://www.google.com");
 console.log(await page.title());
 await expect(page).toHaveTitle("Google");
});

test('Second Page Playwright Tests', async ({page})=> 
    {
    await page.goto("https://www.x.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("X. It’s what’s happening / X");
   });

   // only keyword
   /*test.only('Only keyword Playwright Tests', async ({page})=> 
    {
    await page.goto("https://www.x.com");
    console.log(await page.title());
   });*/

// test('First Playwright Tests', async function(){ // code here});