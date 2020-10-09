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
          },
          max: 2
        }
      },
      main: {
        type: 'area',
        options: {
          widgets: {
            'two-column': {}
          }
        }
      },
      recipes: {
        type: 'area',
        options: {
          widgets: {
            'recipe': {}
          }
        }
      }
    }
  }
};
