const { test, expect } = require("@playwright/test");
const { time } = require("console");

test("Login Test Check", async ({ page }) => {
  // Launch application
  await page.goto("https://rahulshettyacademy.com/client");

  // fill username
  const username = page.locator("#userEmail");
  username.highlight();
  await username.fill("hasanmonu116@gmail.com");

  // fill password
  const password = page.locator("#userPassword");
  password.highlight();
  await password.fill("Hasan@123");

  // click login button
  const loginBtn = page.locator("#login");
  await loginBtn.click();

  page.pause();
});
