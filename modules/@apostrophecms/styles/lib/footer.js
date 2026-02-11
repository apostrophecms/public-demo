export default {
  fields: {
    lightFooterBackgroundColor: {
      type: 'color',
      label: 'Background Color',
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
      label: 'Text Color',
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
      label: 'Footer Font',
      selector: '.footer',
      property: 'font-family',
      def: '"Roboto", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      choices: [
        {
          label: 'Roboto',
          value: '"Roboto", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
        },
        {
          label: 'Quicksand',
          value: '"Quicksand", sans-serif;'
        },
        {
          label: 'Poppins',
          value: '"Poppins", sans-serif;'
        },
        {
          label: 'Inter',
          value: '"Inter", sans-serif;'
        },
        {
          label: 'Georgia',
          value: '"Georgia", serif;'
        }
      ]
    },
    darkFooterBackgroundColor: {
      type: 'color',
      label: 'Background Color',
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
      label: 'Text Color',
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
      label: 'Footer Font',
      selector: '.dark .footer',
      property: 'font-family',
      def: '"Roboto", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      choices: [
        {
          label: 'Roboto',
          value: '"Roboto", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
        },
        {
          label: 'Quicksand',
          value: '"Quicksand", sans-serif;'
        },
        {
          label: 'Poppins',
          value: '"Poppins", sans-serif;'
        },
        {
          label: 'Inter',
          value: '"Inter", sans-serif;'
        },
        {
          label: 'Georgia',
          value: '"Georgia", serif;'
        }
      ]
    }
  },
  group: {
    footer: {
      label: 'Footer',
      group: {
        lightMode: {
          label: 'Light Mode',
          fields: [
            'lightFooterBackgroundColor',
            'lightFooterFont',
            'lightFooterColor'
          ]
        },
        darkMode: {
          label: 'Dark Mode',
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
