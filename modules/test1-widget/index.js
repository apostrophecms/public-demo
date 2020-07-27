module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Test 1',
  },
  fields: {
    add: {
      about: {
        label: 'About',
        type: 'string',
        required: true
      }
    }
  }
};
