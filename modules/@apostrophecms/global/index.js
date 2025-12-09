import { fullConfig } from '../../../lib/area.js';

export default {
  fields: {
    add: {
      siteTitle: {
        label: 'Site Title',
        type: 'string',
        def: 'Awesome Site'
      },
      footerContent: {
        label: 'Footer Content',
        type: 'area',
        options: {
          widgets: fullConfig
        }
      }
    },
    group: {
      general: {
        label: 'General',
        fields: [ 'siteTitle', 'footerLinks' ]
      }
    }
  }
};
