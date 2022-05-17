const fs = require('fs');
const { createTag, attributes, link } = require('./tools.js');

const totalOf = (field, report) => {
  return report.reduce((total, fileReport) => {
    return total + fileReport[field];
  }, 0);
};

const overview = (report) => {
  const totalErrors = 'Errors: ' + totalOf('errorCount', report);
  const errors = createTag('p', '', totalErrors);
  const totalWarnings = 'Warnings: ' + totalOf('warningCount', report);
  const warnings = createTag('p', '', totalWarnings);

  const attrs = [
    { attr: 'class', value: 'overview' },
  ];
  return createTag('div', attributes(attrs), errors + warnings);
};

const pageWrapper = (report) => {
  const heading = createTag('h1', '', 'Lint Report');
  const header = createTag('header', '', heading + overview(report));
  const attrs = [
    { attr: 'class', value: 'page_wrapper' },
  ];
  return createTag('div', attributes(attrs), header);
};

const createPage = function (report) {
  const headContent = createTag('title', '', 'Lint Report') + link();
  const head = createTag('head', '', headContent);
  const body = createTag('body', '', pageWrapper(report));
  return createTag('html', '', head + body);
};

const reportGenerator = () => {
  let report = fs.readFileSync('./report.json', 'utf8');
  report = JSON.parse(report);
  fs.writeFileSync('./index.html', createPage(report), 'utf8');
};

reportGenerator();
