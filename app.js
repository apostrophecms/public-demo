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
    '@apostrophecms-pro/palette': {
      // options: {
      fields: {
        add: {
          fontMeta: {
            type: 'select',
            label: 'Font Family - Meta',
            choices: [
              {
                label: 'Consolas',
                value: '"Consolas", "Monaco", monospace'
              },
              {
                label: 'Dejavu Sans',
                value: '"Dejavu Sans", "Arial", "Verdana", sans-serif'
              },
              {
                label: 'Courier New',
                value: '"courier new", courier, andale mono, "free mono", monospace'
              },
              {
                label: 'Gill Sans',
                value: '"Gill Sans", "Gill Sans MT", "Calibri", sans-serif'
              }
            ],
            selector: ':root',
            property: '--t-font-meta'
          },
          fontBody: {
            type: 'select',
            label: 'Font Family - Body',
            choices: [
              {
                label: 'Tahoma',
                value: 'tahoma, geneva, verdana, kalimati, sans-serif'
              },
              {
                label: 'Georgia',
                value: '"Georgia", "Times", "Times New Roman", serif'
              },
              {
                label: 'Lucida Sans',
                value: '"Lucida Sans", "Helvetica", "Arial", sans-serif'
              },
              {
                label: 'Goudy Old Style',
                value: '"Goudy Old Style", "Garamond", "Big Caslon", "Times New Roman", serif'
              }
            ],
            selector: ':root',
            property: '--t-font-body'
          },
          fontHeadline: {
            type: 'select',
            label: 'Font Family - Headline',
            choices: [
              {
                label: 'Rockwell',
                value: '"Rockwell", "Courier Bold", "Courier", "Georgia", "Times"'
              },
              {
                label: 'Optima',
                value: '"Optima", "Segoe", "Segoe UI", "Candara", "Calibri", "Arial", sans-serif'
              },
              {
                label: 'Gill Sans',
                value: '"Gill Sans", "Gill Sans MT", "Calibri", sans-serif'
              },
              {
                label: 'Didot',
                value: '"Didot", "Didot LT STD", "Hoefler Text", "Garamond", "Calisto MT", "Times New Roman", serif'
              }
            ],
            selector: ':root',
            property: '--t-font-headline'
          },
          colorOne: {
            type: 'color',
            label: 'Theme Color One',
            selector: ':root',
            property: '--t-color-one'
          },
          colorTwo: {
            type: 'color',
            label: 'Theme Color Two',
            selector: ':root',
            property: '--t-color-two'
          },
          colorThree: {
            type: 'color',
            label: 'Theme Color Three',
            selector: ':root',
            property: '--t-color-three'
          },
          colorFour: {
            type: 'color',
            label: 'Theme Color Four',
            selector: ':root',
            property: '--t-color-four'
          },
          colorFive: {
            type: 'color',
            label: 'Theme Color Five',
            selector: ':root',
            property: '--t-color-five'
          },
          radius: {
            type: 'range',
            label: 'Border Radius',
            selector: ':root',
            property: '--t-radius',
            min: 0,
            max: 20,
            unit: 'px'
          },
          buttonFont: {
            type: 'select',
            label: 'Button Font',
            choices: [
              {
                label: 'Body',
                value: '--t-font-body'
              },
              {
                label: 'Meta',
                value: '--t-font-meta'
              },
              {
                label: 'Headline',
                value: '--t-font-headline'
              }
            ],
            selector: '.button',
            property: 'font-family',
            valueTemplate: 'var(%VALUE%)'
          },
          buttonBackground: {
            label: 'Button Background Color',
            type: 'color',
            options: {
              pickerOptions: {
                presetColors: [
                  '--t-color-one',
                  '--t-color-two',
                  '--t-color-three',
                  '--t-color-four',
                  '--t-color-five'
                ]
              }
            },
            selector: '.button',
            property: 'background-color',
            valueTemplate: 'var(%VALUE%)'
          },
          buttonBorder: {
            label: 'Button Border Color',
            type: 'color',
            options: {
              pickerOptions: {
                presetColors: [
                  '--t-color-one',
                  '--t-color-two',
                  '--t-color-three',
                  '--t-color-four',
                  '--t-color-five'
                ]
              }
            },
            selector: '.button',
            property: 'border-color',
            valueTemplate: 'var(%VALUE%)'
          }
        },
        group: {
          theme: {
            label: 'Theme',
            fields: [
              'fontMeta',
              'fontBody',
              'fontHeadline',
              'colorOne',
              'colorTwo',
              'colorThree',
              'colorFour',
              'colorFive',
              'radius'
            ]
          },
          button: {
            label: 'Buttons',
            fields: [
              'buttonFont',
              'buttonBackground',
              'buttonBorder'
            ]
          }
        }
      }
      // }
    },
    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/@apostrophecms/assets/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here to turn them on: `moduleName: {}`
    '@apostrophecms/vite': {},
    localizations: {},

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
        // refreshOnRestart: true,
        hmr: 'apos'
      }
    },
    '@apostrophecms/seo': {},

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
    topic: {},
    '@apostrophecms/import-export': {}
  }
});
