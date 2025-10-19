import {test, expect} from '@playwright/test';


test('Second Page Playwright Tests', async ({page})=> 
    {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await page.locator('#username').fill("rahulshetty");
    await page.locator('#password').fill("learning");
    await page.locator('#terms').click();
    await page.locator('#signInBtn').click();
    const errorMessage = await page.locator("[style*='block']").textContent();
    console.log(errorMessage);
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");  
   });

   test.only('only keyword Page Playwright Tests', async ({page})=> 
      {
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      console.log(await page.title());
      const userName = page.locator('#username');
      const password = page.locator('#password');
      const term = page.locator('#terms');
      const signIn = page.locator('#signInBtn');
      const cardTitles = page.locator(".card-body a");
      
      await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
      await userName.fill("rahulshetty");
      await password.fill("learning");
      await signIn.click();
      const errorMessage = await page.locator("[style*='block']").textContent();
      console.log(errorMessage);
      await expect(page.locator("[style*='block']")).toContainText("Incorrect");
      // type-fill
      await userName.fill("");
      await userName.fill("rahulshettyacademy");
      await term.click();
      await signIn.click();
      // console.log(await cardTitles.first().textContent());
      // console.log(await cardTitles.nth(1).textContent());
      const allCardTitles = await cardTitles.allTextContents();
      console.log(allCardTitles);
     });

   