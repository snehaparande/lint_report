const fs = require('fs');
const { createTag,
  attributes,
  link,
  createTableHead,
  createTableRow
} = require('./tools.js');

const totalOf = (field, report) => {
  return report.reduce((total, fileReport) => {
    return total + fileReport[field];
  }, 0);
};

const overview = report => {
  const totalErrors = 'Errors: ' + totalOf('errorCount', report);
  const errors = createTag('p', totalErrors);
  const totalWarnings = 'Warnings: ' + totalOf('warningCount', report);
  const warnings = createTag('p', totalWarnings);

  const attrs = [
    { attr: 'class', value: 'overview' },
  ];
  return createTag('div', errors + warnings, attributes(attrs));
};

const createTableBody = errors => {
  const head = createTableHead(['Line', 'Column', 'Error message']);
  const data = errors.map(({ line, column, message }) => {
    return createTableRow([line, column, message]);
  }).join('');
  return createTag('tbody', head + data);
};

const fileReport = ({ filePath, messages }) => {
  const caption = createTag('caption', filePath.match(/[^/]*$/)[0]);
  const tBody = createTableBody(messages);
  return createTag('table', caption + tBody);
};

const pageContent = reports => {
  const attrs = [
    { attr: 'class', value: 'report_tables' },
  ];
  const tables = reports.map(fileReport);
  return createTag('div', tables.join(''), attributes(attrs));
};

const pageWrapper = report => {
  const heading = createTag('h1', 'Lint Report');
  const header = createTag('header', heading + overview(report));
  const content = pageContent(report);

  const attrs = [
    { attr: 'class', value: 'page_wrapper' },
  ];
  return createTag('div', header + content, attributes(attrs));
};

const createPage = report => {
  const headContent = createTag('title', 'Lint Report') + link();
  const head = createTag('head', headContent);
  const body = createTag('body', pageWrapper(report));
  return createTag('html', head + body);
};

const reportGenerator = () => {
  try {
    let report = fs.readFileSync('./report.json', 'utf8');
    report = JSON.parse(report);
    fs.writeFileSync('./index.html', createPage(report), 'utf8');
  } catch (error) {
    throw error.message;
  }
};

reportGenerator();
