import { basicConfig as areaConfig } from '../../lib/area.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Columns',
    icon: 'pillar',
    description: 'Create flexible layouts for your content.',
    previewImage: 'svg'
  },
  fields: {
    add: {
      cols: {
        type: 'select',
        label: 'Column Configuration',
        choices: [
          {
            label: 'Single column, 50%',
            value: 'single-50',
            def: true
          },
          {
            label: '50% / 50%',
            value: '50-50'
          },
          {
            label: '33% / 33% / 33%',
            value: '33-33-33'
          }
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
        },
        if: {
          $or: [
            { cols: '33-33-33' },
            { cols: '50-50' },
            { cols: '40-40' }
          ]
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
