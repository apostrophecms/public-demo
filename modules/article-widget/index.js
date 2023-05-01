module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    name: 'article',
    label: 'Recent Articles',
    description: 'Display a list of recent or curated articles',
    icon: 'text-subject',
    previewImage: 'svg'
  },
  fields: {
    add: {
      limit: {
        type: 'integer',
        label: 'Limit',
        def: 5
      }
    }
  },
  icons: {
    'text-subject': 'TextSubject'
  }
};
