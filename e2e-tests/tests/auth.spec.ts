import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173";

test('Login form test', async ({ page }) => {
  await page.goto(UI_URL);

  // Expect a title "to contain" a substring.
  await page.getByRole("link", {name: "Sign In"}).click();

  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("test1fff23@gmail.com")
  await page.locator("[name=password]").fill("fffffff")

  await page.getByRole("button", {name:"Login"}).click();

  await expect(page.getByText("Login Successful")).toBeVisible();
  await expect(page.getByRole("link",{name: "My Bookings"})).toBeVisible()
  await expect(page.getByRole("link",{name: "My Hotels"})).toBeVisible()
  await expect(page.getByRole("button",{name: "Sign out"})).toBeVisible()
});

test("Register form test", async({page}) => {
  await page.goto(UI_URL);
  const testEmail = `testemail${Math.floor(Math.random()*90000) + 10000}@gmail.com`

  await page.getByRole("link", {name : "Sign in"}).click();
  await page.getByRole("link", {name : "Create an account here"}).click();

  await expect(page.getByRole("heading", {name : "Create an Account"})).toBeVisible();

  await page.locator("[name=firstName]").fill("test2_firstname");
  await page.locator("[name=lastName]").fill("test2_lastname");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("test2Password");
  await page.locator("[name=confirmPassword]").fill("test2Password");

  await page.getByRole("button", {name: "Create Account"}).click();

  await expect(page.getByText("Registration Successful!")).toBeVisible();
  await expect(page.getByRole("link",{name: "My Bookings"})).toBeVisible()
  await expect(page.getByRole("link",{name: "My Hotels"})).toBeVisible()
  await expect(page.getByRole("button",{name: "Sign out"})).toBeVisible();
})