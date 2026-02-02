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
      },
      width: {
        label: 'apostrophe:styleBorderWidth',
        type: 'box',
        def: {
          top: 1,
          right: 1,
          bottom: 1,
          left: 1
        },
        unit: 'px',
        property: 'border-%key%-width'
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
