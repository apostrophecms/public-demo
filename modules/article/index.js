import dayjs from 'dayjs';
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
          articles: await self.find(req).limit(data.limit).sort({ createdAt: -1 }).toArray(),
          display: data.display
        };
      }
    };
  },
  filters: {
    // The best experience comes with just the month filter
    remove: [ 'day', 'year' ]
  },
  init(self) {
    // A temporary migration until all of our own deployments have seen this.
    // It's harmless but we don't need to leave it in this starter kit forever
    console.log('adding migration');
    self.apos.migration.add('publishedDateToPublishedAt2', async () => {
      console.log('-->', self.name);
      await self.apos.doc.db.updateMany({
        type: self.name,
        publishedDate: { $exists: 1 },
        publishedAt: { $exists: 0 }
      }, {
        $rename: { publishedDate: 'publishedAt' }
      });
    });
  }
};
