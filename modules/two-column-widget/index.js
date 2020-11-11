const areaConfig = require('../../lib/area').basicConfig;

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Two Column',
    icon: 'pillar'
  },
  fields: {
    add: {
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
      }
    }
  },
  init(self, options) {
    self.apos.asset.addIcon('pillar', 'Pillar');
  }
};
