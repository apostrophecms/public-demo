module.exports = {
  extend: '@apostrophecms/widget-type',
  fields: {
    add: {
      _files: {
        type: 'relationship',
        withType: '@apostrophecms/file',
        max: 1,
        required: true
      }
    }
  },
  options: {
    label: 'File'
  }
};
