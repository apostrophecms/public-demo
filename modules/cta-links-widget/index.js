const linkConfig = require('../../lib/link');

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'CTA Links',
    icon: 'link-icon'
  },
  fields: {
    add: {
      links: {
        label: 'CTA Links',
        help: 'Add Links to the page',
        type: 'array',
        titleField: 'linkText',
        fields: {
          add: {
            ...linkConfig.link,
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
            }
          }
        }
      }
    }
  }
};
