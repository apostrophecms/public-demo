import linkConfig from '../../../lib/link.js';
export default {
  options: {
    themes: {
      one: {
        name: 'one',
        fonts: {
          meta: '"Consolas", "Monaco", monospace',
          headline: '"Optima", "Segoe", "Segoe UI", "Candara", "Calibri", "Arial", sans-serif',
          body: 'tahoma, geneva, verdana, kalimati, sans-serif'
        },
        colors: {
          one: '#FFFFFF',
          two: '#F5F5F5',
          three: '#D9D9D9',
          four: '#797979',
          five: '#000000'
        },
        radius: '5px'
      },
      two: {
        name: 'two',
        fonts: {
          meta: '"Dejavu Sans", "Arial", "Verdana", sans-serif',
          headline: '"Rockwell", "Courier Bold", "Courier", "Georgia", "Times"',
          body: '"Georgia", "Times", "Times New Roman", serif'
        },
        colors: {
          one: '#FFFFFF',
          two: '#E1DFD9',
          three: '#209D50',
          four: '#1D231C',
          five: '#000000'
        },
        radius: '2px'
      },
      three: {
        name: 'three',
        fonts: {
          meta: '"courier new", courier, andale mono, "free mono", monospace',
          headline: '"Gill Sans", "Gill Sans MT", "Calibri", sans-serif',
          body: '"Lucida Sans", "Helvetica", "Arial", sans-serif'
        },
        colors: {
          one: '#FCF0F0',
          two: '#D1C8F4',
          three: '#AE9DEF',
          four: '#9B2929',
          five: '#531A4A'
        },
        radius: '10px'
      },
      four: {
        name: 'four',
        fonts: {
          meta: '"Gill Sans", "Gill Sans MT", "Calibri", sans-serif',
          headline: '"Didot", "Didot LT STD", "Hoefler Text", "Garamond", "Calisto MT", "Times New Roman", serif',
          body: '"Goudy Old Style", "Garamond", "Big Caslon", "Times New Roman", serif'
        },
        colors: {
          one: '#EAE6DD',
          two: '#EED286',
          three: '#7CB4B2',
          four: '#34659B',
          five: '#2D2D2A'
        },
        radius: '30px'
      }
    }
  },
  fields: {
    add: {
      theme: {
        label: 'Theme',
        type: 'theme',
        def: 'two',
        choices: [
          {
            label: 'One',
            value: 'one'
          },
          {
            label: 'Twp',
            value: 'two'
          },
          {
            label: 'Three',
            value: 'three'
          },
          {
            label: 'Four',
            value: 'four'
          }
        ]
      },
      footerLinks: {
        label: 'Footer Links',
        type: 'array',
        titleField: 'linkText',
        fields: {
          add: {
            ...linkConfig.link
          }
        }
      },
      siteTitle: {
        label: 'Site Title',
        type: 'string',
        def: 'Awesome Site'
      }
    },
    group: {
      theme: {
        label: 'Theme',
        fields: [ 'theme' ]
      },
      general: {
        label: 'General',
        fields: [ 'siteTitle', 'footerLinks' ]
      }
    }
  },
  handlers(self, options) {
    return {
      beforeSave: {
        async reflectTheme(req, doc, options) {
          const oldVal = req.data.global.theme;
          const newVal = doc.theme;

          if (oldVal !== newVal) {

            const themeConfig = self.options.themes[newVal];
            const palette = self.apos.modules['@apostrophecms-pro/palette'];
            const docs = await palette.find(req, {}).toArray();
            const doc = docs[0];

            doc.fontMeta = themeConfig.fonts.meta;
            doc.fontBody = themeConfig.fonts.body;
            doc.fontHeadline = themeConfig.fonts.headline;
            doc.colorOne = themeConfig.colors.one;
            doc.colorTwo = themeConfig.colors.two;
            doc.colorThree = themeConfig.colors.three;
            doc.colorFour = themeConfig.colors.four;
            doc.colorFive = themeConfig.colors.five;
            doc.radius = parseInt(themeConfig.radius.split('px')[0]);

            await palette.update(req, doc);
            await self.apos.notify(req, 'Theme updated. Some palette values have been overwritten', {
              type: 'success',
              dismiss: true,
              icon: 'close-circle-icon'
            });
          };

        }
      }
    };
  }
};
