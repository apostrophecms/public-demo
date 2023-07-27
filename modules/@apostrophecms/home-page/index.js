const { fullConfig, fullConfigExpandedGroups } = require('../../../lib/area');
const richTextArea = fullConfig['@apostrophecms/rich-text'];

module.exports = {
  options: {
    label: 'Home Page',
    pluralLabel: 'Home Pages'
  },
  fields: {
    add: {
      cta: {
        type: 'area',
        contextual: true,
        max: 1,
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'italic',
                'strike',
                'link',
                'undo',
                'redo'
              ],
              insert: richTextArea.insert
            }
          }
        }
      },
      ctaLinks: {
        type: 'area',
        contextual: true,
        max: 1,
        options: {
          widgets: {
            'cta-links': {}
          }
        }
      },
      main: {
        type: 'area',
        options: {
          expanded: true,
          groups: fullConfigExpandedGroups
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'main',
          'cta',
          'ctaLinks'
        ]
      }
    }
  }
};
