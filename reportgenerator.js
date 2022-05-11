const { writeFileSync } = require('fs');

const openingTag = (tag, attributes) => '<' + tag + ' ' + attributes + '>';

const closingTag = tag => '</' + tag + '>';

const createTag = function (tag, attributes, content) {
  return openingTag(tag, attributes) + content + closingTag(tag);
};

const attribute = ({ attr, value }) => {
  return attr + '="' + value + '"';
};

const attributes = (attrs) => {
  return attrs.map(attr => attribute(attr)).join(' ');
};

const link = () => '<link rel="stylesheet" href="styles.css"/>';

const heading = () => createTag('h1', '', 'Lint Report');

const pageWrapper = () => {
  const header = createTag('header', '', heading());
  const attrs = [
    { attr: 'class', value: 'page_wrapper' },
  ];
  return createTag('div', attributes(attrs), header);
};

const createPage = function () {
  const headContent = createTag('title', '', 'Lint Report') + link();
  const head = createTag('head', '', headContent);
  const body = createTag('body', '', pageWrapper());
  return createTag('html', '', head + body);
};

const reportGenerator = () => {
  writeFileSync('index.html', createPage(), 'utf8');
};

reportGenerator();
