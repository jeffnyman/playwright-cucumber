# Playwright + Cucumber

The goal of this project is to show the usage of Playwright in a Cucumber context.

This particular repo provides some settings that try to configure Visual Studio Code for you. These are provided in the `.vscode` folder that will activate if you are using that editor. This should hook up the feature files and the step definitions so that the editor is aware of both and how they are connected.

[![Playwright.dev](https://img.shields.io/badge/Documentation-Playwright-1c8620.svg?logo=playwright)](https://playwright.dev/docs/intro)
[![Playwright - GitHub](https://img.shields.io/badge/GitHub-Playwright-1c8620.svg?logo=github)](https://github.com/microsoft/playwright/tree/main)
[![Playwright - Stack Overflow](https://img.shields.io/badge/stackoverflow-Playwright-e87922.svg?logo=stackoverflow)](https://stackoverflow.com/questions/tagged/playwright)

[![Cucumber](https://img.shields.io/badge/Documentation-Cucumber-23d96c.svg?logo=Cucumber)](https://cucumber.io/)
[![Cucumber - GitHub](https://img.shields.io/badge/GitHub-Cucumber-23d96c.svg?logo=github)](https://github.com/cucumber)
[![Cucumber - Stack Overflow](https://img.shields.io/badge/stackoverflow-Cucumber-e87922.svg?logo=stackoverflow)](https://stackoverflow.com/questions/tagged/cucumber)

## 🟢 Prerequisites

Make sure you have [Node.js](https://nodejs.org/en). The LTS version should be fine. You will also need the `npm` package manager (which comes with Node.js) or `yarn`. A development environment or IDE with TypeScript/JavaScript support will help. [Visual Studio Code](https://code.visualstudio.com/) is a good choice.

## 🚀 Features

- Generates an HTML report.
- Generates an HTML dashboard.
- Generates screenshots for failed tests.
- Generates videos for failed tests.
- Demonstrates a TypeScript focus.
- Demonstrates browser and non-browser tests.
- Demonstrates the use of tags.
- Demonstrates attaching screenshots and videos to reports.
- Demonstrates the use of hooks.
- Demonstrates the use of environment configuration.
- Demonstrates the use of simple fixtures.
- Demonstrates the use of the Winston logger.

## 📦 Execution

Clone the repository and then set everything up:

```shell
npm ci
```

The reason for `npm ci` over `npm install` is covered best in this [Stack Overflow answer](https://stackoverflow.com/a/53325242).

As with any such project you should look at the `package.json` and see what scripts are provided.

To run the specs, you can do this:

```shell
npm run specs
```

To run a dry run of the specs, you can do this:

```shell
npm run specs:dryrun
```

You can view the standard report:

```shell
npm run specs:report
```

You can also generate a dashboard view and then show that view:

```shell
npm run specs:dashboard:generate
npm run specs:dashboard:show
```

If you have failed specs, you can rerun only those failed specs:

```shell
npm run specs:rerun
```

You can run specs based on specific tags:

```shell
npm run specs --TAGS="@canary"
```

You can also do many of the above commands without using the provided scripts. For example, to run certain tagged specs:

```shell
npx cucumber-js test --tags "@canary"
```

To run specs based on names:

```shell
npx cucumber-js test --name "Weight on Mercury"
npx cucumber-js test --name "Mercury"
npx cucumber-js test --name "Weight on Venus"
npx cucumber-js test --name "Venus"
```

You can also specify an environment to run against:

```shell
npx cross-env ENV=prod cucumber-js test --name "Mercury"
```

## ⚖ License

The code used in this project and in the linked tutorial are licensed under the [MIT license](https://github.com/jeffnyman/playwright-cucumber/blob/main/LICENSE).
