import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { driver } from "../../../support/driver";
import { isApproximatelyEqual } from "../../helpers/playground/planets.helpers";
import { PlanetsPage } from "../../../support/pages/planets.page";

let planetsPage: PlanetsPage;

Given("the planet weight calculator", async function () {
  planetsPage = new PlanetsPage(driver.page);
  await planetsPage.goto();

  driver.logger.info("Navigated to Planets Calculator");
});

/*
Here the two Cucumber expressions must be different to match an
integer versus a string. And note that neither would recognize a
float.
*/

When("the weight calculated is {int}", async function (weight) {
  await planetsPage.enterWeight(weight);

  driver.logger.info(`Human weight given as ${weight}`);
});

When("the weight calculated is {string}", async function (weight) {
  await planetsPage.enterWeight(weight);

  driver.logger.info(`Human weight given as ${weight}`);
});

// /*
// This next matcher is distinct from the two that follow it but is
// handling the same general concept.
// */

Then(
  "the weight on Mercury will be exactly {string}",
  async function (expectedMercuryWeight) {
    const actualMercuryWeight = await planetsPage.weightOnMercury();

    expect(actualMercuryWeight).toEqual(expectedMercuryWeight);

    driver.logger.info(`Expected weight on Mercury: ${expectedMercuryWeight}`);
    driver.logger.info(`Actual weight on Mercury: ${actualMercuryWeight}`);
  },
);

// /*
// There are two exactly matchers below. This is done because trying
// to match a phrase that uses a float number or one that uses a whole
// number proves to be very problematic in terms of what gets capture.
// */

Then(
  /^the weight on (?:mercury) will be exactly (\d+\.\d+)$/i,
  async function (expectedMercuryWeight) {
    const actualMercuryWeight = await planetsPage.weightOnMercury();

    expect(actualMercuryWeight).toEqual(expectedMercuryWeight.toString());

    driver.logger.info(`Expected weight on Mercury: ${expectedMercuryWeight}`);
    driver.logger.info(`Actual weight on Mercury: ${actualMercuryWeight}`);
  },
);

Then(
  /^the weight on (?:mercury) will be exactly (\d+)$/i,
  async function (expectedMercuryWeight) {
    const actualMercuryWeight = await planetsPage.weightOnMercury();

    expect(actualMercuryWeight).toEqual(expectedMercuryWeight);

    driver.logger.info(`Expected weight on Mercury: ${expectedMercuryWeight}`);
    driver.logger.info(`Actual weight on Mercury: ${actualMercuryWeight}`);
  },
);

// /*
// This matcher will work for a whole number. It will not work for a float.
// */

Then(
  /^the weight on (?:mercury) will be (?:roughly|approximately|about) (\d+)$/i,
  async function (weight) {
    const tolerance = 0.9;
    const expectedMercuryWeight = weight.toString();

    const actualMercuryWeight = await planetsPage.weightOnMercury();

    const actualValue = parseFloat(actualMercuryWeight);
    const expectedValue = parseFloat(expectedMercuryWeight);

    if (!isApproximatelyEqual(actualValue, expectedValue, tolerance)) {
      throw new Error(
        `Expected weigh to be approximately ${expectedValue}, but got ${actualValue}`,
      );
    }

    expect(isApproximatelyEqual(actualValue, expectedValue, tolerance)).toBe(
      true,
    );
  },
);

// /*
// Notice the complexity here. Since I have Venus as a different planet,
// I have to include different matchers for it. I'm effectively doubling
// up my matchers.
// */

Then(
  /^the weight on (?:venus) will be exactly (\d+\.\d+)$/i,
  async function (expectedVenusWeight) {
    const actualVenusWeight = await planetsPage.weightOnVenus();

    expect(actualVenusWeight).toEqual(expectedVenusWeight);
  },
);

Then(
  /^the weight on (?:venus) will be exactly (\d+)$/i,
  async function (expectedVenusWeight) {
    const actualVenusWeight = await planetsPage.weightOnVenus();

    expect(actualVenusWeight).toEqual(expectedVenusWeight);
  },
);

Then(
  /^the weight on (?:venus) will be (?:roughly|approximately|about) (\d+)$/i,
  async function (weight) {
    const tolerance = 1.5;
    const expectedVenusWeight = weight.toString();

    const actualVenusWeight = await planetsPage.weightOnVenus();

    const actualValue = parseFloat(actualVenusWeight);
    const expectedValue = parseFloat(expectedVenusWeight);

    if (!isApproximatelyEqual(actualValue, expectedValue, tolerance)) {
      throw new Error(
        `Expected weigh to be approximately ${expectedValue}, but got ${actualValue}`,
      );
    }

    expect(isApproximatelyEqual(actualValue, expectedValue, tolerance)).toBe(
      true,
    );
  },
);

// /*
// This handles the business rule format.
// */

Given(
  "a {int} person will weigh exactly {float} pounds on Mercury",
  async function (personWeight, planetWeight) {
    await driver.page.locator("#wt").fill(personWeight.toString());
    await driver.page.locator("#calculate").click();

    const expectedMercuryWeight = planetWeight.toString();
    const actualMercuryWeight = await planetsPage.weightOnMercury();

    expect(actualMercuryWeight).toEqual(expectedMercuryWeight);
  },
);
