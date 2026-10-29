// Shared template logic. These are module *methods*, not Nunjucks helpers:
// JSX templates receive the real `apos` object, so they call them directly as
// `apos.helper.linkPath(...)` (the `helper` alias below provides that name).
// Put logic here rather than repeating it inline across templates.

export default {
  options: {
    alias: 'helper'
  },
  methods(self) {
    return {
      // Resolves any field group built from lib/link.js to a URL. Templates
      // should call this instead of reading `_linkPage[0]._url` themselves.
      linkPath(link) {
        if (!link) {
          return;
        }
        let path;
        // `_linkPage` and `_linkFile` are relationships: Apostrophe fills them
        // in at request time and always returns an array, even with `max: 1`.
        if (link.linkType === 'page' && link._linkPage && link._linkPage[0]) {
          path = link._linkPage[0]._url;
        } else if (link.linkType === 'file' && link._linkFile && link._linkFile[0]) {
          path = link._linkFile[0]._url;
        } else if (link.linkType === 'custom') {
          path = link.linkUrl;
        }
        return path;
      },
      // Intl rather than a fixed English format, so /fr and /de get localized
      // month names. `dateStyle: 'long'` matches the old "October 28, 2026" in en.
      formatDate(date, locale = 'en') {
        return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(date));
      }
    };
  }
};
