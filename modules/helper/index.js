import dayjs from 'dayjs';

/**
 * Project-level template helpers.
 *
 * Functions registered here with self.addHelpers() become available in every
 * Nunjucks template as apos.helper.functionName(). In JSX templates, they are
 * accessible via the `helpers` object passed as the second argument.
 *
 * This is the correct place to add any shared server-side logic that templates
 * need. Do not duplicate this logic inline in individual templates.
 */
export default {
  options: {
    alias: 'helper'
  },
  init(self) {
    self.addHelpers({
      linkPath: (link) => {
        if (!link) {
          return;
        }
        let path;
        if (link.linkType === 'page' && link._linkPage && link._linkPage[0]) {
          path = link._linkPage[0]._url;
        } else if (link.linkType === 'file' && link._linkFile && link._linkFile[0]) {
          path = link._linkFile[0]._url;
        } else if (link.linkType === 'custom') {
          path = link.linkUrl;
        }
        return path;
      },
      formatDate: (date) => {
        return dayjs(date).format('MMMM D, YYYY');
      }
    });
  }
};
