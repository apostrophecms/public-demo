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
                'styles',
                'italic',
                'strike',
                'link',
                'alignLeft',
                'alignCenter',
                'alignRight',
                'table',
                'image',
                'undo',
                'redo'
              ],
              styles: richTextArea.styles,
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
