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
              toolbar: [ 'bold', 'italic' ]
            }
          }
        }
      },
      condition: {
        label: 'Condition',
        help: 'If Foo or Qux are checked, get a hidden field',
        type: 'checkboxes',
        choices: [
          {
            value: 'foo',
            label: 'Foo'
          },
          {
            value: 'bar',
            label: 'Bar'
          },
          {
            value: 'baz',
            label: 'Baz'
          },
          {
            value: 'qux',
            label: 'Qux'
          }
        ]
      },
      conditionalField: {
        if: {
          $or: [
            { condition: 'foo' },
            { condition: 'qux' }
          ]
        },
        type: 'string',
        label: 'It\'s a secret to everyone',
        help: 'Dee dee dee-deeeeeee'
      },
      _topics: {
        label: 'Article topics',
        type: 'relationship',
        withType: 'topic'
      },
      main: {
        label: 'Content',
        type: 'area',
        options: {
          widgets: require('../../lib/area').fullConfig
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
          '_topics'
        ]
      },
      conditions: {
        label: 'Conditions',
        fields: [
          'condition',
          'conditionalField'
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
          articles: await self.find(req).limit(data.limit).sort({ createdAt: -1 }).toArray()
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
    const req = self.apos.task.getReq();
    console.log(req.__('admin req test of req.__ fallback helper'));
    console.log(req.res.__('admin req test of res.__ fallback helper'));
  },
  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        testWarning(req) {
          console.log(req.__('normal req test of req.__ fallback helper'));
          console.log(req.res.__('normal res test of req.__ fallback helper'));
        }
      }
    };
  }
};
