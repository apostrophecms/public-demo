export default {
  fields: {
    add: {
      siteTitle: {
        label: 'project:siteTitle',
        type: 'string',
        def: 'project:apostropheCmsSite'
      },
      _siteLogo: {
        label: 'project:siteLogo',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 1
      }
    },
    group: {
      general: {
        label: 'project:general',
        fields: [ 'siteTitle', '_siteLogo', 'favicon' ]
      }
    }
  }
};
