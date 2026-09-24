export default {
  fields: {
    add: {
      // The byline this user writes under. Filled in automatically the first
      // time they create or save an article; an admin can point it at an
      // existing author instead. See modules/author/index.js.
      _author: {
        label: 'project:userAuthor',
        help: 'project:userAuthorHelp',
        type: 'relationship',
        withType: 'author',
        max: 1
      }
    },
    group: {
      basics: {
        label: 'apostrophe:basics',
        fields: [
          'title',
          'adminLocale',
          '_author'
        ]
      }
    }
  }
};
