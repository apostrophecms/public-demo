export default {
  fields: {
    add: {
      siteTitle: {
        label: 'project:siteTitle',
        type: 'string',
        def: 'ApostropheCMS Site'
      },
      // Relationship fields (prefixed with _): Apostrophe populates these at request
      // time and returns them as arrays, even when max: 1. In templates, use
      // apos.image.first(data.global._siteLogo) to safely extract the attachment object.
      _siteLogo: {
        label: 'project:siteLogo',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 1
      },
      _siteLogoDark: {
        label: 'project:siteLogoDark',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 1
      }
    },
    group: {
      general: {
        label: 'project:general',
        fields: [ 'siteTitle', '_siteLogo', '_siteLogoDark', 'favicon' ]
      }
    }
  }
};
