export default {
  fields: {
    lightPriceCardBackgroundColor: {
      type: 'color',
      label: 'Background Color',
      selector: ':root',
      property: '--price-card-background-color',
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
    lightPriceCardIconColor: {
      type: 'color',
      label: 'Badge Color',
      selector: ':root',
      property: '--price-card-badge-color',
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
    lightPriceCardRadius: {
      label: 'Border Radius',
      type: 'range',
      unit: 'px',
      def: 12,
      min: 0,
      max: 30,
      selector: '.price-card-widget',
      property: 'border-radius'
    },
    darkPriceCardBackgroundColor: {
      type: 'color',
      label: 'Background Color',
      selector: '.dark',
      property: '--price-card-background-color',
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
    darkPriceCardIconColor: {
      type: 'color',
      label: 'Badge Color',
      selector: '.dark',
      property: '--price-card-badge-color',
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
    darkPriceCardRadius: {
      label: 'Border Radius',
      type: 'range',
      unit: 'px',
      def: 12,
      min: 0,
      max: 30,
      selector: '.dark .price-card-widget',
      property: 'border-radius'
    }
  },
  group: {
    priceCards: {
      label: 'Pricing Cards',
      group: {
        lightMode: {
          label: 'Light Mode',
          fields: [
            'lightPriceCardBackgroundColor',
            'lightPriceCardIconColor',
            'lightPriceCardRadius'
          ]
        },
        darkMode: {
          label: 'Dark Mode',
          fields: [
            'darkPriceCardBackgroundColor',
            'darkPriceCardIconColor',
            'darkPriceCardRadius'
          ]
        }
      }
    }
  }
};
