export default {
  fields: {
    buttonFontSize: {
      type: 'range',
      label: 'project:fontSize',
      def: 18,
      min: 12,
      max: 24,
      unit: 'px',
      selector: '.button',
      property: 'font-size'
    },
    lightButtonPrimaryRadius: {
      label: 'project:borderRadius',
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
      label: 'project:color',
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
      label: 'project:labelColor',
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
      label: 'project:labelWeight',
      choices: [
        {
          label: 'project:normal',
          value: '400'
        },
        {
          label: 'project:semibold',
          value: '500'
        },
        {
          label: 'project:bold',
          value: '700'
        }
      ],
      def: '400',
      selector: '.button--primary',
      property: 'font-weight'
    },
    lightButtonPrimaryShadow: {
      preset: 'boxShadow',
      label: 'project:shadow',
      selector: '.button--primary'
    },
    lightButtonOutlineRadius: {
      label: 'project:borderRadius',
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
      label: 'project:color',
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
      label: 'project:labelColor',
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
      label: 'project:labelWeight',
      choices: [
        {
          label: 'project:normal',
          value: '400'
        },
        {
          label: 'project:semibold',
          value: '500'
        },
        {
          label: 'project:bold',
          value: '700'
        }
      ],
      def: '400',
      selector: '.button--outline',
      property: 'font-weight'
    },
    lightButtonOutlineShadow: {
      preset: 'boxShadow',
      label: 'project:shadow',
      selector: '.button--outline'
    },
    darkButtonPrimaryRadius: {
      label: 'project:borderRadius',
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
      label: 'project:color',
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
      label: 'project:labelColor',
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
      label: 'project:labelWeight',
      choices: [
        {
          label: 'project:normal',
          value: '400'
        },
        {
          label: 'project:semibold',
          value: '500'
        },
        {
          label: 'project:bold',
          value: '700'
        }
      ],
      def: '400',
      selector: '.button--primary',
      property: 'font-weight'
    },
    darkButtonPrimaryShadow: {
      preset: 'boxShadow',
      label: 'project:shadow',
      selector: '.dark .button--primary'
    },
    darkButtonOutlineRadius: {
      label: 'project:borderRadius',
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
      label: 'project:color',
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
      label: 'project:labelColor',
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
      label: 'project:labelWeight',
      choices: [
        {
          label: 'project:normal',
          value: '400'
        },
        {
          label: 'project:semibold',
          value: '500'
        },
        {
          label: 'project:bold',
          value: '700'
        }
      ],
      def: '400',
      selector: '.dark .button--outline',
      property: 'font-weight'
    },
    darkButtonOutlineShadow: {
      preset: 'boxShadow',
      label: 'project:shadow',
      selector: '.dark .button--outline'
    }
  },
  group: {
    buttons: {
      label: 'project:buttons',
      group: {
        lightMode: {
          label: 'project:lightMode',
          group: {
            primary: {
              label: 'project:primaryButtons',
              fields: [
                'lightButtonPrimaryWeight',
                'lightButtonPrimaryColor',
                'lightButtonPrimaryLabelColor',
                'lightButtonPrimaryRadius',
                'lightButtonPrimaryShadow'
              ]
            },
            outline: {
              label: 'project:outlineButtons',
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
          label: 'project:darkMode',
          group: {
            primary: {
              label: 'project:primaryButtons',
              fields: [
                'darkButtonPrimaryWeight',
                'darkButtonPrimaryColor',
                'darkButtonPrimaryLabelColor',
                'darkButtonPrimaryRadius',
                'darkButtonPrimaryShadow'
              ]
            },
            outline: {
              label: 'project:outlineButtons',
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
