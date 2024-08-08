import { Given, When, Then } from "@cucumber/cucumber";

import { chromium, Page, Browser, expect } from "@playwright/test";

let browser: Browser;
let page: Page;

Given("the stardate page", async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();

  await page.goto("https://testerstories.com/xyzzy/stardates.html");
});

When("the tng era {float} is converted", async function (float) {
  const stardateValue = float.toString();
  await page.locator("#enableForm").click();
  await page.locator("#tngEra").click();
  await page.locator("#stardateValue").fill(stardateValue);
  await page.locator("#convert").click();
});

Then(
  "the displayed and calculated calendar year should be {int}",
  async function (int) {
    const expectedStartate = int.toString();
    let earthYearvalue = await page.locator("#calendarValue").inputValue();

    expect(earthYearvalue).toContain(expectedStartate);

    await browser.close();
  },
);
