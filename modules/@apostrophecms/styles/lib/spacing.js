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
    },
    layoutWidgetGap: {
      type: 'range',
      label: 'project:layoutWidgetGap',
      def: 1.5,
      min: 0,
      max: 5,
      step: 0.1,
      unit: 'rem',
      selector: ':root',
      property: '--apos-layout-widget-gap'
    }
  },
  group: {
    widgets: {
      label: 'project:spacing',
      fields: [
        'widgetsSpacing',
        'layoutWidgetGap'
      ]
    }
  }
};
