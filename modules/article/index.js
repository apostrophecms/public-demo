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
            'test1': {},
            '@apostrophecms/rich-text': {
              toolbar: [ 'bold', 'italic', 'link' ]
            }
          }
        }
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
              type: 'string'
            }
          }
        }
      }
    }
  }
};
