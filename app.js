import 'dotenv/config';
import apostrophe from 'apostrophe';

apostrophe({
  root: import.meta,
  shortName: 'public-demo',
  bundles: [ '@apostrophecms/blog' ],

  // The baseUrl should be overridden in environment variables for other environments.
  baseUrl: 'http://localhost:3000',

  modules: {

    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See modules/@apostrophecms/asset/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here to turn them on: `moduleName: {}`
    '@apostrophecms/vite': {},

    // Manages apostrophe's overall asset pipeline
    '@apostrophecms/asset': {},

    // Manage page and piece SEO metadata
    '@apostrophecms/seo': {},

    // A home for our own project-specific javascript and SASS assets
    asset: {},

    // Shared template logic, called from JSX as apos.helper.linkPath() etc.
    // The short name comes from the `alias` option in modules/helper/index.js.
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
    // Rich text variants that only change the starting content for the card
    // widget's areas. They are configured inline instead of in their own
    // module directories because they have no fields or templates of their own.
    'card-title-rt-widget': {
      extend: '@apostrophecms/rich-text-widget',
      options: {
        defaultData: { content: '<h3 class="card__title">My Card Title</h3>' }
      }
    },
    'card-content-rt-widget': {
      extend: '@apostrophecms/rich-text-widget',
      options: {
        defaultData: { content: '<p class="card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' }
      }
    },
    'price-card-widget': {},

    // A page type for ordinary pages
    'default-page': {},

    // Extends @apostrophecms/blog, which is only available because of the
    // `bundles` entry above.
    article: {},

    // Extends @apostrophecms/blog-page.
    // Paginated index of articles, with "show pages" for individual articles
    'article-page': {},

    // Tease an article on any page
    'article-widget': {},

    // A piece type for categorizing articles
    'article-category': {},

    // Import and export content
    '@apostrophecms/import-export': {}
  }
});
