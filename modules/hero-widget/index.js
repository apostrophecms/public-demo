import linkConfig from '../../lib/link.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Hero',
    icon: 'link-icon',
    previewImage: 'svg',
    description: 'Add a main hero to your page',
    defaultData: {
      content: "\
        <h2>Transforming Ideas Into Digital Reality</h2>\
        <p>\
          We create innovative digital solutions that drive growth and elevate your \
          brand. From web development to digital marketing, we're your partners in \
          digital transformation.\
        </p>\
      ",
      links: [{
        linkText: 'Placeholder button',
        linkType: 'custom',
        style: 'primary',
        linkUrl: 'http://google.com'
      }],
    }
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
