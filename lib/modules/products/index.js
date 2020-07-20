module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    name: 'product'
  },
  fields: {
    add: {
      price: {
        type: 'string'
      }
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
