import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";

let browser: Browser;
let page: Page;

function isApproximatelyEqual(
  actual: number,
  expected: number,
  tolerance: number,
) {
  return Math.abs(actual - expected) <= tolerance;
}

Given("the planet weight page", async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();

  await page.goto("https://testerstories.com/xyzzy/planets.html");
});

When("the weight calculated is {int}", async function (int) {
  const weight = int.toString();
  await page.locator("#wt").fill(weight);
  await page.locator("#calculate").click();
});

Then("the weight on Mercury will be exactly {float}", async function (float) {
  const expectedMercuryWeight = float.toString();
  let actualMercuryWeight = await page.locator("#outputmrc").inputValue();

  expect(actualMercuryWeight).toBe(expectedMercuryWeight);
});

Then("the weight on Mercury will be roughly {int}", async function (int) {
  const tolerance = 0.9;
  const expectedMercuryWeight = int.toString();
  let actualMercuryWeight = await page.locator("#outputmrc").inputValue();

  // expect(parseFloat(actualMercuryWeight)).toBeCloseTo(
  //   parseFloat(expectedMercuryWeight),
  //   tolerance,
  // );

  expect(
    isApproximatelyEqual(
      parseFloat(actualMercuryWeight),
      parseFloat(expectedMercuryWeight),
      tolerance,
    ),
  ).toBe(true);

  await browser.close();
});

Given(
  "a {int} pound person will weigh exactly {float} pounds on Mercury",
  async function (int, float) {
    const weight = int.toString();
    await page.locator("#wt").fill(weight);
    await page.locator("#calculate").click();

    const expectedMercuryWeight = float.toString();
    let actualMercuryWeight = await page.locator("#outputmrc").inputValue();

    expect(actualMercuryWeight).toBe(expectedMercuryWeight);
  },
);

Given(
  "a {int} pound person will weigh approximately {int} pounds on Mercury",
  async function (int, int2) {
    const weight = int.toString();
    await page.locator("#wt").fill(weight);
    await page.locator("#calculate").click();

    const tolerance = 0.9;
    const expectedMercuryWeight = int2.toString();
    let actualMercuryWeight = await page.locator("#outputmrc").inputValue();

    expect(
      isApproximatelyEqual(
        parseFloat(actualMercuryWeight),
        parseFloat(expectedMercuryWeight),
        tolerance,
      ),
    ).toBe(true);

    await browser.close();
  },
);
