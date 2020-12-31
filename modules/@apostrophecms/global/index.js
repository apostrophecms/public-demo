module.exports = {
  fields: {
    add: {
      _footerLinks: {
        label: 'Footer Links',
        type: 'relationship',
        withType: '@apostrophecms/page'
      },
      backgroundColor: {
        label: 'Background color of the website',
        type: 'color',
        selector: 'body',
        property: 'background-color',
        // A3 bug: vue-color crashes without an initial value
        def: 'white'
      },
      padding: {
        label: 'Padding of the website',
        type: 'integer',
        help: 'We do not have range schema fields yet',
        min: 0,
        max: 64,
        selector: 'body',
        property: 'padding',
        unit: 'px',
        def: 0
      }
    },
    group: {
      footer: {
        label: 'Footer',
        fields: [ '_footerLinks' ]
      },
      page: {
        label: 'Page',
        fields: [ 'backgroundColor', 'padding' ]
      }
    }
  }
};
