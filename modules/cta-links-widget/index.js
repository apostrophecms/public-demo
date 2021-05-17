const areaConfig = require('../../lib/area').basicConfig;

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'CTA Links',
    icon: 'pillar'
  },
  fields: {
    add: {
    links: {
      label: 'CTA Links',
      help: 'Linkzzz',
      type: 'array',
      titleField: 'label',
      fields: {
        add: {
          label: {
            type: 'string',
            label: 'Button Label',
            help: 'What appears on the button'
          },
          helpLabel: {
            type: 'string',
            label: 'Help Label',
            help: 'Appears outside button in a handwritten style typeface.'
          },
          helpArrow: {
            type: 'select',
            choices: [
              {
                label: 'Points Left',
                value: 'left'
              },
              {
                label: 'Points Right',
                value: 'right'
              }
            ],
            help: 'Connects your help label with the button'
          },
          color: {
            type: 'color',
            label: 'Accent Link',
            help: 'Hover state and Help Label will be styled with this'
          },
          _page: {
            label: 'Page',
            type: 'relationship',
            withType: '@apostrophecms/page',
            builders: {
              // project: {
              //   title: 1,
              //   type: 1,
              //   checkFields: 1
              // }
            }
          },
        }
      }
    },
    }
  },
  icons: {
    pillar: 'Pillar'
  }
};
