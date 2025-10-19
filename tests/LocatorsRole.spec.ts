import { test, expect } from "@playwright/test";

test("Playwright special locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  // click
  await page.getByLabel("Check me out if you Love IceCream").click();

  // click radio button is checked
  await page.getByLabel("Employed").click();

  await page.getByLabel("Gender").selectOption("Female");

  // get by placeholder
  await page.getByPlaceholder("Password").fill("Hasan@123");

  //get by role
  await page.getByRole("button", { name: "Submit" }).click();

  // get by text
  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();

  await page.getByRole("link", { name: "Shop" }).click();

  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();
});
