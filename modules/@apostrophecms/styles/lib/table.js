export default {
  fields: {
    lightTableHeaderBackgroundColor: {
      type: 'color',
      label: 'project:headerBackgroundColor',
      selector: ':root',
      property: '--table-header-background-color',
      def: '--faint-color',
      options: {
        presetColors: [
          '--faint-color',
          '--accent-color',
          '--default-color',
          '--heading-color'
        ]
      }
    },
    lightTableHeaderColor: {
      type: 'color',
      label: 'project:headerColor',
      selector: ':root',
      property: '--table-header-color',
      def: '--faint-color',
      options: {
        presetColors: [
          '--faint-color',
          '--accent-color',
          '--default-color',
          '--heading-color'
        ]
      }
    },
    lightTableBorderColor: {
      type: 'color',
      label: 'project:borderColor',
      selector: ':root',
      property: '--table-border-color',
      def: '--faint-color',
      options: {
        presetColors: [
          '--faint-color',
          '--accent-color',
          '--default-color',
          '--heading-color'
        ]
      }
    },
    darkTableHeaderBackgroundColor: {
      type: 'color',
      label: 'project:headerBackgroundColor',
      selector: '.dark',
      property: '--table-header-background-color',
      def: '--faint-color',
      options: {
        presetColors: [
          '--faint-color',
          '--accent-color',
          '--default-color',
          '--heading-color'
        ]
      }
    },
    darkTableHeaderColor: {
      type: 'color',
      label: 'project:headerColor',
      selector: '.dark',
      property: '--table-header-color',
      def: '--faint-color',
      options: {
        presetColors: [
          '--faint-color',
          '--accent-color',
          '--default-color',
          '--heading-color'
        ]
      }
    },
    darkTableBorderColor: {
      type: 'color',
      label: 'project:borderColor',
      selector: '.dark',
      property: '--table-border-color',
      def: '--faint-color',
      options: {
        presetColors: [
          '--faint-color',
          '--accent-color',
          '--default-color',
          '--heading-color'
        ]
      }
    }
  },
  group: {
    tables: {
      label: 'project:tables',
      group: {
        lightMode: {
          label: 'project:lightMode',
          fields: [
            'lightTableHeaderBackgroundColor',
            'lightTableHeaderColor',
            'lightTableBorderColor'
          ]
        },
        darkMode: {
          label: 'project:darkMode',
          fields: [
            'darkTableHeaderBackgroundColor',
            'darkTableHeaderColor',
            'darkTableBorderColor'
          ]
        }
      }
    }
  }
};
