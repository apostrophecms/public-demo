// This configures the @apostrophecms/pages module to add a "home" page type to the
// pages menu

module.exports = {
  options: {
    park: [
      {
        type: '@apostrophecms/home-page',
        title: 'Second',
        slug: '/second',
        published: true,
        parkedId: 'second'
      },
      {
        type: '@apostrophecms/home-page',
        findMeAgain: true,
        title: 'Third',
        slug: '/third',
        published: true,
        parkedId: 'third'
      },
      {
        type: '@apostrophecms/home-page',
        findMeAgain: true,
        title: 'Fourth',
        slug: '/third/fourth',
        published: true,
        parkedId: 'fourth'
      }
    ],
    types: [
      {
        name: 'home',
        label: 'Home'
      }
      // Add more page types here, but make sure you create a corresponding
      // template in lib/modules/@apostrophecms/page/views/pages!
    ]
  }
};
