const basicConfig = {
  '@apostrophecms/image': {},
  '@apostrophecms/video': {},
  '@apostrophecms/rich-text': {
    toolbar: [
      'styles',
      'bold',
      'italic',
      'strike',
      'link',
      'bulletList',
      'orderedList',
      'blockquote',
      'underline',
      'horizontalRule',
      'codeBlock',
      'undo',
      'redo'
    ],
    styles: [
      // you may also use a `class` property with these
      // {
      //   tag: 'hg2',
      //   label: 'Heading 2 (H2)'
      // },
      // {
      //   tag: 'span',
      //   label: 'Cool Span',
      //   class: 'yaaaaaa'
      // },
      // {
      //   tag: 'ddd',
      //   label: 'Good Code',
      //   class: 'good-code'
      // },
      // {
      //   tag: 'strrrrong',
      //   label: 'Strong BOy!',
      //   class: 'strongbrad'
      // },
      {
        tag: 'p',
        label: 'My ParaGraph',
        class: 'jg',
      },
      {
        tag: 'h3',
        label: 'Heading 3 (H3)',
        class: 'jerky'
      }
    ]
  }
};

const fullConfig = Object.assign({
  'two-column': {},
  article: {}
}, basicConfig);

module.exports = {
  basicConfig,
  fullConfig
};
