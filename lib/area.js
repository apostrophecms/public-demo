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
      'alignLeft',
      'alignCenter',
      'alignRight',
      'codeBlock',
      'undo',
      'redo'
    ],
    insert: [ 'table', 'image' ],
    styles: [
      // you may also use a `class` property with these
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
      },
      {
        tag: 'h5',
        label: 'Meta (H5)',
        class: 'meta'
      },
      {
        tag: 'span',
        label: 'Highlight: Red',
        class: 'highlight-red'
      },
      {
        tag: 'span',
        label: 'Highlight: Dark Orange-Yellow',
        class: 'highlight-mustard'
      },
      {
        tag: 'span',
        label: 'Highlight: Purple',
        class: 'highlight-purple'
      },
      {
        tag: 'span',
        label: 'Highlight: Blue',
        class: 'highlight-blue'
      },
      {
        tag: 'span',
        label: 'Highlight: Seafoam',
        class: 'highlight-seafoam'
      }
    ]
  },
  container: {},
  button: {},
  'github-prs': {}
};

const fullConfig = Object.assign({
  columns: {},
  article: {},
  'cta-links': {}
}, basicConfig);

const fullConfigExpandedGroups = {
  layout: {
    label: 'Layout Tools',
    widgets: {
      columns: {},
      container: {}
    },
    columns: 2
  },
  media: {
    label: 'Media',
    widgets: {
      '@apostrophecms/image': {},
      '@apostrophecms/video': {}
    },
    columns: 2
  },
  elements: {
    label: 'Elements',
    widgets: {
      button: {},
      'github-prs': {},
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
          'alignLeft',
          'alignCenter',
          'alignRight'
        ],
        insert: [ 'table', 'image' ],
        styles: [
          // you may also use a `class` property with these
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
          },
          {
            tag: 'h5',
            label: 'Meta (H5)',
            class: 'meta'
          },
          {
            tag: 'span',
            label: 'Highlight: Red',
            class: 'highlight-red'
          },
          {
            tag: 'span',
            label: 'Highlight: Dark Orange-Yellow',
            class: 'highlight-mustard'
          },
          {
            tag: 'span',
            label: 'Highlight: Purple',
            class: 'highlight-purple'
          },
          {
            tag: 'span',
            label: 'Highlight: Blue',
            class: 'highlight-blue'
          },
          {
            tag: 'span',
            label: 'Highlight: Seafoam',
            class: 'highlight-seafoam'
          },
          {
            tag: 'span',
            label: 'Monospace',
            class: 'type-mono'
          },
          {
            tag: 'span',
            label: 'Red Underline',
            class: 'type-red-underline'
          },
          {
            tag: 'span',
            label: 'Seafoam Underline',
            class: 'type-seafoam-underline'
          },
          {
            tag: 'span',
            label: 'Wide Tracking',
            class: 'type-wide-tracking'
          },
          {
            tag: 'span',
            label: 'Rainbow Hover',
            class: 'type-rainbow-hover'
          }
        ]
      },
      article: {},
      'cta-links': {}
    },
    columns: 3
  }
};

export {
  basicConfig,
  fullConfig,
  fullConfigExpandedGroups
};
