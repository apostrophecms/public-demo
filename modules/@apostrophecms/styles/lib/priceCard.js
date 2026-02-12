export default {
  fields: {
    lightPriceCardBackgroundColor: {
      type: 'color',
      label: 'project:backgroundColor',
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
      label: 'project:badgeColor',
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
      label: 'project:borderRadius',
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
      label: 'project:backgroundColor',
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
      label: 'project:badgeColor',
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
      label: 'project:borderRadius',
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
      label: 'project:pricingCards',
      group: {
        lightMode: {
          label: 'project:lightMode',
          fields: [
            'lightPriceCardBackgroundColor',
            'lightPriceCardIconColor',
            'lightPriceCardRadius'
          ]
        },
        darkMode: {
          label: 'project:darkMode',
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
