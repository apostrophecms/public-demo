import { fullConfigExpandedGroups } from '../../../lib/area.js';
export default {
  options: {
    label: 'project:homePage',
    pluralLabel: 'project:homePages'
  },
  fields: {
    add: {
      main: {
        label: 'project:main',
        type: 'area',
        options: {
          expanded: true,
          groups: fullConfigExpandedGroups
        }
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
