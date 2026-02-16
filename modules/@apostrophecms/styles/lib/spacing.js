export default {
  fields: {
    widgetsSpacing: {
      type: 'range',
      label: 'project:spacingBetweenWidgets',
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
      label: 'project:spacing',
      fields: [
        'widgetsSpacing'
      ]
    }
  }
};
