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

    // TEMPORARY, REMOVE ME
    '@apostrophecms-pro/automatic-translation': {
      options: {
        provider: 'deepl',
        targetsMapping: {
          en: 'en-US'
        }
      }
    },
    '@apostrophecms-pro/automatic-translation-deepl': {},

    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/@apostrophecms/assets/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here to turn them on: `moduleName: {}`
    '@apostrophecms/vite': {},

    // Manages apostrophe's overall asset pipeline
    '@apostrophecms/asset': {
      // When not in production, refresh the page on restart
      // options: {
      //   // refreshOnRestart: true,
      //   hmr: 'apos'
      // }
    },

    // Manage page and piece SEO metadata
    '@apostrophecms/seo': {},

    // A home for our own project-specific javascript and SASS assets
    asset: {},

    // Template helpers
    helper: {},

    // Widgets
    '@apostrophecms/rich-text-widget': {},
    '@apostrophecms/image-widget': {},
    '@apostrophecms/video-widget': {},
    'button-widget': {},
    'github-prs-widget': {},
    'hero-widget': {},
    'card-widget': {},
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
    '@apostrophecms/import-export': {},

    // Tour
    tour: {}
  }
});
