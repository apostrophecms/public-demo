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
    // least have a minimal configuration here: `moduleName: {}`

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project

    '@apostrophecms/template': {
      options: {
        viewsFolderFallback: path.join(__dirname, 'views')
      }
    },
    'test1-widget': {},
    'two-column-widget': {},
    'product': {},
    '@apostrophecms/rich-text-widget': {
      options: {
        defaultOptions: {
        }
      }
    },
    '@apostrophecms/storybook': {
      options: {
        domain: 'ui.apos.dev'
      }
    }
  }
});
