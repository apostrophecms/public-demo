module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      price: {
        type: 'float'
      },
      taxes: {
        type: 'float'
      },
      color: {
        type: 'select',
        choices: [
          {
            label: 'Red',
            value: 'red'
          },
          {
            label: 'Blue',
            value: 'blue'
          },
          {
            label: 'Yellow',
            value: 'yellow'
          }
        ]
      },
      blurb: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'bold', 'italic', 'link' ]
            }
          },
          limit: 1
        },
        label: 'Blurb',
        help: 'A short summary.'
      },
      main: {
        type: 'area',
        options: {
          widgets: require('../../lib/area')
        }
      },
      releaseDate: {
        type: 'date',
        label: 'Release Date'
      },
      releaseTime: {
        type: 'time',
        label: 'Release Time'
      },
      features: {
        type: 'array',
        required: true,
        max: 5,
        fields: {
          add: {
            title: {
              type: 'string',
              label: 'Title',
              min: 2,
              max: 80
            }
          }
        }
      },
      _articles: {
        type: 'relationshipReverse',
        withType: 'article',
        reverses: '_products'
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'title', 'blurb', 'color' ]
      },
      priceFields: {
        label: 'Price Fields',
        fields: [ 'price', 'taxes' ]
      },
      release: {
        label: 'Release Date',
        fields: [ 'releaseDate', 'releaseTime' ]
      },
      features: {
        label: 'Features',
        fields: [ 'features' ]
      },
      content: {
        label: 'Content',
        fields: [ 'main' ]
      }
    }
  },
  filters: {
    add: {
      color: {
        name: 'color',
        label: 'Color',
        inputType: 'select',
        def: null,
        choices: [
          {
            label: 'Red',
            value: 'red'
          },
          {
            label: 'Blue',
            value: 'blue'
          },
          {
            label: 'Yellow',
            value: 'yellow'
          }
        ]
      }
    }
  }
};
