import linkConfig from '../../lib/link.js';
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
        choices: [
          {
            label: 'Clock',
            value: 'clock'
          },
          {
            label: 'Building',
            value: 'building'
          },
          {
            label: 'Landmark',
            value: 'landmark'
          },
          {
            label: 'CPU',
            value: 'cpu'
          },
          {
            label: 'Trophy',
            value: 'trophy'
          },
          {
            label: 'Earth',
            value: 'earth'
          },
          {
            label: 'People',
            value: 'people'
          },
          {
            label: 'Chart',
            value: 'chart'
          },
          {
            label: 'Rocket',
            value: 'rocket'
          },
          {
            label: 'Package',
            value: 'package'
          },
          {
            label: 'Editor',
            value: 'editor'
          }
        ]
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
