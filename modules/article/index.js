module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      blurb: {
        type: 'string',
        textarea: true,
        max: 250,
        label: 'Blurb',
        help: 'A short summary.'
      },
      main: {
        label: 'Content',
        type: 'area',
        options: {
          widgets: require('../../lib/area').fullConfig
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'visibility',
          'blurb'
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
