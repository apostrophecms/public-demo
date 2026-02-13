const fontChoices = [
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
];
export default {
  fields: {
    fontDefault: {
      type: 'select',
      label: 'project:defaultFont',
      help: 'project:defaultFontHelp',
      choices: fontChoices,
      def: '"Roboto", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      property: '--default-font',
      selector: ':root'
    },
    fontHeading: {
      type: 'select',
      label: 'project:headingFont',
      help: 'project:headingFontHelp',
      choices: fontChoices,
      def: '"Quicksand", sans-serif;',
      property: '--heading-font',
      selector: ':root'
    },
    fontNav: {
      type: 'select',
      label: 'project:navigationFont',
      help: 'project:navigationFontHelp',
      choices: fontChoices,
      def: '"Poppins", sans-serif;',
      property: '--nav-font',
      selector: ':root'
    },
    fontSizeDefault: {
      type: 'range',
      label: 'project:defaultBodySize',
      def: 1,
      min: 0.7,
      max: 5,
      step: 0.1,
      unit: 'rem',
      selector: ':root',
      property: '--text-size-default'
    },
    fontSizeLarger: {
      type: 'range',
      label: 'project:largerBodySize',
      def: 1.3,
      min: 0.7,
      max: 5,
      step: 0.1,
      unit: 'rem',
      selector: ':root',
      property: '--text-size-larger'
    },
    fontSizeHeading3: {
      type: 'range',
      label: 'project:heading3Size',
      def: 2.8,
      min: 0.7,
      max: 5,
      step: 0.1,
      unit: 'rem',
      selector: ':root',
      property: '--text-size-heading-3'
    },
    fontSizeHeading4: {
      type: 'range',
      label: 'project:heading4Size',
      def: 1.8,
      min: 0.7,
      max: 5,
      step: 0.1,
      unit: 'rem',
      selector: ':root',
      property: '--text-size-heading-4'
    },
    fontSizeHeading5: {
      type: 'range',
      label: 'project:heading5Size',
      def: 1.3,
      min: 0.7,
      max: 5,
      step: 0.1,
      unit: 'rem',
      selector: ':root',
      property: '--text-size-heading-5'
    }
  },
  group: {
    fonts: {
      label: 'project:textAndType',
      group: {
        fonts: {
          label: 'project:fonts',
          inline: true,
          fields: [
            'fontDefault',
            'fontHeading',
            'fontNav'
          ]
        },
        sizes: {
          label: 'project:fontSizes',
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
