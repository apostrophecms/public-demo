const darkColors = [ '#000000', '#232323', '#343434', '#464646', '#575757', '#7a7a7a' ];
const lightColors = [ '#f8f9fa', '#dee2e6', '#adb5bd', '#6c757d', '#495057' ];
const strongAccents = [
  '#5e5bd7',
  '#ec5ac0',
  '#efc799',
  '#ed7165',
  '#ecd9bf',
  '#5dae89',
  '#eb5159',
  '#f3eee9'
];
const surfaceLight = [ '#dd6e42', '#e8dab2', '#4f6d7a', '#c0d6df', '#eaeaea' ];
const surfaceDark = [ '#5a3b72', '#3f2d76', '#081664', '#04447b', '#065c6c' ];
export default {
  fields: {
    defaultColorLight: {
      type: 'color',
      label: 'Text Color',
      help: 'Used for text and labels',
      selector: ':root',
      property: '--default-color',
      def: '#4a4b64',
      options: {
        presetColors: darkColors
      }
    },
    headingColorLight: {
      type: 'color',
      label: 'Heading Color',
      help: 'Used for various headings and large text',
      selector: ':root',
      property: '--heading-color',
      def: '#242859',
      options: {
        presetColors: darkColors
      }
    },
    faintColorLight: {
      type: 'color',
      label: 'Soft Accent',
      help: 'Used to accent cards and borders',
      selector: ':root',
      property: '--faint-color',
      def: '#e8e8e8',
      options: {
        presetColors: darkColors
      }
    },
    accentColorLight: {
      type: 'color',
      label: 'Strong Accent',
      help: 'For button backgrounds and stronger element accents',
      selector: ':root',
      property: '--accent-color',
      def: '#0b1ae9',
      options: {
        presetColors: strongAccents
      }
    },
    contrastColorLight: {
      type: 'color',
      label: 'Contrast Color',
      help: 'Used to contrast the Accent Color',
      selector: ':root',
      property: '--contrast-color',
      def: '#ffffff',
      options: {
        presetColors: lightColors
      }
    },
    backgroundColorLight: {
      type: 'color',
      label: 'Page Background',
      selector: ':root',
      property: '--background-color',
      def: '#ffffff',
      options: {
        presetColors: lightColors
      }
    },
    surfaceColorLight: {
      type: 'color',
      label: 'Surface Background',
      help: 'Background color used on cards, footer elements, and other raised surfaces.',
      selector: ':root',
      property: '--surface-color',
      def: '#efefef',
      options: {
        presetColors: surfaceLight

      }
    },
    defaultColorDark: {
      type: 'color',
      label: 'Text Color',
      help: 'Used for text and labels',
      selector: '.dark',
      property: '--default-color',
      def: '#e8e7f7',
      options: {
        presetColors: lightColors
      }
    },
    headingColorDark: {
      type: 'color',
      label: 'Heading Color',
      help: 'Used for various headings and large text',
      selector: '.dark',
      property: '--heading-color',
      def: '#ffffff',
      options: {
        presetColors: lightColors
      }
    },
    faintColorDark: {
      type: 'color',
      label: 'Soft Accent',
      help: 'Used to accent cards and borders',
      selector: '.dark',
      property: '--faint-color',
      def: '#303034',
      options: {
        presetColors: darkColors
      }
    },
    accentColorDark: {
      type: 'color',
      label: 'Strong Accent',
      help: 'For buttons and stronger element accents',
      selector: '.dark',
      property: '--accent-color',
      def: '#524dd3',
      options: {
        presetColors: strongAccents
      }
    },
    contrastColorDark: {
      type: 'color',
      label: 'Contrast Color',
      help: 'Used to contrast the Accent Color',
      selector: '.dark',
      property: '--contrast-color',
      def: '#ffffff',
      options: {
        presetColors: lightColors
      }
    },
    backgroundColorDark: {
      type: 'color',
      label: 'Page Background',
      selector: '.dark',
      property: '--background-color',
      def: '#05071e',
      options: {
        presetColors: darkColors
      }
    },
    surfaceColorDark: {
      type: 'color',
      label: 'Surface Background',
      help: 'Background color used on cards, footer elements, and other raised surfaces.',
      selector: '.dark',
      property: '--surface-color',
      def: '#131428',
      options: {
        presetColors: surfaceDark
      }
    }
  },
  group: {
    colors: {
      label: 'Colors',
      group: {
        lightMode: {
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
    }
  }
};
