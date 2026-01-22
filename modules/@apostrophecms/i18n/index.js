export default {
  options: {
    locales: {
      en: {
        label: 'English',
        flag: 'US'
      },
      fr: {
        label: 'French',
        prefix: '/fr'
      },
      de: {
        label: 'German',
        prefix: '/de'
      }
    },
    adminLocales: [
      {
        label: 'French',
        value: 'fr'
      },
      {
        label: 'English',
        value: 'en'
      },
      {
        label: 'German',
        value: 'de'
      }
    ]
  },
  i18n: {
    project: {
      browser: true
    }
  },
  extendHandlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        async addLocalizations(_super, req) {
          await _super(req);
          req.data.localizations?.forEach(locale => {
            locale.flag = self.locales[locale.locale].flag || locale.locale.toUpperCase();
          });
        }
      }
    };
  }
};
