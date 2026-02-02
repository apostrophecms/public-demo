import apostrophe from 'apostrophe';

apostrophe({
  root: import.meta,
  shortName: 'public-demo',

  // The baseUrl should be overridden in environment variables for other environments.
  baseUrl: 'http://localhost:3000',

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user accounts.

  modules: {

    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/@apostrophecms/assets/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here to turn them on: `moduleName: {}`
    '@apostrophecms/vite': {},

    // Manages apostrophe's overall asset pipeline
    '@apostrophecms/asset': {
      options: {
        refreshOnRestart: true
      }
    },

    // Manage page and piece SEO metadata
    '@apostrophecms/seo': {},

    // A home for our own project-specific javascript and SASS assets
    asset: {},

    // Template helpers
    helper: {},

    // Manage site's favicon via the Global Settings menu
    '@apostrophecms/favicon': {},

    // Manage page and piece open graph data
    '@apostrophecms/open-graph': {},

    // Widgets
    '@apostrophecms/rich-text-widget': {},
    '@apostrophecms/image-widget': {},
    '@apostrophecms/video-widget': {},
    'button-widget': {},
    'github-prs-widget': {},
    'hero-widget': {},
    'card-widget': {},
    'dummy-widget': {},
    'card-title-rt-widget': {
      extend: '@apostrophecms/rich-text-widget',
      options: {
        defaultData: { content: '<h3 class="card__title">My Card Title</h3>' },
      }
    },
    'card-content-rt-widget': {
      extend: '@apostrophecms/rich-text-widget',
      options: {
        defaultData: { content: '<p class="card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' },
      }
    },
    'price-card-widget': {},

    // A page type for ordinary pages
    'default-page': {},

    // A piece type for articles
    article: {},

    // Tease an article on any page
    'article-widget': {},

    // Paginated index of articles, and with pages for individual articles
    'article-page': {},

    // A piece type for categorizing articles
    'article-category': {},

    // Import and export content
    '@apostrophecms/import-export': {}
  }
});
