// Widget lists for area fields. Import the one that fits into an area's
// `widgets` (or `groups`) option instead of listing widgets inline, so adding a
// widget to the site means changing one file.

// Rich text toolbar and styles, shared by every config below so the editor
// looks the same wherever rich text appears.
const defaultRtConfig = {
  toolbar: [
    'styles',
    'bold',
    'italic',
    'strike',
    'link',
    'anchor',
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
      label: 'project:rtParagraph',
      class: null
    },
    {
      class: 'large',
      tag: 'p',
      label: 'project:rtParagraphLarge'
    },
    {
      tag: 'h2',
      label: 'project:rtH2'
    },
    {
      tag: 'h3',
      label: 'project:rtH3'
    },
    {
      tag: 'h4',
      label: 'project:rtH4'
    },
    {
      tag: 'h5',
      label: 'project:rtH5'
    },
    {
      tag: 'h6',
      label: 'project:rtMetaH6',
      class: 'meta'
    },
    {
      tag: 'span',
      class: 'highlight-red',
      label: 'project:rtHighlightRed'
    },
    {
      tag: 'span',
      class: 'highlight-seafoam',
      label: 'project:rtHighlightSeafoam'
    },
    {
      tag: 'span',
      class: 'highlight-blue',
      label: 'project:rtHighlightBlue'
    },
    {
      tag: 'span',
      class: 'highlight-mustard',
      label: 'project:rtHighlightMustard'
    },
    {
      tag: 'span',
      class: 'highlight-purple',
      label: 'project:rtHighlightPurple'
    }
  ]
};

// Media, rich text, layout, and simple elements. For areas that don't need
// the editorial widgets (articles, cards, price cards).
const basicConfig = {
  '@apostrophecms/image': {},
  '@apostrophecms/video': {},
  '@apostrophecms/rich-text': defaultRtConfig,
  '@apostrophecms/layout': {},
  button: {},
  'github-prs': {}
};

// basicConfig plus the editorial widgets, as a flat list. Used by the article
// body and by layout columns.
const fullConfig = Object.assign({
  '@apostrophecms/layout': {},
  article: {},
  card: {},
  'price-card': {}
}, basicConfig);

// Grouped widgets for the expanded widget picker. Pass this as `groups` (not
// `widgets`) alongside `expanded: true`, as the home and default page types do.
const fullConfigExpandedGroups = {
  layout: {
    label: 'project:layoutTools',
    widgets: {
      '@apostrophecms/layout': {}
    },
    columns: 1
  },
  media: {
    label: 'project:media',
    widgets: {
      '@apostrophecms/image': {},
      '@apostrophecms/video': {}
    },
    columns: 2
  },
  elements: {
    label: 'project:elements',
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
