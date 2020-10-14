module.exports = {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Custom Page',
    pluralLabel: 'Custom Pages'
  },
  fields: {
    add: {
      magicWord: {
        label: 'What\'s the magic word?',
        type: 'string',
        def: 'Please'
      },
      main: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                '|',
                'bold',
                'italic',
                'strike',
                'link',
                '|',
                'bullet_list',
                'ordered_list',
                '|',
                'blockquote',
                'code_block',
                '|',
                'horizontal_rule',
                '|',
                'undo',
                'redo'
              ],
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
            },
            'two-column': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'magicWord'
        ]
      },
      areas: {
        label: 'Areas',
        fields: [ 'main' ]
      }
    }
  }
};
