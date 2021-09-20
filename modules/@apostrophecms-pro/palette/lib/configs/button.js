const config = {
  add: {
    buttonBorderColor: {
      label: 'Border color',
      type: 'color',
      selector: [ '.button__link', '.button' ],
      property: 'border-color',
      def: '#000'
    },
    buttonHoverColor: {
      label: 'Hover Color',
      type: 'color',
      selector: [ '.button__link:hover', '.button:hover' ],
      property: 'color',
      def: '#9B9B9B'
    },
    buttonHoverBackground: {
      label: 'Hover Background Color',
      type: 'color',
      selector: [ '.button__link:hover', '.button:hover' ],
      property: 'background-color',
      def: '#000'
    }
  },
  group: {
    button: {
      label: 'Buttons',
      fields: [
        'buttonBorderColor',
        'buttonHoverColor',
        'buttonHoverBackground'
      ]
    }
  }
};

module.exports = config;
