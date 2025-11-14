import linkConfig from '../../lib/link.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Hero',
    icon: 'link-icon',
    previewImage: 'svg',
    description: 'Add a main hero to your page'
  },
  fields: {
    add: {
      content: {
        label: 'Text Content',
        help: 'The text content for the hero',
        type: 'area',
        max: 1,
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                'bold',
                'italic'
                // 'alignLeft',
                // 'alignCenter',
                // 'alignRight'
              ],
              styles: [
                {
                  tag: 'p',
                  label: 'Paragraph (P)'
                },
                {
                  tag: 'h2',
                  label: 'Heading 2 (H2)'
                },
                {
                  tag: 'h3',
                  label: 'Heading 3 (H3)'
                },
                {
                  tag: 'h4',
                  label: 'Heading 4 (H4)'
                }
              ]
            }
          }
        }
      },
      links: {
        label: 'Button links',
        help: 'Add button links to the bottom of the hero',
        type: 'array',
        titleField: 'linkText',
        fields: {
          add: {
            ...linkConfig.link,
            style: {
              type: 'select',
              label: 'Style',
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
      }
    }
  }
};
