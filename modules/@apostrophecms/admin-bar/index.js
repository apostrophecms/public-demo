module.exports = {
  options: {
    groups: [
      {
        name: 'media',
        label: 'Media',
        items: [
          '@apostrophecms/image',
          '@apostrophecms/file',
          '@apostrophecms/image-tag',
          '@apostrophecms/file-tag'
        ]
      },
      {
        name: 'pieces',
        label: 'Content',
        items: [
          'article'
        ]
      }
    ]
  }
};
