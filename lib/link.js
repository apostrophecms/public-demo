const link = {
  linkText: {
    label: 'Link Text',
    type: 'string'
  },
  linkType: {
    label: 'Link Type',
    type: 'select',
    choices: [
      {
        label: 'Page',
        value: 'page'
      },
      {
        label: 'File',
        value: 'file'
      },
      {
        label: 'Custom URL',
        value: 'custom'
      }
    ]
  },
  _linkPage: {
    label: 'Page to link',
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
    label: 'File to link',
    type: 'relationship',
    withType: '@apostrophecms/file',
    max: 1,
    if: {
      linkType: 'file'
    }
  },
  linkUrl: {
    label: 'URL for custom link',
    type: 'url',
    if: {
      linkType: 'custom'
    }
  },
  linkTarget: {
    label: 'Will the link open a new browser tab?',
    type: 'checkboxes',
    choices: [
      {
        label: 'Open in new tab',
        value: '_blank'
      }
    ]
  }
};

module.exports = { link };
