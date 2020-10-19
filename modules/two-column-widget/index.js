module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Two Column'
  },
  fields: {
    add: {
      left: {
        type: 'area',
        contextual: true,
        options: {
          widgets: require('../area')
        }
      },
      right: {
        type: 'area',
        contextual: true,
        options: {
          widgets: require('../area')
        }
      }
    }
  }
};
