export default {
  fields: {
    lightCardBackgroundColor: {
      type: 'color',
      label: 'project:backgroundColor',
      selector: ':root',
      property: '--card-background-color',
      def: '--surface-color',
      options: {
        presetColors: [
          '--surface-color',
          '--accent-color',
          '--default-color',
          '--heading-color'
        ]
      }
    },
    lightCardIconColor: {
      type: 'color',
      label: 'project:iconColor',
      selector: ':root',
      property: '--card-icon-color',
      def: '--accent-color',
      options: {
        presetColors: [
          '--surface-color',
          '--accent-color',
          '--default-color',
          '--heading-color',
          '#fb5607',
          '#ff006e',
          '#8338ec',
          '#3a86ff'
        ]
      }
    },
    lightCardRadius: {
      label: 'project:borderRadius',
      type: 'range',
      unit: 'px',
      def: 12,
      min: 0,
      max: 30,
      selector: '.card-widget',
      property: 'border-radius'
    },
    lightCardShadow: {
      preset: 'boxShadow',
      label: 'project:shadow',
      selector: '.card-widget'
    },
    darkCardBackgroundColor: {
      type: 'color',
      label: 'project:backgroundColor',
      selector: '.dark',
      property: '--card-background-color',
      def: '--surface-color',
      options: {
        presetColors: [
          '--surface-color',
          '--accent-color',
          '--default-color',
          '--heading-color'
        ]
      }
    },
    darkCardIconColor: {
      type: 'color',
      label: 'project:iconColor',
      selector: '.dark',
      property: '--card-icon-color',
      def: '--accent-color',
      options: {
        presetColors: [
          '--surface-color',
          '--accent-color',
          '--default-color',
          '--heading-color',
          '#fb5607',
          '#ff006e',
          '#8338ec',
          '#3a86ff'
        ]
      }
    },
    darkCardRadius: {
      label: 'project:borderRadius',
      type: 'range',
      unit: 'px',
      def: 12,
      min: 0,
      max: 30,
      selector: '.dark.card-widget',
      property: 'border-radius'
    },
    darkCardShadow: {
      preset: 'boxShadow',
      label: 'project:shadow',
      selector: '.dark .card-widget'
    }
  },
  group: {
    cards: {
      label: 'project:cards',
      group: {
        lightMode: {
          label: 'project:lightMode',
          fields: [
            'lightCardBackgroundColor',
            'lightCardIconColor',
            'lightCardRadius',
            'lightCardShadow'
          ]
        },
        darkMode: {
          label: 'project:darkMode',
          fields: [
            'darkCardBackgroundColor',
            'darkCardIconColor',
            'darkCardRadius',
            'darkCardShadow'
          ]
        }
      }
    }
  }
};
