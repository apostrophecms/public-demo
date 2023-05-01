module.exports = {
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
          widgets: require('../../lib/area').basicConfig
        }
      },
      backgroundColor: {
        type: 'color',
        label: 'Background Color',
        help: 'Background color of the container',
        options: {
          pickerOptions: {
            presetColors: require('../../lib/options').aposBrandColors
          }
        }
      },
      borderColor: {
        type: 'color',
        label: 'Border Color',
        help: 'Border color of the container',
        options: {
          pickerOptions: {
            presetColors: require('../../lib/options').aposBrandColors
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
