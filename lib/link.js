// The canonical link field set. Spread it into a schema with
// `...linkConfig.link` rather than copying the fields: apos.helper.linkPath()
// in modules/helper/index.js reads these exact field names, so renaming one
// here breaks every link on the site.

const link = {
  linkText: {
    label: 'project:linkText',
    type: 'string'
  },
  linkType: {
    label: 'project:linkType',
    type: 'select',
    choices: [
      {
        label: 'project:page',
        value: 'page'
      },
      {
        label: 'project:file',
        value: 'file'
      },
      {
        label: 'project:customUrl',
        value: 'custom'
      }
    ]
  },
  // The `_` prefix marks a relationship. It is not stored on the document;
  // Apostrophe loads it at request time and returns an array even though
  // `max: 1`. The builder limits the loaded page to the two properties
  // linkPath() needs.
  _linkPage: {
    label: 'project:pageToLink',
    type: 'relationship',
    withType: '@apostrophecms/page',
    max: 1,
    builders: {
      project: {
        title: 1,
        _url: 1
      }
    },
    // Only shown in the editor while `linkType` is 'page'. The same pattern
    // controls `_linkFile` and `linkUrl` below.
    if: {
      linkType: 'page'
    }
  },
  _linkFile: {
    label: 'project:fileToLink',
    type: 'relationship',
    withType: '@apostrophecms/file',
    max: 1,
    if: {
      linkType: 'file'
    }
  },
  linkUrl: {
    label: 'project:urlForCustom',
    type: 'url',
    if: {
      linkType: 'custom'
    }
  },
  linkTarget: {
    label: 'project:openNewBrowserTab',
    type: 'checkboxes',
    choices: [
      {
        label: 'project:openNewTab',
        value: '_blank'
      }
    ]
  }
};

export default { link };
