module.exports = {
  options: {
    label: 'Nested Arrays With Sub-Areas'
  },
  extend: '@apostrophecms/widget-type',
  fields: {
    add: {
      parents: {
        label: 'Parents',
        type: 'array',
        fields: {
          add: {
            name: {
              label: 'Name',
              type: 'string'
            },
            about: {
              type: 'area',
              label: 'About',
              options: {
                widgets: {
                  '@apostrophecms/rich-text': {},
                  '@apostrophecms/video': {},
                  'array-nested': {}
                }
              }
            },
            children: {
              label: 'Children',
              type: 'array',
              fields: {
                add: {
                  name: {
                    label: 'Name',
                    type: 'string'
                  },
                  about: {
                    label: 'About',
                    type: 'area',
                    max: 1,
                    options: {
                      widgets: {
                        '@apostrophecms/rich-text': {},
                        '@apostrophecms/video': {},
                        'array-nested': {}
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
