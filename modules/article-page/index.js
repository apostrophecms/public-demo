export default {
  extend: '@apostrophecms/blog-page',
  options: {
    label: 'project:articleIndexPage',
    pluralLabel: 'project:articleIndexPages',
    // Replaces blog-page's year/month/day filters. Each filter gets a
    // `data.filters` entry in the index template and, with `static: true` on
    // @apostrophecms/url, its own dispatch routes (`/categories/:value`).
    piecesFilters: [
      { name: 'categories' },
      { name: 'author' }
    ]
  },
  fields: {
    add: {
      intro: {
        label: 'project:articleIntro',
        type: 'area',
        options: {
          limit: 1,
          widgets: {
            '@apostrophecms/rich-text': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: 'project:basics',
        fields: [ 'intro' ]
      }
    }
  }
  // Infers from its name that it will display an index of articles,
  // as well as serving subpages for them
};
