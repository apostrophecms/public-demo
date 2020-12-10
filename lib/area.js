const basicConfig = {
  '@apostrophecms/image': {},
  '@apostrophecms/video': {},
  '@apostrophecms/rich-text': {}
};

const fullConfig = Object.assign({
  'two-column': {},
  article: {}
}, basicConfig);

module.exports = {
  basicConfig,
  fullConfig
};
