module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      features: {
        type: 'array',
        fields: {
          add: {
            title: {
              type: 'string',
              label: 'Title'
            },
            importance: {
              type: 'integer',
              label: 'Importance',
              def: 1
            },
            drawbacks: {
              type: 'array',
              label: 'Drawbacks',
              fields: {
                add: {
                  title: {
                    type: 'string',
                    label: 'Title'
                  }
                }
              }
            }
          }
        }
      },
      price: {
        type: 'string'
      },
      taxes: {
        type: 'string'
      },
      color: {
        type: 'select',
        choices: [
          {
            label: 'Red',
            value: 'red'
          },
          {
            label: 'Blue',
            value: 'blue'
          },
          {
            label: 'Yellow',
            value: 'yellow'
          }
        ]
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
      },
      email: {
        type: 'email'
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['blurb']
      },
      priceFields: {
        label: 'Price Fields',
        fields: [ 'price', 'taxes' ]
      }
    }
  },
  options: {
    filters: [
      {
        name: 'color',
        label: 'Color',
        inputType: 'select',
        def: null,
        choices: [
          {
            label: 'Red',
            value: 'red'
          },
          {
            label: 'Blue',
            value: 'blue'
          },
          {
            label: 'Yellow',
            value: 'yellow'
          }
        ]
      }
    ]
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
      afterInsert: {
        insertNotif(req, doc) {
          self.apos.notify(req, 'New product added: %s', doc.title, { dismiss: true, type: 'success' });
        }
      },
      afterUpdate: {
        updateNotif(req, doc) {
          self.apos.notify(req, 'Product %s updated', doc.title, { dismiss: true, type: 'success' });
        }
      }
    }
  }
};
