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
        label: 'Color Picker Test',
        options: {
          pickerOptions: {
            presetColors: [
              '#f00', '#00ff00', '#00ff0055',
              'rgb(201, 76, 76)', 'rgba(0,0,255,1)',
              'hsl(89, 43%, 51%)', 'hsla(89, 43%, 51%, 0.6)',
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
