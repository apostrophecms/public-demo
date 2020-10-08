module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Two Column'
  },
  fields: {
    add: {
      left: {
        type: 'area',
        contextual: true,
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'styles', 'bold', 'italic', 'link' ],
              styles: [
                {
                  tag: 'p',
                  label: 'Paragraph (P)'
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
      right: {
        type: 'area',
        contextual: true,
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'styles', 'bold', 'italic', 'link' ],
              styles: [
                {
                  tag: 'p',
                  label: 'Paragraph (P)'
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
      }
    }
  }
};
