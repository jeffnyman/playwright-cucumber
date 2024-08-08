import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let page: Page;

// BeforeAll(async function () {});

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  pageFixture.page = page;
});

AfterAll(async () => {
  await pageFixture.page.close();
  await browser.close();
});
