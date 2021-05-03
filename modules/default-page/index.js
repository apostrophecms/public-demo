module.exports = {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Default Page',
    pluralLabel: 'Default Pages'
  },
  fields: {
    add: {
      main: {
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
          'title'
        ]
      },
      main: {
        label: 'Main',
        fields: [ 'main' ]
      },
      utility: {
        label: 'Utility',
        fields: [ 'slug', 'type', 'visibility', 'orphan' ]
      }
    }
  }
};
