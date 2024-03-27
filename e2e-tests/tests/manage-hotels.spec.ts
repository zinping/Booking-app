import { test, expect } from "@playwright/test";
import path from "path"
const UI_URL = "http://localhost:5173/";

test.beforeEach(async({page}) => {
    await page.goto(UI_URL);

    // Expect a title "to contain" a substring.
    await page.getByRole("link", {name: "Sign In"}).click();
  
    await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();
  
    await page.locator("[name=email]").fill("test1fff23@gmail.com")
    await page.locator("[name=password]").fill("fffffff")
  
    await page.getByRole("button", {name:"Login"}).click();
  
    await expect(page.getByText("Login Successful")).toBeVisible();
})

test("allow user to add hotel", async ({page}) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator("[name=name]").fill("Test Hotel")
    await page.locator("[name=city]").fill("Test city")
    await page.locator("[name=country]").fill("Test country")
    await page.locator("[name=description]").fill("Test description")
    await page.locator("[name=pricePerNight]").fill("100")
    await page.selectOption("select[name=starRating]", "5")
    await page.getByText("budget").check()
    await page.getByLabel("free wifi").check()
    await page.locator("[name=adultCount]").fill("5")
    await page.locator("[name=childCount]").fill("0")

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.png"),
        path.join(__dirname, "files", "2.png"),
    ])

    await page.getByRole("button" , {name : "save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
});