import { test, expect } from "@playwright/test";

test("Detailed Login Process Screening", async ({ page }, testInfo) => {
  // Navigate to login page
  await page.goto("https://rahulshettyacademy.com/client");

  // Username field interaction
  const usernameField = page.locator("#userEmail");

  // Highlight username field
  await usernameField.highlight();

  // Enter username
  await usernameField.fill("hasanmonu116@gmail.com");

  // Take full page screenshot after entering username
  await testInfo.attach("page-after-username-entry", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });

  // Password field interaction
  const passwordField = page.locator("#userPassword");

  // Highlight password field
  await passwordField.highlight();

  // Enter password
  await passwordField.fill("Hasan@123");

  // Take full page screenshot after entering password
  await testInfo.attach("page-after-password-entry", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });

  // Login button interaction
  const loginButton = page.locator("#login");

  // Highlight login button
  await loginButton.highlight();

  // Take full page screenshot after highlighting login button
  await testInfo.attach("page-after-login-button-highlight", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });

  // Click login button
  await loginButton.click();

  // Wait for navigation or dashboard load
  await page.waitForURL(
    "https://rahulshettyacademy.com/client/#/dashboard/dash"
  );
  // https://rahulshettyacademy.com/client/#/dashboard/dash
  // Take full page screenshot after login
  await testInfo.attach("post-login-full-page", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
});
