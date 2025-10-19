import { test, expect } from "@playwright/test";

test("Taking Screenshot", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.screenshot();
  await page
    .locator("#displayed-text")
    .screenshot({ path: "locatorscreenshot.png" });
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: "screenshot.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
});

test.only("Visual Testing", async ({ page }) => {
  await page.goto("https://google.com");
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
});
