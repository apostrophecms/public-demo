module.exports = {
  init(self) {
    // convert old two-columns to columns
    self.apos.migration.add('columns', async () => {
      await self.apos.migration.eachDoc({}, 5, async (doc) => {
        if (doc.main && doc.main.items && doc.main.items.length) {
          const items = doc.main.items.map(item => {
            if (item.type && item.type === 'two-column') {
              item.cols = '50-50';
              item.type = 'columns';
            }
              return item;
          });
          return self.apos.doc.db.updateOne({
            _id: doc._id
          }, {
            $set: {
              'main.items': items
            }
          });
        }
      });
    });
  }
}