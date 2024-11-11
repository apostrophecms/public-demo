import { basicConfig } from '../../lib/area.js';
import { aposBrandColors } from '../../lib/options.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Container',
    description: 'A stylized container for other widgets',
    previewImage: 'svg',
    icon: 'box-shadow'
  },
  fields: {
    add: {
      content: {
        type: 'area',
        options: {
          widgets: basicConfig
        }
      },
      backgroundColor: {
        type: 'color',
        label: 'Background Color',
        help: 'Background color of the container',
        options: {
          pickerOptions: {
            presetColors: aposBrandColors
          }
        }
      },
      borderColor: {
        type: 'color',
        label: 'Border Color',
        help: 'Border color of the container',
        options: {
          pickerOptions: {
            presetColors: aposBrandColors
          }
        }
      },
      radius: {
        type: 'boolean',
        label: 'Border Radius',
        help: 'Adds a 20px border radius',
        def: false
      }
    }
  },
  icons: {
    boxShadow: 'BoxShadow'
  }
};
