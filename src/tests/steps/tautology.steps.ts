import { Given } from "@cucumber/cucumber";

import { expect } from "@playwright/test";

Given("truth is true", async function () {
  expect(true).toBe(true);
});
