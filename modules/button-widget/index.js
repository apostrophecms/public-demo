import linkConfig from '../../lib/link.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'project:button',
    icon: 'cursor-default-click-icon',
    previewImage: 'svg',
    description: 'project:buttonDescription'
  },
  fields: {
    add: {
      ...linkConfig.link,
      block: {
        type: 'boolean',
        label: 'project:fullWidth',
        def: false
      },
      alignment: {
        type: 'select',
        label: 'project:buttonAlignment',
        choices: [
          {
            label: 'project:left',
            value: 'left',
            def: true
          },
          {
            label: 'project:center',
            value: 'center'
          },
          {
            label: 'project:right',
            value: 'right'
          }
        ]
      }
    }
  }
};
