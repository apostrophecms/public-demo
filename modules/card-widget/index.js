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
    label: 'project:card',
    icon: 'link-icon',
    previewImage: 'svg',
    description: 'project:cardAdd'
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
      icon: {
        label: 'project:icon',
        type: 'select',
        choices: iconChoices
      },
      bg: {
        label: 'project:cardBackground',
        type: 'boolean',
        def: true
      },
      orientation: {
        label: 'project:orientation',
        type: 'select',
        choices: [
          {
            value: 'horizontal',
            label: 'project:horizontal'
          },
          {
            value: 'vertical',
            label: 'project:vertical'
          }
        ],
        def: 'horizontal'
      },
      ...localLinkConfig,
      style: {
        type: 'select',
        label: 'project:linkStyle',
        if: {
          orientation: 'vertical'
        },
        choices: [
          {
            label: 'project:primary',
            value: 'primary',
            def: true
          },
          {
            label: 'project:outline',
            value: 'outline'
          }
        ]
      }
    }
  }
};
