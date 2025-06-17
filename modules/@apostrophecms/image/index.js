export default {
  fields: {
    add: {
      alt: {
        type: 'string',
        label: 'apostrophe:altText',
        help: 'apostrophe:altTextHelp',
        if: {
          fun: 'two'
        }
      },
      altTwo: {
        type: 'string',
        label: 'apostrophe:altText',
        help: 'apostrophe:altTextHelp',
        if: {
          fun: 'two'
        }
      },
      fun: {
        type: 'select',
        label: 'fun one',
        selector: ':root',
        property: '--button-font',
        choices: [
          {
            label: 'One',
            value: 'one'
          },
          {
            label: 'Two',
            value: 'two'
          }
        ]
      },
    }
  }
};
