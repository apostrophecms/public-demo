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

    // A home for our own project-specific javascript and SASS assets
    asset: {},
    helper: {},
    'cta-links-widget': {},
    'columns-widget': {},
    'container-widget': {},
    'button-widget': {},
    'github-prs-widget': {},

    // A page type for ordinary pages
    'default-page': {},

    // A piece type for articles
    article: {},
    // Tease an article on any page
    'article-widget': {},
    // Paginated index of articles, and with pages for individual articles
    'article-page': {},
    topic: {}

  }
});
