import linkConfig from '../../lib/link.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'project:button',
    icon: 'cursor-default-click-icon',
    previewImage: 'svg',
    description: 'project:buttonDescription'
  },
  fields: {
    add: {
      ...linkConfig.link,
      block: {
        type: 'boolean',
        label: 'project:fullWidth',
        def: false
      }
      // alignment: {
      //   type: 'select',
      //   label: 'project:buttonAlignment',
      //   choices: [
      //     {
      //       label: 'project:left',
      //       value: 'left',
      //       def: true
      //     },
      //     {
      //       label: 'project:center',
      //       value: 'center'
      //     },
      //     {
      //       label: 'project:right',
      //       value: 'right'
      //     }
      //   ]
      // }
    }
  },
  styles: {
    add: {
      fontSize: {
        type: 'range',
        label: 'project:fontSize',
        def: 18,
        min: 12,
        max: 24,
        unit: 'px',
        selector: '.button',
        property: 'font-size'
      },
      radius: {
        label: 'project:borderRadius',
        type: 'range',
        unit: 'px',
        def: 50,
        min: 0,
        max: 50,
        selector: '.button',
        property: 'border-radius'
      },
      color: {
        type: 'color',
        label: 'project:color',
        selector: '.button',
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
      labelColor: {
        type: 'color',
        label: 'project:labelColor',
        selector: '.button',
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
      alignment: {
        type: 'radio',
        selector: '.button-widget',
        property: 'justify-content',
        def: 'flex-start',
        buttons: true,
        choices: [
          {
            label: 'apostrophe:styleLeft',
            value: 'flex-start'
          },
          {
            label: 'apostrophe:styleCenter',
            value: 'center'
          },
          {
            label: 'apostrophe:styleRight',
            value: 'flex-end'
          }
        ]
      }
    }
  }
};
