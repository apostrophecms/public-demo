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
