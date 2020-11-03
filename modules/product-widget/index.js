module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    name: 'product',
    label: 'Products'
  },
  fields: {
    add: {
      _products: {
        type: 'relationship',
        label: 'Products',
        required: true
      }
    }
  }
};
