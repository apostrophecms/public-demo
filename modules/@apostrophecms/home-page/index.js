module.exports = {
  fields: {
    add: {
      top: {
        type: 'area',
        options: {
          widgets: {

          }
        }
      },
      main: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'styles', 'bold', 'italic', 'link' ],
              styles: [
                { tag: 'p', label: 'Paragraph (P)' },
                { tag: 'h3', label: 'Heading 3 (H3)' },
                { tag: 'h4', label: 'Heading 4 (H4)' }
              ]
            },
            'two-column': {}
          }
        }
      }
    }
  }
};
