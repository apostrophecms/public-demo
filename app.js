require('apostrophe')({
  shortName: 'a3-demo',
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

    '@apostrophecms/i18n': {
      options: {
        locales: {
          en: {
            label: 'English'
          },
          'en-CA': {
            label: 'Canada (EN)',
            prefix: '/en-ca'
          },
          'fr-CA': {
            label: 'Canada (FR)',
            prefix: '/fr-ca'
          },
          fr: {
            label: 'France',
            prefix: '/fr'
          },
          de: {
            label: 'Germany',
            prefix: '/de'
          },
          nl: {
            label: 'Netherlands',
            prefix: '/nl'
          },
          sv: {
            label: 'Sweeden',
            prefix: '/sv'
          },
          cs: {
            label: 'Czech Republic',
            prefix: '/cs'
          },
          hu: {
            label: 'Hungary',
            prefix: '/hu'
          },
          is: {
            label: 'Iceland',
            prefix: '/is'
          },
          no: {
            label: 'Norway',
            prefix: '/no'
          },
          pl: {
            label: 'Polish',
            prefix: '/pl'
          }
        }
      }
    },

    'ui-localizations': {},

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
