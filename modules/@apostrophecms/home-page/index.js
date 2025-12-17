import { fullConfigExpandedGroups } from '../../../lib/area.js';
export default {
  options: {
    label: 'project:homePage',
    pluralLabel: 'project:homePages'
  },
  fields: {
    add: {
      main: {
        label: 'project:main',
        type: 'area',
        options: {
          expanded: true,
          groups: fullConfigExpandedGroups
        }
      }
    },
    group: {
      basics: {
        label: 'project:basics',
        fields: [
          'title',
          'main'
        ]
      }
    }
  },
  init(self) {
    self.apos.migration.add('simpleHomePage', async () => {
      await self.apos.migration.eachDoc({
        type: '@apostrophecms/home-page'
      }, 5, async (doc) => {
        const rt = doc.cta.items[0];
        if (rt) {
          rt.content = rt.content.replace(/<p>/g, '<h1>');
          rt.content = rt.content.replace(/<\/p>/g, '</h1>');
        }
        doc.main.items = [...doc.cta.items, ...doc.ctaLinks.items, ...doc.main.items];
        delete doc.cta;
        delete doc.ctaLinks;
        self.apos.doc.db.replaceOne({ _id: doc._id }, doc);
      });
    });
  }
};
