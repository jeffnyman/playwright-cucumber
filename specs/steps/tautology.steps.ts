import { Given, Then } from "@cucumber/cucumber";
import { expect, request } from "@playwright/test";

const summation = (a: number, b: number) => a + b;

interface DataTableRow {
  addend1: string;
  addend2: string;
  sum: number;
}

interface AdditionData {
  addend1: number;
  addend2: number;
  sum: number;
}

Given("truth is true", async function () {
  expect(true).toBeTruthy();
});

Given("truth is not untrue", async function () {
  expect(true).not.toBeFalsy();
});

Given("untruth is false", async function () {
  expect(false).toBeFalsy();
});

Given("{int} plus {int} equals {int}", async function (addend1, addend2, sum) {
  expect(addend1 + addend2).toEqual(sum);
});

Given(
  "the sum of {int} and {int} is {int}",
  async function (addend1, addend2, sum) {
    expect(summation(addend1, addend2)).toEqual(sum);
  },
);

Given(
  "the following summation data is accurate",
  async function (dataTable: { hashes: () => DataTableRow[] }) {
    const data = dataTable.hashes().map((row: DataTableRow) => ({
      addend1: Number(row.addend1),
      addend2: Number(row.addend2),
      sum: Number(row.sum),
    })) as AdditionData[];

    data.forEach(({ addend1, addend2, sum }: AdditionData) => {
      const actualSum = addend1 + addend2;
      expect(actualSum).toEqual(sum);
    });
  },
);

Given("two numbers {int} and {int}", async function (addend1, addend2) {
  this.addend1 = addend1;
  this.addend2 = addend2;
});

Then("the sum is {int}", async function (expectedSum) {
  const actualSum = this.addend1 + this.addend2;
  expect(actualSum).toEqual(expectedSum);
});

Given("testerstories responds to status check", async function () {
  const apiRequestContext = await request.newContext();

  const response = await apiRequestContext.get(
    "https://testerstories.com/files/api/testing",
  );

  expect(response.status()).toBe(200);

  const responseBody = (await response.json()) as { message: string };

  expect(responseBody).toEqual({ message: "Testing TesterStories" });
});
