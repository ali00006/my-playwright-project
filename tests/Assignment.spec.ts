import { test, expect } from "@playwright/test";
import exp from "constants";

test("Account registration Page Playwright Tests", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator(".btn1").click();
  await page.locator("#firstName").fill("Ali");
  await page.locator("#lastName").fill("Haider");
  await page.locator("#userEmail").fill("hasanmonu116@gmail.com");
  await page.locator("#userMobile").fill("9876543210");
  // Locate the dropdown using formcontrolname attribute
  const dropdown = page.locator('select[formcontrolname="occupation"]');
  // Select the option with value "2: Student"
  await dropdown.selectOption("2: Student");
  await page.locator("[value='Male']").click();
  await page.locator("#userPassword").fill("Hasan@123");
  await page.locator("#confirmPassword").fill("Hasan@123");
  await page.locator("[type='checkbox']").click();
  await page.locator("#login").click();

  const successText = page.locator("text=Account Created Successfully");
  await expect(successText).toContainText("Account Created Successfully");
});

test("Login into application", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  const email = page.locator("#userEmail");
  await email.fill("hasanmonu116@gmail.com");
  const password = page.locator("#userPassword");
  await password.fill("Hasan@123");
  const login = page.locator("#login");
  await login.click();
  await expect(page).toHaveTitle("Let's Shop");
  //await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  await page.pause();
  console.log(titles);
});

test("Dropdown, radio button handling", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const dropDown = page.locator("select.form-control");
  await dropDown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  // assertion
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  // blink text check
  const documentLink = page.locator("[href*='documents-request']");
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("child window handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  const documentLink = page.locator("[href*='documents-request']");
  //context.waitForEvent("page"); // listen for any new page(pending, rejected, fulfilled)
  //documentLink.click(); // new page is opened

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const textMsg = await newPage.locator(".red").textContent();
  const arrayText = textMsg.split("@");
  const email = arrayText[1].split(" ")[0];
  console.log(email);
  await page.locator("#username").type(email);
});

//  Buy product
test("Buy product into application", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  const email = page.locator("#userEmail");
  await email.fill("hasanmonu116@gmail.com");
  const password = page.locator("#userPassword");
  await password.fill("Hasan@123");
  const login = page.locator("#login");
  await login.click();
  await expect(page).toHaveTitle("Let's Shop");
  //await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();

  console.log(titles);

  const productName = "ADIDAS ORIGINAL";
  const products = page.locator(".card-body");
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      // add product to cart
      await products.nth(i).locator("text=Add To cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
  expect(bool).toBeTruthy();

  // click checkout button
  await page.locator("text=Checkout").click();

  // enter country first three letters
  await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });

  // select country from suggested options
  const dropDown = page.locator(".ta-results");
  await dropDown.waitFor();
  const dropDownCount = await dropDown.locator("button").count();

  for (let i = 0; i < dropDownCount; ++i) {
    const countryName = await dropDown.locator("button").nth(i).textContent();
    if (countryName == " India") {
      await dropDown.locator("button").nth(i).click();
      break;
    }
  }

  //validate email
  const emailId = "hasanmonu116@gmail.com";
  expect(page.locator(".user__name [type='text']").first()).toHaveText(emailId);

  // click place order button
  await page.locator(".btnn.action__submit.ng-star-inserted").click();
  await page.locator(".hero-primary").waitFor();
  expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  // click Orders button to see order
  await page.locator("button[routerlink ='/dashboard/myorders']").click();

  await page.locator("tbody").waitFor();

  //  get orders table data
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  console.log(orderIdDetails);
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
