export default {
  buttonPrimaryRadius: {
    label: 'Border Radius',
    type: 'range',
    unit: 'px',
    def: 50,
    min: 0,
    max: 50,
    selector: '.button--primary',
    property: 'border-radius'
  },
  buttonPrimaryColor: {
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
  buttonPrimaryLabelColor: {
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
  buttonPrimaryWeight: {
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
  buttonPrimaryShadow: {
    preset: 'boxShadow',
    label: 'Shadow',
    selector: '.button--primary'
  },
  buttonOutlineRadius: {
    label: 'Border Radius',
    type: 'range',
    unit: 'px',
    def: 50,
    min: 0,
    max: 50,
    selector: '.button--outline',
    property: 'border-radius'
  },
  buttonOutlineColor: {
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
  buttonOutlineLabelColor: {
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
  buttonOutlineWeight: {
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
  buttonOutlineShadow: {
    preset: 'boxShadow',
    label: 'Shadow',
    selector: '.button--outline'
  }
};
