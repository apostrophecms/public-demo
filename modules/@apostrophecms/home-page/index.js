module.exports = {
  options: {
    label: 'Home Page',
    pluralLabel: 'Home Pages'
  },
  fields: {
    add: {
      singleton: {
        type: 'area',
        label: 'Hello?',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      main: {
        type: 'area',
        options: {
          widgets: require('../../area')
        }
      },
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
