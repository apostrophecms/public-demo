module.exports = {
  options: {
    alias: 'helper'
  },
  init(self) {
    self.enableBrowserData('public');
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
      }
    });
  },
  methods(self) {
    return {
      getBrowserData(req) {
        return {
          cats: [ 'pypy', 'spyspy' ]
        };
      }
    };
  }
};
