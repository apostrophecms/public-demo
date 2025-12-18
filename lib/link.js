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
