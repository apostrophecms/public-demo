import { fullConfig } from '../../lib/area.js';

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    sort: {
      publishedDate: -1,
      createdAt: -1
    }
  },
  fields: {
    add: {
      blurb: {
        type: 'area',
        label: 'Blurb',
        help: 'A short summary.',
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
        label: 'Published Date',
        type: 'date'
      },
      _topics: {
        label: 'Article topics',
        type: 'relationship',
        withType: 'topic'
      },
      _image: {
        label: 'Featured Image',
        type: 'relationship',
        withType: '@apostrophecms/image',
        aspectRatio: [ 2, 1 ]
      },
      main: {
        label: 'Content',
        type: 'area',
        options: {
          widgets: fullConfig
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'blurb'
        ]
      },
      main: {
        label: 'Content',
        fields: [
          'main',
          '_image',
          '_topics'
        ]
      }
    }
  },
  columns: {
    add: {
      _topics: {
        label: 'Topics',
        component: 'DemoCellRelation'
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
