const fontChoices = [
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
];
export default {
  fields: {
    fontDefault: {
      type: 'select',
      label: 'Default Font',
      help: 'Used for most text and labels',
      choices: fontChoices,
      def: '"Roboto", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      property: '--default-font',
      selector: ':root'
    },
    fontHeading: {
      type: 'select',
      label: 'Heading Font',
      help: 'Used for headings and large type',
      choices: fontChoices,
      def: '"Quicksand", sans-serif;',
      property: '--heading-font',
      selector: ':root'
    },
    fontNav: {
      type: 'select',
      label: 'Navigation Font',
      help: 'Used for the navigation',
      choices: fontChoices,
      def: '"Poppins", sans-serif;',
      property: '--nav-font',
      selector: ':root'
    },
    fontSizeDefault: {
      type: 'range',
      label: 'Default Body Size',
      def: 1,
      min: 0.7,
      max: 1.5,
      step: 0.1,
      unit: 'rem',
      selector: ':root',
      property: '--text-size-default'
    },
    fontSizeLarger: {
      type: 'range',
      label: 'Larger Body Size',
      def: 1.3,
      min: 1,
      max: 1.5,
      step: 0.1,
      unit: 'rem',
      selector: ':root',
      property: '--text-size-larger'
    },
    fontSizeHeading3: {
      type: 'range',
      label: 'Heading 3 Size',
      def: 2.8,
      min: 2,
      max: 3.2,
      step: 0.1,
      unit: 'rem',
      selector: ':root',
      property: '--text-size-heading-3'
    },
    fontSizeHeading4: {
      type: 'range',
      label: 'Heading 4 Size',
      def: 1.8,
      min: 1.5,
      max: 2.5,
      step: 0.1,
      unit: 'rem',
      selector: ':root',
      property: '--text-size-heading-4'
    },
    fontSizeHeading5: {
      type: 'range',
      label: 'Heading 5 Size',
      def: 1.3,
      min: 1,
      max: 1.6,
      step: 0.1,
      unit: 'rem',
      selector: ':root',
      property: '--text-size-heading-5'
    }
  },
  group: {
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
            'fontSizeHeading3',
            'fontSizeHeading4',
            'fontSizeHeading5'
          ]
        }
      }
    }
  }
};
