export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Article Index Page',
    pluralLabel: 'Article Index Pages'
  },
  fields: {
    add: {
      intro: {
        type: 'area',
        options: {
          limit: 1,
          widgets: {
            '@apostrophecms/rich-text': {}
          }
        }
      }
    }
  },
  methods(self) {
    return {
      async beforeIndex(req) {
        req.data._categories = await self.apos.category.find(req).sort({ createdAt: -1 }).toArray();
      }
    };
  }
  // Infers from its name that it will display an index of articles,
  // as well as serving subpages for them
};
