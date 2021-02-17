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

    // A page type for ordinary pages
    'default-page': {},

    // A piece type for articles
    article: {},
    // Tease an article on any page
    'article-widget': {},
    // Paginated index of articles, and with pages for individual articles
    'article-page': {},
    '@apostrophecms-pro/palette': {
      fields: {
        add: {
          backgroundColor: {
            label: 'Background color',
            type: 'color',
            help: 'The background of your website',
            selector: 'body',
            property: 'background-color',
            def: '#ffffff'
          },
          primaryColor: {
            label: 'Primary Color',
            type: 'color',
            help: 'Primary color block color',
            selector: '.primary',
            property: 'background-color',
            def: '#000000'
          },
          secondaryColor: {
            label: 'Secondary Color',
            type: 'color',
            help: 'Used for accents',
            selector: '.secondary',
            property: 'background-color',
            def: '#0000ff'
          },
          baseFont: {
            label: 'Font',
            type: 'select',
            help: 'Base font family for the website',
            selector: 'body',
            property: 'font-family',
            choices: [
              {
                label: 'Helvetica',
                value: 'helvetica',
                def: true
              },
              {
                label: 'Times',
                value: 'times'
              }
            ]
          },
          baseFontSize: {
            label: 'Size',
            type: 'select',
            help: 'Base font size',
            selector: 'body',
            property: 'font-size',
            unit: 'px',
            choices: [
              {
                label: '12px',
                value: '12',
                def: true
              },
              {
                label: '15px',
                value: '15'
              }
            ]
          },
          baseFontColor: {
            label: 'Color',
            type: 'color',
            selector: 'body',
            property: 'color',
            def: '#000000'
          },
          titleFont: {
            label: 'Font',
            type: 'select',
            help: 'Base font family for the website',
            selector: 'h1',
            property: 'font-family',
            choices: [
              {
                label: 'Helvetica',
                value: 'helvetica',
                def: true
              },
              {
                label: 'Times',
                value: 'times'
              }
            ]
          }
        }
      },
      options: {
        paletteGroups: {
          page: {
            label: 'Page',
            fields: [ 'backgroundColor', 'primaryColor', 'secondaryColor' ]
          },
          typography: {
            label: 'Typography',
            fields: [],
            group: {
              default: {
                label: 'Default',
                fields: [ 'baseFont', 'baseFontSize', 'baseFontColor' ]
              },
              title: {
                label: 'Title',
                fields: [ 'titleFont' ]
              }
            }
          }
        }
      }
    }
  }
});
