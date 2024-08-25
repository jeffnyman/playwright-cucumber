import { Given, When, Then } from "@cucumber/cucumber";
import { driver } from "../../../support/driver";
import { expect } from "@playwright/test";

Given("the stardate converter", async function () {
  await driver.page.goto(`${process.env.BASEURL}/xyzzy/stardates.html`);
});

When("the tng era {float} is converted", async function (stardate) {
  await driver.page.locator("#enableForm").click();
  await driver.page.locator("#tngEra").click();
  await driver.page.locator("#stardateValue").fill(stardate.toString());
  await driver.page.locator("#convert").click();
});

Then(
  "the displayed calendar yaer should be {int}",
  async function (expectedEarthYear) {
    const actualEarthDate = await driver.page
      .locator("#calendarValue")
      .inputValue();

    expect(actualEarthDate).toContain(expectedEarthYear.toString());
  },
);
