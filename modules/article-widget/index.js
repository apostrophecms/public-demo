module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    name: 'article',
    label: 'Recent Articles'
  },
  fields: {
    add: {
      limit: {
        type: 'integer',
        label: 'Limit',
        def: 5
      }
    }
  }
};
