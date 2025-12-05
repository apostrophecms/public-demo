import linkConfig from '../../lib/link.js';
import iconChoices from '../../lib/iconChoices.js';
import { klona } from 'klona';
const localLinkConfig = klona(linkConfig.link);
const localIcons = klona(iconChoices);

// localLinkConfig.linkText.if =
// localLinkConfig.linkType.if =
// localLinkConfig.linkTarget.if = {
//   orientation: 'vertical'
// };

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Pricing Card',
    icon: 'link-icon',
    previewImage: 'svg',
    description: 'Add a pricing card'
  },
  fields: {
    add: {
      title: {
        label: 'Title',
        type: 'string'
      },
      content: {
        label: 'Description Content',
        type: 'string'
      },
      badge: {
        label: 'Add a badge to the card?',
        type: 'boolean',
        def: false
      },
      badgeIcon: {
        if: {
          badge: true
        },
        label: 'Icon',
        type: 'select',
        choices: localIcons
      },
      badgeLabel: {
        if: {
          badge: true
        },
        label: 'Badge Label',
        type: 'string'
      },
      featured: {
        label: 'A featured card has a special background',
        type: 'boolean',
        def: false
      },
      priceText: {
        label: 'Price text',
        help: 'Ex. $20, Custom, etc',
        type: 'string'
      },
      priceTextUnit: {
        label: 'Price Unit Interval',
        help: 'Optional Ex. /mo, /year',
        type: 'string'
      },
      priceDetail: {
        label: 'Additional price details',
        type: 'string'
      },
      features: {
        type: 'array',
        inline: true,
        label: 'List of Features',
        help: 'A list of features this package includes',
        fields: {
          add: {
            item: {
              type: 'string',
              label: 'Feature'
            }
          }
        }
      },
      ...localLinkConfig
    }
  }
};
