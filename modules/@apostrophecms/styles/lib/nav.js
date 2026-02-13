export default {
  fields: {
    navPadding: {
      label: 'project:linkPadding',
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
      label: 'project:linkWeight',
      choices: [
        {
          label: 'project:normal',
          value: '400'
        },
        {
          label: 'project:semibold',
          value: '500'
        },
        {
          label: 'project:bold',
          value: '700'
        }
      ],
      def: '400',
      selector: '.nav a',
      property: 'font-weight'
    },
    navShadow: {
      preset: 'boxShadow',
      label: 'project:shadow',
      selector: '.nav-bar'
    },
    navRadius: {
      type: 'range',
      unit: 'px',
      def: 50,
      min: 0,
      max: 50,
      label: 'project:borderRadius',
      selector: '.nav-bar',
      property: 'border-radius'
    }
  },
  group: {
    nav: {
      label: 'project:navigation',
      fields: [
        'navPadding',
        'navWeight',
        'navRadius',
        'navShadow'
      ]
    }
  }
};
