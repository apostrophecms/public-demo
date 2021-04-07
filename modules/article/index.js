module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      string: {
        // readOnly: true,
        label: 'String',
        type: 'string',
        required: true,
        help: 'One cannot separate orchestras from cheerful magicians. The fructed knowledge reveals itself as an unkempt tub to those who look. This could be, or perhaps few can name a crimpy thailand that isn\'t a shadeless literature. A timer can hardly be considered an unfilled chalk without also being a priest. The almanacs could be said to resemble chaster beards.'
      },
      blockString: {
        // readOnly: true,
        label: 'Text area',
        type: 'string',
        textarea: true
      },
      slugger: {
        // readOnly: true,
        type: 'slug',
        label: 'Fake Slug',
        textarea: true
      },
      timeField: {
        // readOnly: true,
        label: 'TIME',
        type: 'time',
        def: null
      },
      main: {
        // readOnly: true,
        label: 'Content',
        type: 'area',
        options: {
          widgets: require('../../lib/area').fullConfig
        }
      },
      singleton: {
        // readOnly: true,
        label: 'Singleton Video',
        type: 'area',
        max: 1,
        options: {
          widgets: {
            '@apostrophecms/video': {}
          }
        }
      },
      _articles: {
        // readOnly: true,
        label: 'Joined article',
        type: 'relationship',
        withType: 'article',
        max: 2,
        builders: {
          project: {
            title: 1,
            type: 1,
            categoriesIds: 1
          }
        }
      },
      arrayField: {
        // readOnly: true,
        label: 'Label',
        type: 'array',
        titleField: 'Array Label',
        min: 2,
        fields: {
          add: {
            string: {
              type: 'string',
              label: 'String'
            },
            moreString: {
              type: 'string',
              label: 'More String'
            }
          }
        }
      },
      attachmentField: {
        // readOnly: true,
        label: 'Attachment',
        type: 'attachment',
        group: 'office'
      },
      photoField: {
        // readOnly: true,
        label: 'Photo attachment',
        type: 'attachment',
        group: 'image'
      },
      booleanField: {
        // readOnly: true,
        label: 'Boolean',
        type: 'boolean',
      },
      booleanCustom: {
        // readOnly: true,
        label: 'Labeled Boolean',
        type: 'boolean',
        choices: [
          {
            label: 'Go',
            value: true
          },
          {
            label: 'Stop',
            value: false
          }
        ]
      },
      checkFields: {
        // readOnly: true,
        label: 'Label',
        type: 'checkboxes',
        choices: [
          {
            label: 'Small',
            value: 'small'
          },
          {
            label: 'Medium',
            value: 'med'
          },
          {
            label: 'Big',
            value: 'big'
          }
        ]
      },
      radioFields: {
        // readOnly: true,
        label: 'Radio',
        type: 'radio',
        choices: [
          {
            label: 'Small',
            value: 'small'
          },
          {
            label: 'Medium',
            value: 'med'
          },
          {
            label: 'Big',
            value: 'big'
          }
        ]
      },
      colorField: {
        // readOnly: true,
        type: 'color',
        label: 'Color',
      },
      dateField: {
        readOnly: true,
        // name: 'dateField',
        label: 'Date',
        type: 'date',
        // min: '2020-01-01'
      },
      emailField: {
        readOnly: true,
        type: 'email',
        max: 5,
        // required: true
      },
      floatField: {
        // readOnly: true,
        label: 'Float',
        type: 'float',
        // min: 1.0,
        max: 4.0
      },
      integerField: {
        // readOnly: true,
        label: 'Integer',
        type: 'integer',
        min: 3,
        max: 9
      },
      oembedField: {
        // readOnly: true,
        label: 'Embedder',
        // required: true,
        type: 'oembed'
      },
      passwordField: {
        // readOnly: true,
        // name: 'passwordField',
        label: 'Password',
        type: 'password'
      },
      rangeField: {
        // readOnly: true,
        type: 'range',
        label: 'Range',
        min: 18,
        max: 32,
        step: 2 // optional
      },
      selector: {
        // readOnly: true,
        label: 'Select a color scheme for this page',
        type: 'select',
        choices: [
          {
            label: 'Dark 🌚',
            value: 'dark'
          },
          {
            label: 'Light 💡',
            value: 'light'
          },
          {
            label: 'Dusk 🌆',
            value: 'dusk'
          },
          {
            label: 'Swamp 🐢',
            value: 'swamp'
          }
        ]
      },
      urlField: {
        // readOnly: true,
        label: 'URL',
        // required: true,
        type: 'url'
      }
    },
    group: {
      strings: {
        label: 'Strings',
        fields: [
          'title',
          'string',
          'blockString',
          'timeField',
          'dateField',
          'emailField',
          'passwordField',
          'slugger'
        ]
      },
      basics: {
        label: 'Basics',
        fields: [
          // '_articles',
          'attachmentField',
          'booleanField',
          'checkFields',
          'radioFields',
          'colorField',
          'floatField',
          'integerField',
          'rangeField',
          'selector',
          'booleanCustom'
        ]
      },
      main: {
        label: 'Content',
        fields: [
          'arrayField',
          'main',
          'singleton'
        ]
      }
    }
  }
};