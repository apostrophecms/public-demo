export default {
  options: {
    subforms: {
      title: {
        fields: [ 'title' ],
        protection: true,
        reload: true
      },
      adminLocale: {
        fields: [ 'adminLocale' ]
      },
      changePassword: {
        fields: [ 'password' ]
      }
    },

    groups: {
      account: {
        label: 'project:account',
        subforms: [ 'title', 'changePassword' ]
      },
      preferences: {
        label: 'project:preferences',
        subforms: [ 'adminLocale' ]
      }
    }
  }
};
