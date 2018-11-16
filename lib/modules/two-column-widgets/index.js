module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Two Column',
  addFields: [
    {
      name: 'left',
      type: 'area',
      contextual: true,
      options: {
        widgets: {
          'test1': {}
        }
      }
    },
    {
      name: 'right',
      type: 'area',
      contextual: true,
      options: {
        widgets: {
          'test1': {}
        }
      }
    }
  ]
};
