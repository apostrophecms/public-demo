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
            'recipe': {},
            '@apostrophecms/image': {},
            '@apostrophecms/rich-text': {
              toolbar: [ 'bold', 'italic', 'link' ]
            },
            '@apostrophecms/html': {}
          }
        }
      },
      right: {
        type: 'area',
        contextual: true,
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'bold', 'italic', 'link' ]
            },
            '@apostrophecms/html': {}
          }
        }
      }
    }
  }
};
