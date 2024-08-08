# Playwright + Cucumber

The goal of this project is to show the usage of Playwright in a Cucumber context. Note that this project is a work in progress. I want to start adding more of Cucumber's hooks. I would also like to switch from the `cucumber.json` to a native `cucumber.js` configuration.

This particular repo provides some settings that try to configure Visual Studio Code for you. These are provided in the `.vscode` folder that will activate if you are using that editor. This should hook up the feature files and the step definitions so that the editor is aware of both and how they are connected.

[![Playwright.dev](https://img.shields.io/badge/Documentation-Playwright-1c8620.svg?logo=playwright)](https://playwright.dev/docs/intro)
[![Playwright - GitHub](https://img.shields.io/badge/GitHub-Playwright-1c8620.svg?logo=github)](https://github.com/microsoft/playwright/tree/main)
[![Playwright - Stack Overflow](https://img.shields.io/badge/stackoverflow-Playwright-e87922.svg?logo=stackoverflow)](https://stackoverflow.com/questions/tagged/playwright)

[![Cucumber](https://img.shields.io/badge/Documentation-Cucumber-23d96c.svg?logo=Cucumber)](https://cucumber.io/)
[![Cucumber - GitHub](https://img.shields.io/badge/GitHub-Cucumber-23d96c.svg?logo=github)](https://github.com/cucumber)
[![Cucumber - Stack Overflow](https://img.shields.io/badge/stackoverflow-Cucumber-e87922.svg?logo=stackoverflow)](https://stackoverflow.com/questions/tagged/cucumber)

## 🟢 Prerequisites

Make sure you have [Node.js](https://nodejs.org/en). The LTS version should be fine. You will also need the `npm` package manager (which comes with Node.js) or `yarn`. A development environment or IDE with TypeScript/JavaScript support will help. [Visual Studio Code](https://code.visualstudio.com/) is a good choice.

## 📦 Execution

Clone the repository and then set everything up:

```shell
npm ci
```

The reason for `npm ci` over `npm install` is covered best in this [Stack Overflow answer](https://stackoverflow.com/a/53325242).

To run a dry run of the specifications:

```shell
npm run dryrun
```

To run the specs:

```shell
npm test
```

## ⚖ License

The code used in this project and in the linked tutorial are licensed under the [MIT license](https://github.com/jeffnyman/playwright-cucumber/blob/main/LICENSE).
