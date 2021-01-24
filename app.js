const path = require('path');

require('apostrophe')({
  shortName: 'a3-demo',

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user accounts.

  modules: {

    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/@apostrophecms/assets/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here to turn them on: `moduleName: {}`

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project

    '@apostrophecms/template': {
      options: {
        viewsFolderFallback: path.join(__dirname, 'views')
      }
    },

    // Custom CSS classes for standard apostrophe widgets
    '@apostrophecms/rich-text-widget': {
      options: {
        className: 'demo-rte'
      }
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 'demo-image'
      }
    },
    '@apostrophecms/video-widget': {
      options: {
        className: 'demo-video'
      }
    },
    // Manages apostrophe's overall asset pipeline
    '@apostrophecms/asset': {
      // When not in production, refresh the page on restart
      options: {
        refreshOnRestart: true
      }
    },

    // For a good experience user-testing our admin UI
    '@apostrophecms/storybook': {
      options: {
        domain: 'ui.apos.dev'
      }
    },

    // A home for our own project-specific javascript and SASS assets
    asset: {},

    // A custom widget with two columns
    'two-column-widget': {},

    // A widget with doubly nested arrays and sub-areas within the array items,
    // for debugging issues relating to such scenarios
    'array-nested-widget': {},

    // A page type for ordinary pages
    'default-page': {},

    // A piece type for articles
    article: {},
    // Tease an article on any page
    'article-widget': {},
    // Paginated index of articles, and with pages for individual articles
    'article-page': {}

  }
});
