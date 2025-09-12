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
      }
    }
  },
  icons: {
    boxShadow: 'BoxShadow'
  }
};
