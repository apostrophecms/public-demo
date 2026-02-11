export default {
  fields: {
    lightCardBackgroundColor: {
      type: 'color',
      label: 'Background Color',
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
      label: 'Icon Color',
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
      label: 'Border Radius',
      type: 'range',
      unit: 'px',
      def: 12,
      min: 0,
      max: 30,
      selector: '.card-widget',
      property: 'border-radius'
    },
    darkCardBackgroundColor: {
      type: 'color',
      label: 'Background Color',
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
      label: 'Icon Color',
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
      label: 'Border Radius',
      type: 'range',
      unit: 'px',
      def: 12,
      min: 0,
      max: 30,
      selector: '.dark.card-widget',
      property: 'border-radius'
    }
  },
  group: {
    cards: {
      label: 'Cards',
      group: {
        lightMode: {
          label: 'Light Mode',
          fields: [
            'lightCardBackgroundColor',
            'lightCardIconColor',
            'lightCardRadius'
          ]
        },
        darkMode: {
          label: 'Dark Mode',
          fields: [
            'darkCardBackgroundColor',
            'darkCardIconColor',
            'darkCardRadius'
          ]
        }
      }
    }
  }
};
