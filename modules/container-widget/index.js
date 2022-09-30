module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Container',
    previewImage: 'png'
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
  }
};
