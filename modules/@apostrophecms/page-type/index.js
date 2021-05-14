module.exports = {
  init(self) {
    // convert old two-columns to columns
    self.apos.migration.add('columns', async () => {
      await self.apos.migration.eachDoc({
        type: { $in: ['@apostrophecms/home-page', 'default-page']}
      }, 5, async (doc) => {
        if (doc.main && doc.main.items && doc.main.items.length) {
          const items = doc.main.items.map(i => {
            if (i.type && i.type === 'two-column') {
              return {
                ...i,
                cols: '50-50',
                type: 'columns'
              }
            } else {
              return i;
            }
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