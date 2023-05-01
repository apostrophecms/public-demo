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
          expanded: true,
          groups: require('../../lib/area').fullConfigExpandedGroups
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
