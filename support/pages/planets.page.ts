import { Locator, Page } from "@playwright/test";

export class PlanetsPage {
  readonly page: Page;
  readonly personWeight: Locator;
  readonly mercuryWeight: Locator;
  readonly venusWeight: Locator;
  readonly calculate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.personWeight = page.locator("#wt");
    this.mercuryWeight = page.locator("#outputmrc");
    this.venusWeight = page.locator("#outputvn");
    this.calculate = page.locator("#calculate");
  }

  async goto() {
    await this.page.goto(`${process.env.BASEURL}/xyzzy/planets.html`);
  }

  async enterWeight(weight: string) {
    await this.personWeight.fill(weight.toString());
    await this.calculate.click();
  }

  async weightOnMercury() {
    return await this.mercuryWeight.inputValue();
  }

  async weightOnVenus() {
    return await this.venusWeight.inputValue();
  }
}
