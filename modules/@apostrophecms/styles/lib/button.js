export default {
  fields: {
    lightButtonPrimaryRadius: {
      label: 'Border Radius',
      type: 'range',
      unit: 'px',
      def: 50,
      min: 0,
      max: 50,
      selector: '.button--primary',
      property: 'border-radius'
    },
    lightButtonPrimaryColor: {
      type: 'color',
      label: 'Color',
      selector: ':root',
      property: '--button-primary-color',
      def: '--accent-color',
      options: {
        presetColors: [
          '--accent-color',
          '--default-color',
          '--heading-color'
        ]
      }
    },
    lightButtonPrimaryLabelColor: {
      type: 'color',
      label: 'Label Color',
      selector: ':root',
      property: '--button-primary-label-color',
      def: '--contrast-color',
      options: {
        presetColors: [
          '--accent-color',
          '--default-color',
          '--heading-color',
          '--contrast-color'
        ]
      }
    },
    lightButtonPrimaryWeight: {
      type: 'select',
      label: 'Label Weight',
      choices: [
        {
          label: 'Normal',
          value: '400'
        },
        {
          label: 'Semibold',
          value: '500'
        },
        {
          label: 'Bold',
          value: '700'
        }
      ],
      def: '400',
      selector: '.button--primary',
      property: 'font-weight'
    },
    lightButtonPrimaryShadow: {
      preset: 'boxShadow',
      label: 'Shadow',
      selector: '.button--primary'
    },
    lightButtonOutlineRadius: {
      label: 'Border Radius',
      type: 'range',
      unit: 'px',
      def: 50,
      min: 0,
      max: 50,
      selector: '.button--outline',
      property: 'border-radius'
    },
    lightButtonOutlineColor: {
      type: 'color',
      label: 'Color',
      selector: ':root',
      property: '--button-outline-color',
      def: '--accent-color',
      options: {
        presetColors: [
          '--accent-color',
          '--default-color',
          '--heading-color'
        ]
      }
    },
    lightButtonOutlineLabelColor: {
      type: 'color',
      label: 'Label Color',
      selector: ':root',
      property: '--button-outline-label-color',
      def: '--accent-color',
      options: {
        presetColors: [
          '--accent-color',
          '--default-color',
          '--heading-color',
          '--contrast-color'
        ]
      }
    },
    lightButtonOutlineWeight: {
      type: 'select',
      label: 'Label Weight',
      choices: [
        {
          label: 'Normal',
          value: '400'
        },
        {
          label: 'Semibold',
          value: '500'
        },
        {
          label: 'Bold',
          value: '700'
        }
      ],
      def: '400',
      selector: '.button--outline',
      property: 'font-weight'
    },
    lightButtonOutlineShadow: {
      preset: 'boxShadow',
      label: 'Shadow',
      selector: '.button--outline'
    },
    //////

    darkButtonPrimaryRadius: {
      label: 'Border Radius',
      type: 'range',
      unit: 'px',
      def: 50,
      min: 0,
      max: 50,
      selector: '.dark .button--primary',
      property: 'border-radius'
    },
    darkButtonPrimaryColor: {
      type: 'color',
      label: 'Color',
      selector: '.dark',
      property: '--button-primary-color',
      def: '--accent-color',
      options: {
        presetColors: [
          '--accent-color',
          '--default-color',
          '--heading-color'
        ]
      }
    },
    darkButtonPrimaryLabelColor: {
      type: 'color',
      label: 'Label Color',
      selector: '.dark',
      property: '--button-primary-label-color',
      def: '--contrast-color',
      options: {
        presetColors: [
          '--accent-color',
          '--default-color',
          '--heading-color',
          '--contrast-color'
        ]
      }
    },
    darkButtonPrimaryWeight: {
      type: 'select',
      label: 'Label Weight',
      choices: [
        {
          label: 'Normal',
          value: '400'
        },
        {
          label: 'Semibold',
          value: '500'
        },
        {
          label: 'Bold',
          value: '700'
        }
      ],
      def: '400',
      selector: '.button--primary',
      property: 'font-weight'
    },
    darkButtonPrimaryShadow: {
      preset: 'boxShadow',
      label: 'Shadow',
      selector: '.dark .button--primary'
    },
    darkButtonOutlineRadius: {
      label: 'Border Radius',
      type: 'range',
      unit: 'px',
      def: 50,
      min: 0,
      max: 50,
      selector: '.dark .button--outline',
      property: 'border-radius'
    },
    darkButtonOutlineColor: {
      type: 'color',
      label: 'Color',
      selector: '.dark',
      property: '--button-outline-color',
      def: '--accent-color',
      options: {
        presetColors: [
          '--accent-color',
          '--default-color',
          '--heading-color'
        ]
      }
    },
    darkButtonOutlineLabelColor: {
      type: 'color',
      label: 'Label Color',
      selector: '.dark',
      property: '--button-outline-label-color',
      def: '--accent-color',
      options: {
        presetColors: [
          '--accent-color',
          '--default-color',
          '--heading-color',
          '--contrast-color'
        ]
      }
    },
    darkButtonOutlineWeight: {
      type: 'select',
      label: 'Label Weight',
      choices: [
        {
          label: 'Normal',
          value: '400'
        },
        {
          label: 'Semibold',
          value: '500'
        },
        {
          label: 'Bold',
          value: '700'
        }
      ],
      def: '400',
      selector: '.dark .button--outline',
      property: 'font-weight'
    },
    darkButtonOutlineShadow: {
      preset: 'boxShadow',
      label: 'Shadow',
      selector: '.dark .button--outline'
    }
  },
  group: {
    buttons: {
      label: 'Buttons',
      group: {
        lightMode: {
          label: 'Light Mode',
          group: {
            primary: {
              label: 'Primary Buttons',
              fields: [
                'lightButtonPrimaryWeight',
                'lightButtonPrimaryColor',
                'lightButtonPrimaryLabelColor',
                'lightButtonPrimaryRadius',
                'lightButtonPrimaryShadow'
              ]
            },
            outline: {
              label: 'Outline Buttons',
              fields: [
                'lightButtonOutlineWeight',
                'lightButtonOutlineColor',
                'lightButtonOutlineLabelColor',
                'lightButtonOutlineRadius',
                'lightButtonOutlineShadow'
              ]
            }
          }
        },
        darkMode: {
          label: 'Dark Mode',
          group: {
            primary: {
              label: 'Primary Buttons',
              fields: [
                'darkButtonPrimaryWeight',
                'darkButtonPrimaryColor',
                'darkButtonPrimaryLabelColor',
                'darkButtonPrimaryRadius',
                'darkButtonPrimaryShadow'
              ]
            },
            outline: {
              label: 'Outline Buttons',
              fields: [
                'darkButtonOutlineWeight',
                'darkButtonOutlineColor',
                'darkButtonOutlineLabelColor',
                'darkButtonOutlineRadius',
                'darkButtonOutlineShadow'
              ]
            }
          }
        }
      }
    }
  }
};
