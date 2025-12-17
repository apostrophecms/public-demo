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
        label: 'project:listOfFeature',
        help: 'project:listOfFeatureHelp',
        fields: {
          add: {
            item: {
              type: 'string',
              label: 'project:feature'
            }
          }
        }
      },
      ...localLinkConfig
    }
  }
};
