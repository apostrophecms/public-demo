import { fullConfig } from '../../../lib/area.js';
// modules/@apostrophecms/layout-column-widget/index.js
// import linkConfig from '../../../lib/link.js';
export default {
  fields: {
    add: {
      // footerLinks: {
      //   label: 'Footer Links',
      //   type: 'array',
      //   titleField: 'linkText',
      //   fields: {
      //     add: {
      //       ...linkConfig.link
      //     }
      //   }
      // },
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
