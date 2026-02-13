import linkConfig from '../../lib/link.js';
import iconChoices from '../../lib/iconChoices.js';
import { klona } from 'klona';

const localLinkConfig = klona(linkConfig.link);

localLinkConfig.linkText.if =
localLinkConfig.linkType.if =
localLinkConfig.linkTarget.if = {
  orientation: 'vertical'
};

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'project:card',
    icon: 'link-icon',
    previewImage: 'svg',
    description: 'project:cardAdd',
    initialModal: false
  },
  fields: {
    add: {
      titleRT: {
        label: 'project:title',
        type: 'area',
        def: [
          'card-title-rt'
        ],
        options: {
          max: 1,
          widgets: {
            'card-title-rt': {
              toolbar: [
                'styles'
              ],
              styles: [
                {
                  tag: 'h3',
                  label: 'project:rtH3',
                  class: 'card__title'
                }
              ]
            }
          }
        }
      },
      contentRT: {
        label: 'project:content',
        type: 'area',
        def: [
          'card-content-rt'
        ],
        options: {
          max: 1,
          widgets: {
            'card-content-rt': {
              toolbar: [
                'styles'
              ],
              styles: [
                {
                  tag: 'p',
                  label: 'project:rtParagraph',
                  class: 'card__title'
                }
              ]
            }
          }
        }
      },
      icon: {
        label: 'project:icon',
        type: 'select',
        choices: iconChoices
      },
      bg: {
        label: 'project:cardBackground',
        type: 'boolean',
        def: true
      },
      orientation: {
        label: 'project:orientation',
        type: 'select',
        choices: [
          {
            value: 'horizontal',
            label: 'project:horizontal'
          },
          {
            value: 'vertical',
            label: 'project:vertical'
          }
        ],
        def: 'horizontal'
      },
      ...localLinkConfig,
      style: {
        type: 'select',
        label: 'project:linkStyle',
        if: {
          orientation: 'vertical'
        },
        choices: [
          {
            label: 'project:primary',
            value: 'primary',
            def: true
          },
          {
            label: 'project:outline',
            value: 'outline'
          }
        ]
      }
    }
  },
  styles: {
    add: {
      backgroundColor: {
        label: 'project:backgroundColor',
        type: 'color',
        property: 'background-color',
        selector: '.card-widget',
        options: {
          presetColors: [ '--surface-color', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da' ]
        }
      },
      iconColor: {
        label: 'project:iconColor',
        type: 'color',
        property: 'color',
        selector: '.card__icon svg',
        options: {
          presetColors: [ '#fb5607', '#ff006e', '#8338ec', '#3a86ff' ]
        }
      },
      iconBackground: {
        label: 'project:iconBackground',
        type: 'color',
        property: 'background-color',
        selector: '.card__icon',
        options: {
          presetColors: [ '#fb560730', '#ff006e30', '#8338ec30', '#3a86ff30' ]
        }
      },
      border: {
        label: 'apostrophe:styleBorder',
        type: 'object',
        selector: '.card-widget',
        options: {
          flat: true,
          hideLabel: true
        },
        fields: {
          add: {
            active: {
              label: 'apostrophe:styleBorder',
              type: 'boolean',
              def: false
            },
            width: {
              label: 'apostrophe:styleBorderWidth',
              type: 'box',
              def: {
                top: 1,
                right: 1,
                bottom: 1,
                left: 1
              },
              if: {
                active: true
              },
              unit: 'px',
              property: 'border-%key%-width'
            },
            color: {
              label: 'apostrophe:styleColor',
              type: 'color',
              if: {
                active: true
              },
              property: 'border-color',
              options: {
                presetColors: [ '#6c757d', '#495057', '#343a40', '#212529' ]
              }
            },
            style: {
              label: 'apostrophe:styleStyle',
              type: 'select',
              def: 'solid',
              if: {
                active: true
              },
              choices: [
                {
                  label: 'apostrophe:styleSolid',
                  value: 'solid'
                },
                {
                  label: 'apostrophe:styleDotted',
                  value: 'dotted'
                },
                {
                  label: 'apostrophe:styleDashed',
                  value: 'dashed'
                }
              ],
              property: 'border-style'
            }
          }
        }
      },
      boxShadow: {
        preset: 'boxShadow',
        selector: '.card-widget'
      }
    }
  },
  init(self) {
    self.addTextMigration();
  },
  methods(self) {
    return {
      async addTextMigration() {
        self.apos.migration.add('card-widget-text-migration', () => {

          return self.apos.migration.eachWidget({}, async (doc, widget, dotPath) => {

            if (widget.type !== 'card') {
              return;
            }

            const ensureArea = (key) => {
              if (!widget[key]) {
                return;
              }

              const rtKey = `${key}RT`;

              if (!widget[rtKey]) {
                widget[rtKey] = {
                  _id: self.apos.util.generateId(),
                  items: [],
                  metaType: 'area'
                };
              }

              if (!widget[rtKey].items.length) {
                widget[rtKey].items.push(makeItem(key, widget[key]));
              }
            };

            const makeItem = (key, content) => ({
              _id: self.apos.util.generateId(),
              metaType: 'widget',
              type: `card-${key}-rt`,
              content:
                key === 'title'
                  ? `<h3 class="card__title">${content}</h3>`
                  : `<p class="card__text">${content}</p>`,
              permalinkIds: [],
              imageIds: []
            });

            ensureArea('title');
            ensureArea('content');

            return self.apos.doc.db.updateOne(
              { _id: doc._id },
              { $set: { [dotPath]: widget } }
            );
          }
          );
        });
      }
    };
  }
};
