import linkConfig from '../../../lib/link.js';
export default {
  fields: {
    add: {
      theme: {
        label: 'Theme',
        type: 'theme',
        choices: [
          {
            label: 'Modern',
            value: 'modern'
          },
          {
            label: 'Funky',
            value: 'funky'
          }
        ]
        // fields: {
        //   add: {
        //     siteTitle: {
        //       label: 'Site Title',
        //       type: 'string',
        //       def: 'Awesome Site'
        //     }
        //   }
        // }
      },
      footerLinks: {
        label: 'Footer Links',
        type: 'array',
        titleField: 'linkText',
        fields: {
          add: {
            ...linkConfig.link
          }
        }
      },
      siteTitle: {
        label: 'Site Title',
        type: 'string',
        def: 'Awesome Site'
      }
    },
    group: {
      theme: {
        label: 'Theme',
        fields: [ 'theme' ]
      },
      general: {
        label: 'General',
        fields: [ 'siteTitle', 'footerLinks' ]
      }
    }
  }
};
