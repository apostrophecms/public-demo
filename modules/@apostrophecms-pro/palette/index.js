const textColors = [
  '#FFF',
  '#f8f9fa',
  '#e9ecef',
  '#dee2e6',
  '#ced4da',
  '#adb5bd',
  '#6c757d',
  '#495057',
  '#343a40',
  '#212529',
  '#000'
];
const bgColors = [ '#390099', '#9e0059', '#ff0054', '#ff5400', '#ffbd00' ];
const bgColorsDark = [ '#1F0054', '#580032', '#900030', '#903000', '#906A00' ];
const fontFams = [
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  'Instrument Serif',
  'Inter'
];

export default {
  fields: {
    add: {
      buttonFont: {
        type: 'select',
        label: 'Button Font',
        selector: ':root',
        property: '--button-font',
        choices: fontFams.map((f) => ({
          label: f.toUpperCase(),
          value: f
        }))
      },
      buttonColor: {
        type: 'color',
        label: 'Button Text Color',
        selector: ':root',
        property: '--button-text',
        options: {
          presetColors: textColors
        }
      },
      buttonTextSize: {
        type: 'range',
        label: 'Button Text Size',
        selector: ':root',
        property: '--button-text-size',
        min: 0.8,
        max: 3,
        step: 0.2,
        valueTemplate: '%VALUE%rem'
      },
      widgetSpacing: {
        type: 'range',
        label: 'Widget Spacing Size',
        selector: ':root',
        property: '--widget-spacing',
        min: 0,
        max: 6,
        step: 1,
        valueTemplate: '%VALUE%rem'
      },
      buttonBackground: {
        type: 'color',
        label: 'Button Background Color',
        selector: ':root',
        property: '--button-bg',
        options: {
          presetColors: bgColors
        }
      },
      buttonBackgroundHover: {
        type: 'color',
        label: 'Button Background Hover Color',
        selector: ':root',
        property: '--button-bg-hover',
        options: {
          presetColors: bgColorsDark
        }
      },
      siteBackcground: {
        type: 'color',
        label: 'Site Background Color',
        selector: ':root',
        property: '--site-bg',
        options: {
          presetColors: textColors
        }
      },
      siteColor: {
        type: 'color',
        label: 'Site Text Color',
        selector: ':root',
        property: '--site-text',
        options: {
          presetColors: textColors
        }
      },
      fontBaseSize: {
        type: 'range',
        label: 'Base Size',
        selector: 'html',
        property: 'font-size',
        min: 14,
        max: 24,
        step: 1,
        unit: 'px'
      },
      fontHeadings: {
        type: 'select',
        label: 'Headings',
        selector: [ 'h1', 'h2', 'h3' ],
        property: 'font-family',
        choices: fontFams.map((f) => ({
          label: f.toUpperCase(),
          value: f
        }))
      },
      fontParagraphs: {
        type: 'select',
        label: 'Paragraphs',
        selector: 'html',
        property: 'font-family',
        choices: fontFams.map((f) => ({
          label: f.toUpperCase(),
          value: f
        }))
      },
      colorPrimary: {
        type: 'color',
        label: 'Primary Color',
        selector: ':root',
        property: [ '--button-bg' ],
        options: {
          presetColors: bgColors
        }
      },
      colorSecondary: {
        type: 'color',
        label: 'Secondary Color',
        selector: [ '.bg-brand-400' ],
        property: [ 'background-color' ],
        options: {
          presetColors: bgColors
        }
      },
      colorNeutral: {
        type: 'color',
        label: 'Neutral Color',
        selector: [ '*', '.border' ],
        property: 'border-color',
        options: {
          presetColors: textColors
        }
      },
      navFontSize: {
        type: 'range',
        label: 'Font Size',
        selector: '#main-menu a',
        property: 'font-size',
        min: 0.8,
        max: 2,
        step: 0.1,
        unit: 'rem'
      },
      navFontColor: {
        type: 'color',
        label: 'Color',
        selector: '#main-menu a',
        property: 'color',
        options: {
          presetColors: textColors
        }
      },
      productTextHeadlineSize: {
        type: 'range',
        selector: '.product-widget h6.px-4.text-gray-800',
        label: 'Headline Size',
        property: 'font-size',
        min: 1,
        max: 2.5,
        step: 0.25,
        unit: 'rem'
      },
      productTextSubheadlineSize: {
        selector: '.product-widget .px-4.py-6',
        type: 'range',
        label: 'Price Size',
        property: 'font-size',
        min: 1,
        max: 2.5,
        step: 0.25,
        unit: 'rem'
      },
      productCardRadius: {
        type: 'range',
        label: 'Card Radius',
        selector: '.product-widget .card',
        property: 'border-radius',
        min: 0,
        max: 36,
        step: 1,
        unit: 'px'
      },
      productCardBackground: {
        type: 'color',
        label: 'Background',
        selector: '.product-widget .card',
        property: 'background-color',
        options: {
          presetColors: bgColors
        }
      },
      navPaddingTB: {
        type: 'range',
        label: 'Padding',
        selector: '.app header',
        property: [ 'padding-top', 'padding-bottom' ],
        min: 0.75,
        max: 3,
        step: 0.25,
        unit: 'rem'
      },
      heroPadding: {
        type: 'range',
        label: 'Padding',
        selector: '.hero-widget .hero-widget-content',
        property: [ 'padding-right', 'padding-bottom', 'padding-left' ],
        min: 0.75,
        max: 3,
        step: 0.25,
        unit: 'rem'
      }
    },
    group: {
      typography: {
        label: 'Typography',
        fields: [ 'fontBaseSize', 'fontHeadings', 'fontParagraphs' ]
      },
      color: {
        label: 'Color',
        fields: [ 'colorPrimary', 'colorSecondary', 'colorNeutral' ]
      },
      navigation: {
        label: 'Navigation',
        fields: [ 'navFontSize', 'navFontColor', 'navPaddingTB' ]
      },
      footer: {
        label: 'Footer',
        fields: [ 'siteBackcground', 'siteColor', 'widgetSpacing' ]
      },
      widgets: {
        label: 'Widgets',
        group: {
          products: {
            label: 'Products',
            group: {
              text: {
                inline: true,
                label: 'Header',
                fields: [
                  'productTextHeadlineSize',
                  'productTextSubheadlineSize'
                ]
              },
              card: {
                inline: true,
                label: 'Card',
                fields: [ 'productCardRadius', 'productCardBackground' ]
              }
            }
          },
          productFeatured: {
            label: 'Products - Featured',
            fields: [ 'buttonColor' ]
          },
          productCategories: {
            label: 'Products - Categories',
            fields: [ 'buttonColor' ]
          },
          cta: {
            label: 'Calls to Action',
            fields: [ 'buttonColor' ]
          },
          heros: {
            label: 'Heros',
            fields: [ 'heroPadding' ]
          },
          promos: {
            label: 'Promotions',
            fields: [ 'buttonColor' ]
          },
          reviews: {
            label: 'Reviews',
            fields: [ 'buttonColor' ]
          },
          textContent: {
            label: 'Text Content',
            fields: [ 'buttonColor' ]
          }
        }
      },
      buttons: {
        label: 'Button Styles',
        fields: [
          'buttonFont',
          'buttonTextSize',
          'buttonColor',
          'buttonBackground',
          'buttonBackgroundHover'
        ]
      },
      cardsContainers: {
        label: 'Cards & Containers',
        fields: [ 'siteBackcground', 'siteColor', 'widgetSpacing' ]
      },
      calendars: {
        label: 'Calendars',
        fields: [ 'siteBackcground', 'siteColor', 'widgetSpacing' ]
      },
      misc: {
        label: 'Misc',
        fields: [ 'siteBackcground', 'siteColor', 'widgetSpacing' ]
      }
    }
  }
};
