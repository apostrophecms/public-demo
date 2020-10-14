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
        parkedId: 'secondId'
      },
      {
        type: '@apostrophecms/home-page',
        findMeAgain: true,
        title: 'Third',
        slug: '/third',
        published: true,
        parkedId: 'thirdId'
      },
      {
        type: '@apostrophecms/home-page',
        findMeAgain: true,
        title: 'Fourth',
        slug: '/fourth',
        published: true,
        parkedId: 'fourthId'
      },
      {
        title: 'Recipes',
        type: 'recipe-page',
        slug: '/recipes',
        parkedId: 'recipePage123',
        published: true
      }
    ],
    types: [
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      },
      {
        name: 'custom-page',
        label: 'Custom Type'
      }
      // Add more page types here, but make sure you create a corresponding
      // template in lib/modules/@apostrophecms/page/views/pages!
    ]
  }
};
