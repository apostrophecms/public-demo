import linkConfig from '../../lib/link.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Button',
    icon: 'cursor-default-click-icon',
    previewImage: 'svg',
    description: 'Add a button that links to a page or URL'
  },
  fields: {
    add: {
      ...linkConfig.link,
      block: {
        type: 'boolean',
        label: 'Full Width',
        def: false
      },
      alignment: {
        type: 'select',
        label: 'Button Alignment',
        choices: [
          {
            label: 'Left',
            value: 'left',
            def: true
          },
          {
            label: 'Center',
            value: 'center'
          },
          {
            label: 'Right',
            value: 'right'
          }
        ]
      }
    }
  }
};
