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
        type: 'date'
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
  init(self) {
    // blurb used to be a string; now we've decided it should be
    // a rich text widget. Make the conversion with a migration
    self.apos.migration.add('blurb', async () => {
      await self.apos.migration.eachDoc({
        type: 'article'
      }, 5, async (doc) => {
        if ((typeof doc.blurb) === 'string') {
          doc.blurb = self.apos.area.fromPlaintext(doc.blurb);
          return self.apos.doc.db.updateOne({
            _id: doc._id
          }, {
            $set: {
              blurb: doc.blurb
            }
          });
        }
      });
    });
  }
};
