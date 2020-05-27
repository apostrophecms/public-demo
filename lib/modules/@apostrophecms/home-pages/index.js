module.exports = {
  fields: {
    add: {
      top: {
        type: 'area',
        options: {
          widgets: {
            'test1': {},
            '@apostrophecms/rich-text': {
            }
          }
        }
      },
      main: {
        type: 'area',
        options: {
          widgets: {
            'two-column': {}
          }
        }
      }
    }
  }
};
