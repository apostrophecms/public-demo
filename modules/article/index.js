import { fullConfig } from '../../lib/area.js';

export default {
  extend: '@apostrophecms/blog',
  options: {
    label: 'project:article',
    pluralLabel: 'project:articles'
  },
  fields: {
    add: {
      blurb: {
        type: 'area',
        label: 'project:articleBlurb',
        help: 'project:articleBlurbHelp',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'bold', 'italic' ]
            }
          }
        }
      },
      _categories: {
        label: 'project:articleCategories',
        type: 'relationship',
        withType: 'article-category'
      },
      _author: {
        label: 'project:articleAuthor',
        type: 'relationship',
        withType: '@apostrophecms/user',
        max: 1
      },
      _image: {
        label: 'project:articleFeaturedImage',
        type: 'relationship',
        withType: '@apostrophecms/image',
        aspectRatio: [ 2, 1 ]
      },
      main: {
        label: 'project:content',
        type: 'area',
        options: {
          widgets: fullConfig
        }
      }
    },
    group: {
      basics: {
        label: 'project:basics',
        fields: [
          'title',
          'blurb',
          'publishedAt'
        ]
      },
      main: {
        label: 'project:content',
        fields: [
          '_image',
          'main'
        ]
      },
      utility: {
        fields: [
          'slug',
          'visibility',
          '_author',
          '_categories'
        ]
      }
    }
  },
  columns: {
    add: {
      _categories: {
        label: 'project:articleCategoriesColumn',
        component: 'DemoCellRelation'
      },
      _author: {
        label: 'project:articleAuthorColumn',
        component: 'DemoCellRelation'
      },
      _image: {
        label: 'project:articleFeaturedImageColumn',
        component: 'DemoCellImage'
      }
    }
  },
  components(self) {
    return {
      async recent(req, data) {
        return {
          // No explicit sort: @apostrophecms/blog already orders by publishedAt.
          articles: await self.find(req).limit(data.limit).toArray(),
          display: data.display
        };
      }
    };
  },
  filters: {
    // The best experience comes with just the month filter
    remove: [ 'day', 'year' ]
  }
};
