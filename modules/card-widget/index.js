import linkConfig from '../../lib/link.js';
import iconChoices from '../../lib/iconChoices.js';
import { klona } from 'klona';

const localLinkConfig = klona(linkConfig.link);

localLinkConfig.linkText.if =
localLinkConfig.linkType.if =
localLinkConfig.linkTarget.if = {
  orientation: 'vertical'
};

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Card',
    icon: 'link-icon',
    previewImage: 'svg',
    description: 'Add a card'
  },
  fields: {
    add: {
      title: {
        label: 'Title',
        type: 'string'
      },
      content: {
        label: 'Content',
        type: 'string'
      },
      icon: {
        label: 'Icon',
        type: 'select',
        choices: iconChoices
      },
      bg: {
        label: 'Card has a background color?',
        type: 'boolean',
        def: true
      },
      orientation: {
        label: 'Orientation',
        type: 'select',
        choices: [
          {
            value: 'horizontal',
            label: 'Horizontal'
          },
          {
            value: 'vertical',
            label: 'Vertical'
          }
        ],
        def: 'horizontal'
      },
      ...localLinkConfig,
      style: {
        type: 'select',
        label: 'Link Style',
        if: {
          orientation: 'vertical'
        },
        choices: [
          {
            label: 'Primary',
            value: 'primary',
            def: true
          },
          {
            label: 'Outline',
            value: 'outline'
          }
        ]
      }
    }
  }
};
