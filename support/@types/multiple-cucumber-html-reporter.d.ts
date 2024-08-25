declare module "multiple-cucumber-html-reporter" {
  interface Browser {
    name: string;
    version: string;
  }

  interface Platform {
    name: string;
    version: string;
  }

  interface Metadata {
    browser: Browser;
    device: string;
    platform: Platform;
  }

  interface CustomDataItem {
    label: string;
    value: string;
  }

  interface CustomData {
    title: string;
    data: CustomDataItem[];
  }

  interface ReportOptions {
    jsonDir: string;
    reportPath: string;
    reportName?: string;
    pageTitle?: string;
    pageFooter?: string;
    metadata?: Metadata;
    customData?: CustomData;
    disableLog?: boolean;
  }

  // Define the generate function
  function generate(options: ReportOptions): void;

  // Declare the module's export as an object with a generate function
  // Commenting this out to have a version that passes lint checks.
  // const report: { generate: typeof generate };

  const report: {
    generate(options: ReportOptions): void;
  };

  export = report;
}
