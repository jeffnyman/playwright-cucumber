import { Before, BeforeAll, After, AfterAll, Status } from "@cucumber/cucumber";
import { Browser, Page, BrowserContext } from "@playwright/test";
import { driver } from "./driver";
import { invokeBrowser } from "./browser";
import { getEnv } from "./env";
import { createLogger } from "winston";
import { options } from "./logger";
import { readFileSync } from "fs";

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async () => {
  getEnv();
});

/*
The operating profile is critical here. Since this project contains
tests that do and do not require a browser, there has to be some way
to check for that. Here the approach is based on tags. If there are
no tags of a given sort, a browser will be created, along with a
browser context and a page instance.
*/
Before(async (scenario) => {
  const hasCanaryOrApiTag = scenario.pickle.tags.some(
    (tag) => tag.name === "@canary" || tag.name == "@api",
  );

  if (!hasCanaryOrApiTag) {
    if (!browser) {
      browser = await invokeBrowser();
    }

    context = await browser.newContext({
      recordVideo: {
        dir: "results/videos",
      },
    });

    page = await context.newPage();
    driver.page = page;
  }

  const testName = scenario.pickle.name + scenario.pickle.id;
  driver.logger = createLogger(options(testName));
});

/*
Note that the After is not an arrow function. Arrow functions don't
have have their own this context; they inherit it from the enclosing
lexical scope. Because of this, you can't directly bind a new `this`
to an arrow function. So things like the screenshot attachment would
not work.
*/
After(async function (scenario) {
  let videoPath: string;
  let screenshot: Buffer;

  const hasCanaryOrApiTag = scenario.pickle.tags.some(
    (tag) => tag.name === "@canary" || tag.name == "@api",
  );

  if (!hasCanaryOrApiTag) {
    if (driver.page) {
      if (scenario.result?.status == Status.FAILED) {
        screenshot = await driver.page.screenshot({
          path: `./results/screenshots/${scenario.pickle.name}.png`,
          type: "png",
        });

        videoPath = await driver.page.video().path();
      }

      await driver.page.close();
      await context.close();

      /*
      The reason to have the attach portions as part of an identical
      check to the above is that the attachment process can take a
      little time and if the page and context closing has not fully
      taken place, which is what generates the video, then you can
      run into a race condition.
      */
      if (scenario.result?.status == Status.FAILED) {
        this.attach(screenshot, "image/png");
        this.attach(readFileSync(videoPath), "video/webm");
      }
    }
  }
});

AfterAll(async () => {
  if (browser) {
    await browser.close();
  }

  //driver.logger.close();
});
