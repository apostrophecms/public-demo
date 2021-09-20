module.exports = {
  options: {
    label: 'Home Page',
    pluralLabel: 'Home Pages'
  },
  fields: {
    add: {
      cta: {
        type: 'area',
        contextual: true,
        max: 1,
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [],
              styles: []
            }
          }
        }
      },
      ctaLinks: {
        type: 'area',
        contextual: true,
        max: 1,
        options: {
          widgets: {
            'cta-links': {}
          }
        }
      },
      main: {
        type: 'area',
        contextual: true,
        options: {
          widgets: require('../../../lib/area').fullConfig
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'main'
        ]
      }
    }
  }
};
