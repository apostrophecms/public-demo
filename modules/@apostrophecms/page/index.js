// This configures the @apostrophecms/pages module to add a "home" page type to the
// pages menu

export default {
  options: {
    park: [
      {
        slug: '/styleguide',
        parkedId: 'styleguide',
        title: 'Styleguide',
        type: 'styleguide-page'
      }
    ],
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: 'article-page',
        label: 'Article Index'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      }
    ]
  }
};
