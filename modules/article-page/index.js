module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Article Index Page',
    pluralLabel: 'Article Index Pages'
  },
  fields: {
    add: {
      intro: {
        type: 'area',
        options: {
          limit: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                'bold',
                'italic',
                'strike',
                'link',
                'bullet_list',
                'ordered_list',
                'blockquote'
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
            }
          }
        }

      }
    }
  }
  // Infers from its name that it will display an index of articles,
  // as well as serving subpages for them
};
