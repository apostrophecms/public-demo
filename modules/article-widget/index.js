export default {
  extend: '@apostrophecms/widget-type',
  options: {
    name: 'article',
    label: 'project:articleRecentArticles',
    description: 'project:articleWidgetDescription',
    icon: 'text-subject',
    previewImage: 'svg'
  },
  fields: {
    add: {
      limit: {
        type: 'integer',
        label: 'project:limit',
        def: 5
      },
      display: {
        type: 'select',
        label: 'project:articleOrientation',
        def: 'vertical',
        choices: [
          {
            label: 'project:vertical',
            value: 'vertical'
          },
          {
            label: 'project:horizontal',
            value: 'horizontal'
          }
        ]
      }
    }
  },
  icons: {
    'text-subject': 'TextSubject'
  }
};
