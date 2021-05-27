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
      'redo',
      'alignLeft',
      'alignCenter',
      'alignRight',
      'alignJustify'
    ],
    styles: [
      // you may also use a `class` property with these
      {
        tag: 'span',
        class: 'spanny',
        label: 'Nice Span'
      },
      {
        tag: 'span',
        label: 'Ugly Span'
      },
      {
        tag: 'span',
        label: 'Multi class Span',
        class: 'this is cool'
      },
      {
        tag: 'p',
        label: 'My paragraph',
        class: 'css-axufdj',
      },
      {
        tag: 'p',
        label: 'another paragraph',
        class: 'evys1bk0',
      },
      {
        tag: 'p',
        label: 'third paragraph',
        class: 'biill',
      },
      {
        tag: 'h3',
        label: 'Heading 3 (H3)',
        class: 'jerky'
      },
      {
        tag: 'h2',
        label: 'Heading 2 (H2)',
        class: 'friendly'
      },
      {
        tag: 'h1',
        label: 'Heading 1 (H1)'
      },
      {
        tag: 'mark',
        label: 'Highlight me',
        class: 'marker'
      },
      {
        tag: 'code',
        label: 'Beep Bop Code',
        class: 'beep'
      },
      {
        tag: 'em',
        label: 'special italic',
        class: 'lean-back'
      },
      {
        tag: 'del',
        label: 'Forget this',
        class: 'delete'
      },
      {
        tag: 'u',
        label: 'underline me',
        class: 'underlines'
      },
      {
        tag: 'pre',
        label: 'PRE codeblock',
        class: 'sf30'
      },
      {
        tag: 'blockquote',
        label: 'Blockquote',
        class: 'quotes'
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
