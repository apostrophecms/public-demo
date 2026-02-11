export default {
  fields: {
    widgetsSpacing: {
      type: 'range',
      label: 'Spacing between widgets',
      def: 50,
      min: 0,
      max: 100,
      step: 10,
      unit: 'px',
      selector: ':root',
      property: '--widget-spacer'
    }
  },
  group: {
    widgets: {
      label: 'Widgets',
      fields: [
        'widgetsSpacing'
      ]
    }
  }
};
