import { test, expect, request } from "@playwright/test";
import { APIUtils } from "./utils/APIUtils";
// Javascript Object
const LoginPayload = {
  userEmail: "hasanmonu116@gmail.com",
  userPassword: "Hasan@123",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf" }],
};
let response;
let token;

test.beforeAll(async () => {
  // runs only once before all test cases
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, LoginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("Place Order", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("button[routerlink ='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();

  //  get orders table data
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  console.log(orderIdDetails);
  await page.pause();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});

//verify order created is showing in order
