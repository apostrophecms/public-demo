const areaConfig = require('../../lib/area').basicConfig;

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Two Column',
    icon: 'pillar'
  },
  fields: {
    add: {
      left: {
        type: 'area',
        contextual: true,
        options: {
          widgets: areaConfig
        }
      },
      right: {
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
