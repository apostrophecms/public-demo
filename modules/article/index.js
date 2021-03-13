module.exports = {
  extend: '@apostrophecms/piece-type',
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
              toolbar: [ 'Bold', 'Italic' ]
            }
          }
        }
      },
      main: {
        label: 'Content',
        type: 'area',
        options: {
          widgets: require('../../lib/area').fullConfig
        }
      },
      flavor: {
        type: 'select',
        choices: [
          {
            value: 'grape',
            label: 'Grape'
          },
          {
            value: 'strawberry',
            label: 'Strawberry'
          }
        ]
      },
      advantages: {
        type: 'array',
        fields: {
          add: {
            title: {
              type: 'string'
            }
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'radios',
          'title',
          'visibility',
          'blurb'
        ]
      },
      main: {
        label: 'Content',
        fields: [
          'main'
        ]
      }
    }
  },
  filters: {
    add: {
      flavor: {
        label: 'Flavor'
      }
    }
  },
  components(self, options) {
    return {
      async recent(req, data) {
        return {
          articles: await self.find(req).limit(data.limit).sort({ createdAt: -1 }).toArray()
        };
      }
    };
  },
  init(self, options) {
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
