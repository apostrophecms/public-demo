import linkConfig from '../../lib/link.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'project:hero',
    icon: 'link-icon',
    previewImage: 'svg',
    description: 'project:heroDescription'
  },
  fields: {
    add: {
      content: {
        label: 'project:textContent',
        help: 'project:textContentHelp',
        type: 'area',
        max: 1,
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                'bold',
                'italic'
              ],
              styles: [
                {
                  tag: 'p',
                  label: 'project:rtParagraph'
                },
                {
                  tag: 'h2',
                  label: 'project:rtH2'
                },
                {
                  tag: 'h3',
                  label: 'project:rtH3'
                },
                {
                  tag: 'h4',
                  label: 'project:rtH4'
                }
              ]
            }
          }
        }
      },
      links: {
        label: 'project:buttonLinks',
        help: 'project:buttonLinksDescription',
        type: 'array',
        titleField: 'linkText',
        fields: {
          add: {
            ...linkConfig.link,
            style: {
              type: 'select',
              label: 'project:style',
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
      }
    }
  }
};
