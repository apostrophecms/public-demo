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
          widgets: require('../../lib/area')
        }
      },
      right: {
        type: 'area',
        contextual: true,
        options: {
          widgets: require('../../lib/area')
        }
      }
    }
  },
  init(self, options) {
    self.apos.asset.addIcon('pillar', 'Pillar');
  }
};
