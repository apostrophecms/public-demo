module.exports = {
  name: 'product',
  extend: 'apostrophe-pieces',
  addFields: [
    {
      type: 'float',
      name: 'price'
    }
  ],
  construct: function(self, options) {
    self.addComponent('list', async function(req, data) {
      return {
        products: await self.find(req).limit(data.limit).toArray()
      };
    });
  }
};
