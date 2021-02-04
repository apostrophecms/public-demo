module.exports = {
  options: {
    label: 'Home Page',
    pluralLabel: 'Home Pages'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        contextual: true,
        options: {
          widgets: require('../../../lib/area').fullConfig
        }
      },
      below: {
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
