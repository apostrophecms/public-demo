export default {
  fields: {
    navPadding: {
      label: 'Link Padding',
      type: 'box',
      def: {
        top: 18,
        right: 15,
        bottom: 18,
        left: 15
      },
      unit: 'px',
      selector: '.nav a',
      property: 'padding'
    },
    navWeight: {
      type: 'select',
      label: 'Link Weight',
      choices: [
        {
          label: 'Normal',
          value: '400'
        },
        {
          label: 'Semibold',
          value: '500'
        },
        {
          label: 'Bold',
          value: '700'
        }
      ],
      def: '400',
      selector: '.nav a',
      property: 'font-weight'
    },
    navShadow: {
      preset: 'boxShadow',
      label: 'Shadow',
      selector: '.nav-bar'
    },
    navRadius: {
      type: 'range',
      unit: 'px',
      def: 50,
      min: 0,
      max: 50,
      label: 'Border Radius',
      selector: '.nav-bar',
      property: 'border-radius'
    }
  },
  group: {
    nav: {
      label: 'Navigation',
      fields: [
        'navPadding',
        'navWeight',
        'navRadius',
        'navShadow'
      ]
    }
  }
};
