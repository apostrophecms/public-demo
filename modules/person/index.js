module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      price: {
        type: 'string'
      },
      taxes: {
        type: 'string'
      },
      _products: {
        type: 'join',
        withType: 'product',
        min: 1,
        max: 3
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
      }
    },
    groups: {
      basics: {
        label: 'Basics',
        fields: ['blurb', '_products']
      },
      priceFields: {
        label: 'Price Fields',
        fields: [ 'price', 'taxes' ]
      }
    }
  }
};
