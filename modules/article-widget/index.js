module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    name: 'article',
    label: 'Recent Articles',
    icon: 'text-subject'
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
  init(self, options) {
    self.apos.asset.addIcon('text-subject', 'TextSubject');
  }
};
