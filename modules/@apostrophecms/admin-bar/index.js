export default {
  options: {
    groups: [
      {
        name: 'media',
        label: 'project:media',
        items: [
          '@apostrophecms/image',
          '@apostrophecms/file',
          '@apostrophecms/image-tag',
          '@apostrophecms/file-tag'
        ]
      }
    ],
    order: [
      '@apostrophecms/image',
      'article',
      'article-category'
    ]
  }
};
