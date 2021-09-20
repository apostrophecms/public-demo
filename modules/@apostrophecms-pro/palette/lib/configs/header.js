const choices = require('../choices');

const config = {
  add: {
    headerBgColor: {
      label: 'Background color',
      type: 'color',
      selector: '.header',
      property: 'background-color',
      def: null
    },
    headerLinkColor: {
      label: 'Link color',
      type: 'color',
      selector: '.header .navigation__link',
      property: 'color',
      def: null
    },
    headerFontSize: {
      label: 'Text size',
      type: 'select',
      help: 'Navigation font size',
      selector: '.header',
      property: 'font-size',
      unit: 'px',
      choices: choices.BASE_SIZES
    },
    headerPadding: {
      label: 'Vertical padding',
      type: 'range',
      selector: '.header',
      unit: 'px',
      property: [
        'padding-top',
        'padding-bottom'
      ],
      min: 0,
      max: 64
    }
  },
  group: {
    header: {
      label: 'Header Settings',
      fields: [
        'headerBgColor',
        'headerFontSize',
        'headerLinkColor',
        'headerPadding'
      ]
    }
  }
};

module.exports = config;
