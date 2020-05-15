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
          widgets: {
            'test1': {}
          }
        }
      },
      right: {
        type: 'area',
        contextual: true,
        options: {
          widgets: {
            'test1': {}
          }
        }
      }
    }
  }
};
