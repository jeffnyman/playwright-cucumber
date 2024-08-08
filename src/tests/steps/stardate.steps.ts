import { Given, When, Then } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

Given("the stardate page", async function () {
  await pageFixture.page.goto("https://testerstories.com/xyzzy/stardates.html");
});

When("the tng era {float} is converted", async function (float) {
  const stardateValue = float.toString();
  await pageFixture.page.locator("#enableForm").click();
  await pageFixture.page.locator("#tngEra").click();
  await pageFixture.page.locator("#stardateValue").fill(stardateValue);
  await pageFixture.page.locator("#convert").click();
});

Then(
  "the displayed and calculated calendar year should be {int}",
  async function (int) {
    const expectedStartate = int.toString();
    let earthYearvalue = await pageFixture.page
      .locator("#calendarValue")
      .inputValue();

    expect(earthYearvalue).toContain(expectedStartate);
  },
);
