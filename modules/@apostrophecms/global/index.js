module.exports = {
  fields: {
    add: {
      analyticsCode: {
        type: 'string',
        required: true,
        help: 'Enter some nonsense. This isn\'t real.'
      },
      _footerLinks: {
        label: 'Footer Links',
        type: 'relationship',
        withType: '@apostrophecms/page'
      }
    }
  }
};
