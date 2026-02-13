import linkConfig from '../../lib/link.js';
import iconChoices from '../../lib/iconChoices.js';
import { klona } from 'klona';
const localLinkConfig = klona(linkConfig.link);
const localIcons = klona(iconChoices);

export default {
  extend: '@apostrophecms/widget-type',
  icons: {
    'card-bulleted-icon': 'CardBulleted'
  },
  options: {
    label: 'project:pricingCard',
    icon: 'card-bulleted-icon',
    previewImage: 'svg',
    description: 'project:pricingCardDescription'
  },
  fields: {
    add: {
      title: {
        label: 'project:title',
        type: 'string'
      },
      content: {
        label: 'project:content',
        type: 'string'
      },
      badge: {
        label: 'project:addBadge',
        type: 'boolean',
        def: false
      },
      badgeIcon: {
        if: {
          badge: true
        },
        label: 'project:icon',
        type: 'select',
        choices: localIcons
      },
      badgeLabel: {
        if: {
          badge: true
        },
        label: 'project:badgeLabel',
        type: 'string'
      },
      featured: {
        label: 'project:specialBackground',
        type: 'boolean',
        def: false
      },
      priceText: {
        label: 'project:priceText',
        help: 'project:priceTextHelp',
        type: 'string'
      },
      priceTextUnit: {
        label: 'project:priceUnit',
        help: 'project:priceUnitHelp',
        type: 'string'
      },
      priceDetail: {
        label: 'project:priceDetail',
        type: 'string'
      },
      features: {
        type: 'array',
        inline: true,
        label: 'project:listOfFeatures',
        help: 'project:listOfFeaturesHelp',
        fields: {
          add: {
            item: {
              type: 'string',
              label: 'project:feature'
            }
          }
        }
      },
      buttonStyle: {
        label: 'project:buttonStyle',
        type: 'radio',
        buttons: true,
        def: 'primary',
        choices: [
          {
            label: 'project:primary',
            value: 'primary'
          },
          {
            label: 'project:outline',
            value: 'outline'
          }
        ]
      },
      ...localLinkConfig
    }
  },
  styles: {
    add: {
      backgroundColor: {
        type: 'color',
        label: 'project:backgroundColor',
        selector: '.price-card-widget',
        property: 'background-color',
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
      textColor: {
        type: 'color',
        label: 'project:textColor',
        selector: '.price-card-widget',
        property: 'color',
        def: '--surface-color',
        options: {
          presetColors: [
            '--accent-color',
            '--default-color',
            '--heading-color'
          ]
        }
      },
      buttonBackgroundColor: {
        type: 'color',
        label: 'project:buttonBackgroundColor',
        selector: '.price-card-widget .button--primary',
        property: 'background-color',
        def: '--button-primary-color',
        options: {
          presetColors: [
            '--button-primary-color',
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
      badgeColor: {
        type: 'color',
        label: 'project:badgeColor',
        selector: '.price-card-widget',
        property: '--price-card-badge-color',
        def: '--accent-color',
        options: {
          presetColors: [
            '--button-primary-color',
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
      }
    }
  }
};
