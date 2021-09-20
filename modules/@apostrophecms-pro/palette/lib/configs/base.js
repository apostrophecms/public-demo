const choices = require('../choices');

module.exports = {
  add: {
    accentColor: {
      label: 'Accent Color',
      type: 'color',
      help: 'The accent color of butons around the site',
      selector: ':root',
      property: '--accent-color',
      def: '#76fac1'
    },
    accentColorContrast: {
      label: 'Accent Color Contrast',
      type: 'color',
      help: 'This color is used to style text inside accented buttons',
      selector: ':root',
      property: '--accent-color-contrast',
      def: '#0b1f9c'
    },
    backgroundColor: {
      label: 'Background color',
      type: 'color',
      help: 'The background of your website',
      selector: 'body',
      property: 'background-color',
      def: '#ffffff'
    },
    baseFontSize: {
      label: 'Size',
      type: 'select',
      help: 'Base font size',
      selector: 'body',
      property: 'font-size',
      unit: 'px',
      choices: choices.BASE_SIZES
    },
    baseFontColor: {
      label: 'Color',
      type: 'color',
      selector: 'body',
      property: 'color',
      def: '#000000'
    },
    titleFontColor: {
      label: 'Color',
      type: 'color',
      selector: 'h3',
      property: 'color',
      def: '#000000'
    },
    titleFontSize: {
      label: 'Size',
      type: 'range',
      selector: 'h3',
      unit: 'px',
      property: 'font-size',
      min: 16,
      max: 64
    },
    subtitleFontColor: {
      label: 'Color',
      type: 'color',
      selector: 'h4',
      property: 'color',
      def: '#000000'
    },
    subtitleFontSize: {
      label: 'Size',
      type: 'range',
      selector: 'h4',
      unit: 'px',
      property: 'font-size',
      min: 16,
      max: 64
    }
  },
  group: {
    site: {
      label: 'Site Settings',
      fields: [
        'backgroundColor',
        'accentColor',
        'accentColorContrast'
      ]
    },
    typography: {
      label: 'Typography',
      group: {
        default: {
          label: 'Default',
          fields: [
            'baseFontSize',
            'baseFontColor'
          ]
        },
        title: {
          label: 'Title',
          fields: [
            'titleFontSize',
            'titleFontColor'
          ]
        },
        subtitle: {
          label: 'Subtitle',
          fields: [
            'subtitleFontSize',
            'subtitleFontColor'
          ]
        }
      }
    }
  }
};
