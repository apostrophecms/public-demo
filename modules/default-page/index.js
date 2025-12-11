import { fullConfigExpandedGroups } from '../../lib/area.js';

export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Default Page',
    pluralLabel: 'Default Pages',
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          expanded: true,
          groups: fullConfigExpandedGroups
        },
        def: [
          'hero',
          '@apostrophecms/layout',
          '@apostrophecms/rich-text',
        ]
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

