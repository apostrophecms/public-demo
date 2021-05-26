module.exports = {
  fields: {
    add: {
      _footerLinks: {
        label: 'Footer Links',
        type: 'relationship',
        withType: '@apostrophecms/page'
      },
      siteTitle: {
        label: 'Site Title',
        type: 'string'
      }
    },
    group: {
      general: {
        label: 'General',
        fields: [ 'siteTitle', '_footerLinks' ]
      }
    }
  }
};
