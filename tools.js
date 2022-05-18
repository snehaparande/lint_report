const openingTag = (tag, attributes) => '<' + tag + ' ' + attributes + '>';

const closingTag = tag => '</' + tag + '>';

const createTag = function (tag, content, attributes) {
  const attrs = attributes ? attributes : '';
  return openingTag(tag, attrs) + content + closingTag(tag);
};

const attribute = ({ attr, value }) => {
  return attr + '="' + value + '"';
};

const attributes = (attrs) => {
  return attrs.map(attr => attribute(attr)).join(' ');
};

const createTableHead = (headers) => {
  const tableHeader = headers.map((header) => createTag('th', header));
  return createTag('tr', tableHeader.join(''));
};

const createTableRow = (rowData) => {
  const tableRowData = rowData.map((data) => createTag('td', data));
  return createTag('tr', tableRowData.join(''));
};

const link = () => '<link rel="stylesheet" href="styles.css"/>';

exports.createTag = createTag;
exports.attributes = attributes;
exports.createTableHead = createTableHead;
exports.createTableRow = createTableRow;
exports.link = link;
