import { Given, When, Then } from "@cucumber/cucumber";
import { Page, expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

let page: Page;

function isApproximatelyEqual(
  actual: number,
  expected: number,
  tolerance: number,
) {
  return Math.abs(actual - expected) <= tolerance;
}

Given("the planet weight page", async function () {
  await pageFixture.page.goto("https://testerstories.com/xyzzy/planets.html");
});

When("the weight calculated is {int}", async function (int) {
  const weight = int.toString();
  await pageFixture.page.locator("#wt").fill(weight);
  await pageFixture.page.locator("#calculate").click();
});

Then("the weight on Mercury will be exactly {float}", async function (float) {
  const expectedMercuryWeight = float.toString();
  let actualMercuryWeight = await pageFixture.page
    .locator("#outputmrc")
    .inputValue();

  expect(actualMercuryWeight).toBe(expectedMercuryWeight);
});

Then("the weight on Mercury will be roughly {int}", async function (int) {
  const tolerance = 0.9;
  const expectedMercuryWeight = int.toString();
  let actualMercuryWeight = await pageFixture.page
    .locator("#outputmrc")
    .inputValue();

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
});

Given(
  "a {int} pound person will weigh exactly {float} pounds on Mercury",
  async function (int, float) {
    const weight = int.toString();
    await pageFixture.page.locator("#wt").fill(weight);
    await pageFixture.page.locator("#calculate").click();

    const expectedMercuryWeight = float.toString();
    let actualMercuryWeight = await pageFixture.page
      .locator("#outputmrc")
      .inputValue();

    expect(actualMercuryWeight).toBe(expectedMercuryWeight);
  },
);

Given(
  "a {int} pound person will weigh approximately {int} pounds on Mercury",
  async function (int, int2) {
    const weight = int.toString();
    await pageFixture.page.locator("#wt").fill(weight);
    await pageFixture.page.locator("#calculate").click();

    const tolerance = 0.9;
    const expectedMercuryWeight = int2.toString();
    let actualMercuryWeight = await pageFixture.page
      .locator("#outputmrc")
      .inputValue();

    expect(
      isApproximatelyEqual(
        parseFloat(actualMercuryWeight),
        parseFloat(expectedMercuryWeight),
        tolerance,
      ),
    ).toBe(true);
  },
);
