export default {
  fields: {
    lightFooterBackgroundColor: {
      type: 'color',
      label: 'project:backgroundColor',
      selector: ':root',
      property: '--footer-background-color',
      def: '--surface-color',
      options: {
        presetColors: [
          '--surface-color',
          '--accent-color',
          '--default-color',
          '--heading-color',
          '--faint-color'
        ]
      }
    },
    lightFooterColor: {
      type: 'color',
      label: 'project:textColor',
      selector: ':root',
      property: '--footer-color',
      def: '--nav-color',
      options: {
        presetColors: [
          '--nav-color',
          '--surface-color',
          '--accent-color',
          '--default-color',
          '--heading-color',
          '--faint-color'
        ]
      }
    },
    lightFooterFont: {
      type: 'select',
      label: 'project:footerFont',
      selector: '.footer',
      property: 'font-family',
      def: '"Roboto", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      choices: [
        {
          label: 'project:fontRoboto',
          value: '"Roboto", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
        },
        {
          label: 'project:fontQuicksand',
          value: '"Quicksand", sans-serif;'
        },
        {
          label: 'project:fontPoppins',
          value: '"Poppins", sans-serif;'
        },
        {
          label: 'project:fontInter',
          value: '"Inter", sans-serif;'
        },
        {
          label: 'project:fontGeorgia',
          value: '"Georgia", serif;'
        }
      ]
    },
    darkFooterBackgroundColor: {
      type: 'color',
      label: 'project:backgroundColor',
      selector: '.dark',
      property: '--footer-background-color',
      def: '--surface-color',
      options: {
        presetColors: [
          '--surface-color',
          '--accent-color',
          '--default-color',
          '--heading-color',
          '--faint-color'
        ]
      }
    },
    darkFooterColor: {
      type: 'color',
      label: 'project:textColor',
      selector: '.dark',
      property: '--footer-color',
      def: '--nav-color',
      options: {
        presetColors: [
          '--nav-color',
          '--surface-color',
          '--accent-color',
          '--default-color',
          '--heading-color',
          '--faint-color'
        ]
      }
    },
    darkFooterFont: {
      type: 'select',
      label: 'project:footerFont',
      selector: '.dark .footer',
      property: 'font-family',
      def: '"Roboto", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      choices: [
        {
          label: 'project:fontRoboto',
          value: '"Roboto", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
        },
        {
          label: 'project:fontQuicksand',
          value: '"Quicksand", sans-serif;'
        },
        {
          label: 'project:fontPoppins',
          value: '"Poppins", sans-serif;'
        },
        {
          label: 'project:fontInter',
          value: '"Inter", sans-serif;'
        },
        {
          label: 'project:fontGeorgia',
          value: '"Georgia", serif;'
        }
      ]
    }
  },
  group: {
    footer: {
      label: 'project:footer',
      group: {
        lightMode: {
          label: 'project:lightMode',
          fields: [
            'lightFooterBackgroundColor',
            'lightFooterFont',
            'lightFooterColor'
          ]
        },
        darkMode: {
          label: 'project:darkMode',
          fields: [
            'darkFooterBackgroundColor',
            'darkFooterFont',
            'darkFooterColor'
          ]
        }
      }
    }
  }
};
