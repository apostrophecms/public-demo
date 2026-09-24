// Bylines. An author is its own piece type rather than a user account, so an
// article can credit writers who never log in (a guest post sent by email)
// and can credit several coauthors.
//
// Users who write for the site get an author automatically: see
// `ensureForUser`, called by modules/article/index.js when a user creates or
// saves an article. Admins can also link a user to an existing author through
// the user's `_author` field (modules/@apostrophecms/user/index.js).
//
// Archiving or deleting a user leaves their author alone, so their bylines
// keep working.

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'author',
    label: 'project:author',
    pluralLabel: 'project:authors',
    // A byline is a name, which does not change between locales, so there is
    // one author per person rather than one per locale.
    localized: false,
    // Authors have no pages of their own, so there is nothing to describe to
    // search engines or social sites.
    seoFields: false,
    openGraph: false,
    // When a linked user's display name changes, rename their author to
    // match. Set to `false` when bylines should be allowed to drift, for
    // instance a writer who keeps a former name as their byline.
    syncUserName: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'project:authorName',
        required: true
      }
    }
  },
  handlers(self) {
    return {
      '@apostrophecms/user:beforeUpdate': {
        async rememberUserName(req, user) {
          if (!self.options.syncUserName) {
            return;
          }
          const previous = await self.apos.doc.db.findOne(
            { _id: user._id },
            { projection: { title: 1 } }
          );
          if (previous) {
            // Held on the req, keyed by user, until afterUpdate, so the author
            // is only renamed once the user has actually been saved.
            req.previousUserTitles = {
              ...req.previousUserTitles,
              [user._id]: previous.title
            };
          }
        }
      },
      '@apostrophecms/user:afterUpdate': {
        async syncAuthorName(req, user) {
          if (!(req.previousUserTitles && (user._id in req.previousUserTitles))) {
            return;
          }
          const previousTitle = req.previousUserTitles[user._id];
          delete req.previousUserTitles[user._id];
          const authorId = user.authorIds && user.authorIds[0];
          if (!authorId || (previousTitle === user.title)) {
            return;
          }
          const taskReq = self.apos.task.getReq();
          const author = await self.find(taskReq, { aposDocId: authorId })
            .archived(null)
            .toObject();
          if (author && (author.title !== user.title)) {
            author.title = user.title;
            await self.update(taskReq, author);
          }
        }
      }
    };
  },
  methods(self) {
    return {
      // Returns the author credited for `user` (a user doc or `req.user`),
      // creating one and linking it to the user if they have none, or if
      // theirs has been archived or deleted. Returns `null` if the user does
      // not exist.
      async ensureForUser(user) {
        if (!user || !user._id) {
          return null;
        }
        // Runs on behalf of contributors too, who can neither create authors
        // freely nor edit users, so this uses an admin-level req.
        const taskReq = self.apos.task.getReq();
        const userDoc = await self.apos.user.find(taskReq, { _id: user._id })
          .archived(null)
          .relationships(false)
          .toObject();
        if (!userDoc) {
          return null;
        }
        const authorId = userDoc.authorIds && userDoc.authorIds[0];
        if (authorId) {
          const existing = await self.find(taskReq, { aposDocId: authorId }).toObject();
          if (existing) {
            return existing;
          }
        }
        const author = {
          ...self.newInstance(),
          title: userDoc.title
        };
        await self.insert(taskReq, author);
        userDoc._author = [ author ];
        await self.apos.user.update(taskReq, userDoc);
        return author;
      }
    };
  }
};
