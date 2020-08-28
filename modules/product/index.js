module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      price: {
        type: 'string'
      },
      blurb: {
        type: 'area',
        options: {
          widgets: {
            'test1': {},
            '@apostrophecms/rich-text': {
              toolbar: [ 'bold', 'italic', 'link' ]
            }
          }
        }
      },
      date: {
        type: 'date'
      },
      time: {
        type: 'time'
      },
      float: {
        type: 'float'
      },
      integer: {
        type: 'integer'
      }
    }
  },
  components(self, options) {
    return {
      async list(req, data) {
        return {
          products: await self.find(req).limit(data.limit).toArray()
        };
      }
    };
  },
  handlers(self, options) {
    return {
      afterSave: {
        test(req, doc) {
          self.apos.notify(req, 'New product added: ' + doc.title);
        }
      }
    }
  }
};
