import linkConfig from '../../../lib/link.js';
export default {
  fields: {
    add: {
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
      colorTest: {
        type: 'color',
        label: '  ',
        options: {
          pickerOptions: {
            presetColors: [
              '--a-presentation',
              '--a-document',
              '--a-generic',
              '--a-spreadsheet',
              '--a-pdf'
            ]
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
      general: {
        label: 'General',
        fields: [ 'colorTest', 'siteTitle', 'footerLinks' ]
      }
    }
  }
};
