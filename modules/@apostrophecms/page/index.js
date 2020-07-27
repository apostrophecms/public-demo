// This configures the @apostrophecms/pages module to add a "home" page type to the
// pages menu

module.exports = {
  options: {
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
