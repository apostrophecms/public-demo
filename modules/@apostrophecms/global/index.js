export default {
  fields: {
    add: {
      siteTitle: {
        label: 'project:siteTitle',
        type: 'string',
        def: 'project:apostropheCmsSite'
      }
    },
    group: {
      general: {
        label: 'project:general',
        fields: [ 'siteTitle', 'footerLinks' ]
      }
    }
  }
};
