module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    name: 'product'
  },
  fields: {
    price: {
      type: 'float'
    }
  },
  components(self, options) {
    return {
      async list(req, data) {
        return {
          products: await self.find(req).limit(data.limit).toArray()
        };
      }
    };
  }
};
