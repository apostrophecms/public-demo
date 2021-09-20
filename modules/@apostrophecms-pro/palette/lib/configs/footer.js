const config = {
  add: {
    footerBgColor: {
      label: 'Background color',
      type: 'color',
      selector: '.footer',
      property: 'background-color'
    },
    footerTextColor: {
      label: 'Text color',
      type: 'color',
      selector: '.footer',
      property: 'color'
    },
    footerLinkColor: {
      label: 'Link color',
      type: 'color',
      help: 'Text link color',
      // TODO: Update rich text data attribute to a class when RTE className
      // bug is fixed.
      selector: [ '.footer [data-rich-text] a', '.footer a' ],
      property: 'color',
      def: 'royalblue'
    },
    footerPadding: {
      label: 'Vertical padding',
      type: 'range',
      selector: '.footer',
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
    footer: {
      label: 'Footer Settings',
      fields: [
        'footerBgColor',
        'footerTextColor',
        'footerLinkColor',
        'footerPadding'
      ]
    }
  }
};

module.exports = config;
