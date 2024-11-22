export default {
  extend: '@apostrophecms/page-type',
  fields: {
    add: {
      button: {
        type: 'area',
        contextual: true,
        max: 1,
        options: {
          widgets: {
            button: {}
          }
        }
      }
    }
  }
};
