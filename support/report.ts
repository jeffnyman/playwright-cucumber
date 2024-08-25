import report from "multiple-cucumber-html-reporter";

report.generate({
  disableLog: true,
  jsonDir: "./results/",
  reportPath: "./results/dashboard",
  reportName: "Automated Spec Report",
  pageTitle: "Automated Spec Report",
  pageFooter:
    "<div><p align='center'><strong>Testing Report</strong></p></div>",
});
