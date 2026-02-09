import colorFields from './lib/color.js';
import fontFields from './lib/font.js';
import navFields from './lib/nav.js';
import buttonFields from './lib/button.js';

export default {
  styles: {
    add: {
      ...colorFields,
      ...fontFields,
      ...navFields,
      ...buttonFields
    },
    group: {
      colors: {
        label: 'Colors',
        group: {
          lightMode: {
            // inline: true,
            label: 'Light Mode',
            fields: [
              'defaultColorLight',
              'headingColorLight',
              'faintColorLight',
              'accentColorLight',
              'contrastColorLight',
              'backgroundColorLight',
              'surfaceColorLight'
            ]
          },
          darkMode: {
            // inline: true,
            label: 'Dark Mode',
            fields: [
              'defaultColorDark',
              'headingColorDark',
              'faintColorDark',
              'accentColorDark',
              'contrastColorDark',
              'backgroundColorDark',
              'surfaceColorDark'
            ]
          }
        }
      },
      fonts: {
        label: 'Text and Type',
        group: {
          fonts: {
            label: 'Fonts',
            inline: true,
            fields: [
              'fontDefault',
              'fontHeading',
              'fontNav'
            ]
          },
          sizes: {
            label: 'Font Sizes',
            inline: true,
            fields: [
              'fontSizeDefault',
              'fontSizeLarger',
              'fontSizeLarger',
              'fontSizeHeading3',
              'fontSizeHeading4',
              'fontSizeHeading5'
            ]
          }
        }
      },
      nav: {
        label: 'Navigation',
        fields: [
          'navPadding',
          'navWeight',
          'navRadius',
          'navShadow'
        ]
      },
      buttons: {
        label: 'Buttons',
        group: {
          primary: {
            label: 'Primary Buttons',
            // inline: true,
            fields: [
              'buttonPrimaryWeight',
              'buttonPrimaryColor',
              'buttonPrimaryLabelColor',
              'buttonPrimaryRadius',
              'buttonPrimaryShadow'
            ]
          },
          outline: {
            label: 'Outline Buttons',
            // inline: true,
            fields: [
              'buttonOutlineWeight',
              'buttonOutlineColor',
              'buttonOutlineLabelColor',
              'buttonOutlineRadius',
              'buttonOutlineShadow'
            ]
          }
        }
      }
    }
  }
};
