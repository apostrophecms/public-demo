module.exports = {
  add: {
    heroContentWidth: {
      unit: '%',
      type: 'range',
      label: 'Hero content width',
      help: 'Select the percentage width the hero content should take up. On small screens it will go full width.',
      min: 30,
      max: 100,
      def: 50,
      selector: '.hero-widget__content > .apos-area',
      property: 'width',
      mediaQuery: '(min-width: 640px)'
    }
  },
  group: {
    other: {
      label: 'Other styles',
      group: {
        hero: {
          label: 'Hero widgets',
          fields: [
            'heroContentWidth'
          ]
        }
      }
    }
  }
};
