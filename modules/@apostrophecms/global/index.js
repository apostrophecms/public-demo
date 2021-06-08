module.exports = {
  fields: {
    add: {
      _footerLinks: {
        label: 'Footer Links',
        type: 'relationship',
        withType: '@apostrophecms/page'
      }
    },
    group: {
      footer: {
        label: 'Footer',
        fields: [ '_footerLinks' ]
      }
    }
  },
  middleware(self) {
    return {
      checkProtocol(req, res, next) {
        console.log(req.protocol);
        return next();
      }
    };
  }
};
