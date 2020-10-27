module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
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
        label: 'Content',
        type: 'area',
        options: {
          widgets: require('../../lib/area')
        }
      },
      _products: {
        type: 'relationship',
        max: 5,
        withType: 'product',
        label: 'Related products',
        fields: {
          add: {
            relevance: {
              type: 'string',
              label: 'Relevance'
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
          'visibility',
          'blurb',
          'trash'
        ]
      },
      main: {
        label: 'Content',
        fields: [
          'main'
        ]
      },
      relatedProducts: {
        label: 'Related Products',
        fields: [
          '_products'
        ]
      }
    }
  },
  components(self, options) {
    return {
      async recent(req, data) {
        return {
          articles: await self.find(req).limit(data.limit).sort({ createdAt: -1 }).toArray()
        };
      }
    };
  }
};
