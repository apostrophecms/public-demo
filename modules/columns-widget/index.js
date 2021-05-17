const areaConfig = require('../../lib/area').basicConfig;

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Columns',
    icon: 'pillar'
  },
  fields: {
    add: {
      cols: {
        type: 'select',
        label: 'Column Configuration',
        choices: [
          {
            label: '50% / 50%',
            value: '50-50'
          },
          {
            label: '40% / 40%',
            value: '40-40'
          },
          {
            label: '33% / 33% / 33%',
            value: '33-33-33'
          },
        ]
      },
      one: {
        type: 'area',
        contextual: true,
        options: {
          widgets: areaConfig
        }
      },
      two: {
        type: 'area',
        contextual: true,
        options: {
          widgets: areaConfig
        }
      },
      three: {
        type: 'area',
        contextual: true,
        if: {
          cols: '33-33-33'
        },
        options: {
          widgets: areaConfig
        }
      }
    }
  },
  icons: {
    pillar: 'Pillar'
  }
};
