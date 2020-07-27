module.exports = {
  fields: {
    add: {
      top: {
        type: 'area',
        options: {
          widgets: {
            'test1': {},
            '@apostrophecms/rich-text': {
              toolbar: [ 'bold', 'italic', 'link' ]
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
