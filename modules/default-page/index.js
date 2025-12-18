import { fullConfigExpandedGroups } from '../../lib/area.js';

export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'project:defaultPage',
    pluralLabel: 'project:defaultPages'
  },
  fields: {
    add: {
      main: {
        label: 'project:main',
        type: 'area',
        options: {
          expanded: true,
          groups: fullConfigExpandedGroups
        },
        def: [
          'hero',
          '@apostrophecms/layout',
          '@apostrophecms/rich-text'
        ]
      }
    },
    group: {
      basics: {
        label: 'project:basics',
        fields: [
          'title',
          'main'
        ]
      }
    }
  }
};
