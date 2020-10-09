module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      price: {
        type: 'string'
      },
      blurb: {
        type: 'area',
        options: {
          widgets: {
            test1: {},
            '@apostrophecms/rich-text': {
              toolbar: [ 'bold', 'italic', 'link' ]
            }
          }
        }
      },
      file: {
        type: 'attachment'
      },
      _product: {
        type: 'relationship',
        max: 3,
        min: 2,
        withType: 'product',
        label: 'Linked product',
        fields: {
          add: {
            description: {
              type: 'string',
              label: 'Description'
            }
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'price',
          '_product',
          'file',
          'blurb',
          'trash'
        ]
      }
    }
  }
};
