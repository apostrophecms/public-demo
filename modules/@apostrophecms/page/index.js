// The page types editors can choose when creating a page. A page type module
// registered in app.js does not appear in the page manager until it is
// listed here.

export default {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'project:defaultPage'
      },
      {
        name: 'article-page',
        label: 'project:articleIndexPage'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'project:home'
      }
    ]
  }
};
