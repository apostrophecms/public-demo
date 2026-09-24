import { fullConfig } from '../../lib/area.js';

export default {
  extend: '@apostrophecms/blog',
  options: {
    label: 'project:article',
    pluralLabel: 'project:articles'
  },
  fields: {
    add: {
      blurb: {
        type: 'area',
        label: 'project:articleBlurb',
        help: 'project:articleBlurbHelp',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'bold', 'italic' ]
            }
          }
        }
      },
      _categories: {
        label: 'project:articleCategories',
        type: 'relationship',
        withType: 'article-category'
      },
      // Bylines, not user accounts: see modules/author/index.js.
      _authors: {
        label: 'project:articleAuthors',
        type: 'relationship',
        withType: 'author'
      },
      _image: {
        label: 'project:articleFeaturedImage',
        type: 'relationship',
        withType: '@apostrophecms/image',
        aspectRatio: [ 2, 1 ]
      },
      main: {
        label: 'project:content',
        type: 'area',
        options: {
          widgets: fullConfig
        }
      }
    },
    group: {
      basics: {
        label: 'project:basics',
        fields: [
          'title',
          'blurb',
          'publishedAt'
        ]
      },
      main: {
        label: 'project:content',
        fields: [
          '_image',
          'main'
        ]
      },
      utility: {
        fields: [
          'slug',
          'visibility',
          '_authors',
          '_categories'
        ]
      }
    }
  },
  columns: {
    add: {
      _categories: {
        label: 'project:articleCategoriesColumn',
        component: 'DemoCellRelation'
      },
      _authors: {
        label: 'project:articleAuthorsColumn',
        component: 'DemoCellRelation'
      },
      _image: {
        label: 'project:articleFeaturedImageColumn',
        component: 'DemoCellImage'
      }
    }
  },
  components(self) {
    return {
      async recent(req, data) {
        return {
          // No explicit sort: @apostrophecms/blog already orders by publishedAt.
          articles: await self.find(req).limit(data.limit).toArray(),
          display: data.display,
          // Component templates don't receive the page's `data.locale`.
          locale: req.locale
        };
      }
    };
  },
  init(self) {
    self.apos.migration.add('article-authors-from-users', self.migrateAuthorsFromUsers);
  },
  extendRestApiRoutes(self) {
    return {
      // The editor fetches a new article's defaults with `_newInstance`.
      // Credit the current user's author by default, creating it if needed.
      async post(_super, req) {
        if (req.body._newInstance && !req.body._authors) {
          const author = await self.apos.author.ensureForUser(req.user);
          if (author) {
            req.body._authors = [ author ];
          }
        }
        return _super(req);
      }
    };
  },
  handlers(self) {
    return {
      beforeSave: {
        // Anyone who edits an article gets an author, even if they are not
        // credited on this one, so they are ready to be picked as a byline.
        async ensureEditorHasAuthor(req) {
          await self.apos.author.ensureForUser(req.user);
        }
      }
    };
  },
  methods(self) {
    return {
      // Articles used to credit users directly through `_author`. Give each
      // of those users an author and credit that instead.
      async migrateAuthorsFromUsers() {
        const req = self.apos.task.getReq();
        const authorIdsByUserId = new Map();
        // One at a time, so two articles by the same user can't each create
        // an author for them.
        await self.apos.migration.eachDoc({
          type: self.name,
          authorIds: { $exists: true }
        }, 1, async (doc) => {
          const authorsIds = [];
          for (const userId of doc.authorIds || []) {
            if (!authorIdsByUserId.has(userId)) {
              const author = await self.apos.author.ensureForUser({ _id: userId });
              authorIdsByUserId.set(userId, author && author.aposDocId);
            }
            const authorId = authorIdsByUserId.get(userId);
            if (authorId) {
              authorsIds.push(authorId);
            }
          }
          await self.apos.doc.db.updateOne({ _id: doc._id }, {
            $set: { authorsIds: [ ...new Set([ ...(doc.authorsIds || []), ...authorsIds ]) ] },
            $unset: { authorIds: 1 }
          });
        });
      }
    };
  },
  filters: {
    // The best experience comes with just the month filter
    remove: [ 'day', 'year' ]
  }
};
