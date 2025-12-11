const defaultRtConfig = {
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
      class: 'large',
      tag: 'p',
      label: 'Large Paragraph (P)'
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
      label: 'Heading 5 (H5)'
    },
    {
      tag: 'h6',
      label: 'Meta (H6)',
      class: 'meta'
    },
    {
      tag: 'span',
      class: 'highlight-red',
      label: 'Red Highlight'
    },
    {
      tag: 'span',
      class: 'highlight-seafoam',
      label: 'Seafoam Highlight'
    },
    {
      tag: 'span',
      class: 'highlight-blue',
      label: 'Blue Highlight'
    },
    {
      tag: 'span',
      class: 'highlight-mustard',
      label: 'Mustard Highlight'
    },
    {
      tag: 'span',
      class: 'highlight-purple',
      label: 'Purple Highlight'
    }
  ]
};

const basicConfig = {
  '@apostrophecms/image': {},
  '@apostrophecms/video': {},
  '@apostrophecms/rich-text': defaultRtConfig,
  '@apostrophecms/layout': {},
  button: {},
  'github-prs': {}
};

const fullConfig = Object.assign({
  '@apostrophecms/layout': {},
  article: {},
  card: {},
  'price-card': {}
}, basicConfig);

const fullConfigExpandedGroups = {
  layout: {
    label: 'Layout Tools',
    widgets: {
      '@apostrophecms/layout': {}
    },
    columns: 1
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
      hero: {},
      button: {},
      'github-prs': {},
      '@apostrophecms/rich-text': defaultRtConfig,
      article: {},
      'price-card': {}
    },
    columns: 3
  }
};

export {
  basicConfig,
  fullConfig,
  fullConfigExpandedGroups
};
