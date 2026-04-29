import dayjs from 'dayjs';
import { fullConfig } from '../../lib/area.js';

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'project:article',
    pluralLabel: 'project:articles',
    sort: {
      publishedDate: -1,
      createdAt: -1
    }
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
      publishedDate: {
        label: 'project:articlePublishedDate',
        help: 'project:articlePublishedDateHelp',
        type: 'date',
        // Don't display "Invalid Date"
        required: true
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
          'publishedDate'
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
          articles: await self.find(req).limit(data.limit).sort({ createdAt: -1 }).toArray(),
          display: data.display
        };
      }
    };
  },
  filters: {
    add: {
      future: {
        label: 'project:futureArticles',
        def: null
      }
    }
  },
  queries(self, query) {
    return {
      builders: {
        // Public sees only future posts
        // Editors can see future posts, otherwise they can't
        // edit them in context
        future: {
          def: null,
          finalize() {
            let future = query.get('future');

            if (!self.apos.permission.can(query.req, 'edit', self.name, 'draft')) {
              // General public cannot see posts before their publication date
              future = false;
            }

            if (future === null) {
              return;
            }

            const today = dayjs().format('YYYY-MM-DD');
            if (future) {
              query.and({ publishedDate: { $gte: today } });
            } else {
              query.and({ publishedDate: { $lte: today } });
            }
          },

          launder(value) {
            return self.apos.launder.booleanOrNull(
              value === '' ? null : value
            );
          },

          choices() {
            return [
              {
                value: null,
                label: 'project:both'
              },
              {
                value: true,
                label: 'project:future'
              },
              {
                value: false,
                label: 'project:past'
              }
            ];
          }
        }
      }
    };
  }
};
