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
  // Relationship fields: Apostrophe populates these at request time and returns
  // them as arrays, even when max: 1. Always use [0] to get the first result.
  // The if: property hides this field in the editor unless linkType matches.
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
    if: {
      linkType: 'page' // only shown when the editor selects "Page" as link type
    }
  },
  _linkFile: {
    label: 'project:fileToLink',
    type: 'relationship',
    withType: '@apostrophecms/file',
    max: 1,
    if: {
      linkType: 'file' // only shown when the editor selects "File" as link type
    }
  },
  linkUrl: {
    label: 'project:urlForCustom',
    type: 'url',
    if: {
      linkType: 'custom' // only shown when the editor selects "Custom URL"
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
