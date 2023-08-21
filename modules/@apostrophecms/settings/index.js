module.exports = {
  options: {
    subforms: {
      title: {
        fields: [ 'title' ],
        previewComponent: 'SettingsDisplayNamePreview',
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
        label: 'Account',
        subforms: [ 'title', 'changePassword' ]
      },
      preferences: {
        label: 'Preferences',
        subforms: [ 'adminLocale' ]
      }
    }
  }
};
