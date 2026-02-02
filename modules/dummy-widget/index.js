import linkConfig from '../../lib/link.js';
// import iconChoices from '../../lib/iconChoices.js';
import { fullConfig } from '../../lib/area.js';
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
    label: 'DUMMY'
  },
  fields: {
    add: {
      string: {
        label: 'Super long string title that is entirely too long to be very helpful',
        type: 'string',
        help: 'One cannot separate orchestras from cheerful magicians. The fructed knowledge reveals itself as an unkempt tub to those who look. This could be, or perhaps few can name a crimpy thailand that isn\'t a shadeless literature. A timer can hardly be considered an unfilled chalk without also being a priest. The almanacs could be said to resemble chaster beards.'
      },
      blockString: {
        label: 'Text area',
        type: 'string',
        htmlHelp: 'This link to the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea" target="_blank">MDN textarea reference</a> should display properly.',
        textarea: true
      },
      slugger: {
        type: 'slug',
        label: 'Fake Slug'
      },
      timeField: {
        label: 'Time',
        type: 'time',
        def: null
      },
      main: {
        label: 'Content',
        type: 'area',
        options: {
          widgets: fullConfig
        }
      },
      housing: {
        label: 'Housing Needed',
        type: 'boolean',
        help: 'Room preference field is required when this option is selected.'
      },
      roomPreference: {
        label: 'Preferred Room Number',
        type: 'string',
        if: {
          housing: true
        },
        help: 'Required, but only if Housing Needed is selected.'
      },
      singleton: {
        label: 'Video singleton',
        type: 'area',
        max: 1,
        options: {
          widgets: {
            // TODO: set '@apostrophecms/video' to edit the video once added,
            // when scrolling issue will be fixed.
            // cf. https://linear.app/apostrophecms/issue/PRO-2802/scroll-into-view
            // For now, we add the video without the placeholder as before.
            // see TODO in cypress/tests/document-versions.cy.js
            // '@apostrophecms/video': {}
            '@apostrophecms/video': {}
          }
        }
      },
      _articles: {
        label: 'Related topics',
        type: 'relationship',
        withType: 'article',
        help: 'No more than two allowed.',
        fields: {
          add: {
            relationTest: {
              type: 'string',
              label: 'Relation test'
            }
          }
        },
        max: 2,
        builders: {
          project: {
            title: 1,
            type: 1,
            checkFields: 1
          }
        }
      },
      _users: {
        label: 'Related non localized users',
        type: 'relationship',
        withType: '@apostrophecms/user',
        max: 2
      },
      arrayField: {
        label: 'Array field',
        type: 'array',
        titleField: 'firstString',
        max: 3,
        fields: {
          add: {
            firstString: {
              type: 'string',
              label: 'The primary string',
              help: 'Type "foo" to see the conditional string field appear'
            },
            moreString: {
              type: 'string',
              label: 'Another string'
            },
            _articles: {
              label: 'Selected articles',
              type: 'relationship',
              withType: 'article'
            },
            conditionalString: {
              type: 'string',
              label: 'Conditional string',
              placeholder: 'Visible if firstString is "foo"',
              if: {
                firstString: 'foo'
              }
            },
            requiredString: {
              label: 'Required string',
              type: 'string'
            }
          }
        }
      },
      inlineArrayField: {
        label: 'Favorite Flavors',
        itemLabel: 'Favorite Flavor',
        type: 'array',
        inline: true,
        titleField: 'flavor',
        help: 'Think Baskin Robbins',
        fields: {
          add: {
            flavor: {
              type: 'string',
              label: 'Flavor',
              help: 'Type "foo" to see the conditional string field appear',
            },
            conditional: {
              type: 'string',
              label: 'Foo Details',
              if: {
                flavor: 'foo'
              }
            }
          }
        }
      },
      inlineArrayTableField: {
        label: 'Flavors Table',
        itemLabel: 'Flavor Item',
        type: 'array',
        titleField: 'flavor',
        inline: true,
        style: 'table',
        help: 'Think Baskin Robbins',
        fields: {
          add: {
            flavor: {
              type: 'string',
              label: 'Flavor'
            },
            flavorType: {
              type: 'select',
              label: 'Flavor Type',
              choices: [
                {
                  label: 'Ice Cream',
                  value: 'iceCream'
                },
                {
                  label: 'Sorbet',
                  value: 'sorbet'
                }
              ],
              def: 'iceCream'
            },
            iceCream: {
              type: 'select',
              label: 'Flavor Details',
              choices: [
                {
                  label: 'Cherry',
                  value: 'cherry'
                },
                {
                  label: 'Raspberry',
                  value: 'raspberry'
                }
              ],
              if: {
                flavorType: 'iceCream'
              }
            },
            sorbet: {
              type: 'select',
              label: 'Flavor Details',
              choices: [
                {
                  label: 'Orange',
                  value: 'orange'
                },
                {
                  label: 'Ginger',
                  value: 'ginger'
                }
              ],
              if: {
                flavorType: 'sorbet'
              }
            }
          }
        }
      },
      inlineArrayTableWithRemoveButtonField: {
        label: 'Flavors Table with Remove Button',
        itemLabel: 'Flavor Item',
        type: 'array',
        inline: true,
        style: 'table',
        duplicate: false,
        draggable: false,
        help: 'Think Baskin Robbins',
        fields: {
          add: {
            flavor: {
              type: 'string',
              label: 'Flavor'
            },
            flavorType: {
              type: 'select',
              label: 'Flavor Type',
              choices: [
                {
                  label: 'Ice Cream',
                  value: 'iceCream'
                },
                {
                  label: 'Sorbet',
                  value: 'sorbet'
                }
              ],
              def: 'iceCream'
            },
            iceCream: {
              type: 'select',
              label: 'Flavor Details',
              choices: [
                {
                  label: 'Cherry',
                  value: 'cherry'
                },
                {
                  label: 'Raspberry',
                  value: 'raspberry'
                }
              ],
              if: {
                flavorType: 'iceCream'
              }
            },
            sorbet: {
              type: 'select',
              label: 'Flavor Details',
              choices: [
                {
                  label: 'Orange',
                  value: 'orange'
                },
                {
                  label: 'Ginger',
                  value: 'ginger'
                }
              ],
              if: {
                flavorType: 'sorbet'
              }
            }
          }
        }
      },
      objectField: {
        label: 'Object field',
        type: 'object',
        help: 'Here is some helpful help',
        fields: {
          add: {
            firstString: {
              type: 'string',
              label: 'The primary string',
              help: 'Type "foo" to see the conditional string field appear',
              max: 10
            },
            moreString: {
              type: 'string',
              label: 'Another string'
            },
            conditionalString: {
              type: 'string',
              label: 'Conditional string',
              placeholder: 'Visible if firstString is "foo"',
              if: {
                firstString: 'foo'
              }
            },
            _articles: {
              label: 'Selected articles',
              type: 'relationship',
              withType: 'article'
            },
            nestedObject: {
              label: 'Nested Object',
              help: 'Rationalization: a useful technique',
              type: 'object',
              fields: {
                add: {
                  excuse: {
                    type: 'string',
                    label: 'Excuse',
                    help: 'Type "foo" to see the conditional string field appear',
                  },
                  apology: {
                    type: 'string',
                    label: 'Apology'
                  },
                  conditional: {
                    type: 'string',
                    label: 'Conditional string',
                    placeholder: 'Visible if excuse is "foo"',
                    if: {
                      excuse: 'foo'
                    }
                  }
                }
              }
            }
          }
        }
      },
      attachmentField: {
        label: 'Attachment',
        type: 'attachment',
        group: 'office'
      },
      photoField: {
        label: 'Photo attachment',
        type: 'attachment',
        group: 'image'
      },
      booleanField: {
        label: 'Boolean',
        type: 'boolean'
      },
      booleanCustom: {
        label: 'Labeled boolean',
        type: 'boolean',
        choices: [
          {
            label: 'Go',
            value: true
          },
          {
            label: 'Stop',
            value: false
          }
        ]
      },
      checkFields: {
        label: 'Label',
        type: 'checkboxes',
        choices: [
          {
            label: 'Small',
            value: 'small'
          },
          {
            label: 'Medium',
            value: 'med'
          },
          {
            label: 'Big',
            value: 'big'
          }
        ]
      },
      checkFieldsCombo: {
        label: 'Combo',
        type: 'checkboxes',
        style: 'combo',
        all: {
          label: 'testNs:comboLabel'
        },
        choices: [ ...Array(15).keys() ].map((i) => ({
          label: `Item ${i}`,
          value: i
        }))
      },
      checkFieldsComboReadOnly: {
        label: 'Combo Read Only',
        type: 'checkboxes',
        style: 'combo',
        readOnly: true,
        choices: [ ...Array(5).keys() ].map((i) => ({
          label: `Item ${i}`,
          value: i
        })),
        def: [ 1, 3 ]
      },
      radioFields: {
        label: 'Radio',
        type: 'radio',
        choices: [
          {
            label: 'Small',
            value: 'small'
          },
          {
            label: 'Medium',
            value: 'med'
          },
          {
            label: 'Big',
            value: 'big'
          }
        ]
      },
      radioButtonsFields: {
        label: 'Radio Buttons',
        type: 'radio',
        buttons: true,
        choices: [
          {
            label: 'Left',
            value: 'left',
            icon: 'format-align-left-icon'
          },
          {
            label: 'Center',
            value: 'center',
            icon: 'format-align-center-icon'
          },
          {
            label: 'Right',
            value: 'right',
            icon: 'format-align-right-icon'
          }
        ]
      },
      colorField: {
        type: 'color',
        label: 'Color'
      },
      dateField: {
        label: 'Date',
        type: 'date'
      },
      dateAndTimeField: {
        label: 'Date And Time',
        type: 'dateAndTime'
      },
      emailField: {
        type: 'email',
        autocomplete: 'off'
      },
      floatField: {
        label: 'Float',
        type: 'float',
        help: 'Maximum of 4.0',
        max: 4.0
      },
      integerField: {
        label: 'Integer',
        type: 'integer',
        help: 'Between 3 and 9, inclusive',
        min: 3,
        max: 9
      },
      oembedField: {
        label: 'Embedder',
        type: 'oembed'
      },
      passwordField: {
        label: 'Password',
        type: 'password',
        autocomplete: 'new-password'
      },
      rangeField: {
        type: 'range',
        label: 'Range',
        help: 'From 18 to 32, with steps of 2',
        min: 18,
        max: 32,
        step: 2 // optional
      },
      selector: {
        label: 'Select a color scheme for this page',
        type: 'select',
        choices: [
          { label: 'Choice One', value: 'one' },
          { label: 'Choice Two', value: 'two' }
        ]
      },
      urlField: {
        label: 'URL',
        type: 'url'
      },
      box: {
        label: 'Box Bounds',
        type: 'box',
        min: -3,
        max: 50,
        step: 5,
        def: {
          top: -1,
          right: 2,
          bottom: 49,
          left: 0
        }
      }
    },
    group: {
      strings: {
        label: 'Strings',
        fields: [
          'title',
          'string',
          'blockString',
          'timeField',
          'dateField',
          'dateAndTimeField',
          'emailField',
          'passwordField',
          'slugger',
          'urlField'
        ]
      },
      nonStrings: {
        label: 'Fun fields',
        fields: [
          'attachmentField',
          'booleanField',
          'checkFields',
          'radioFields',
          'radioButtonsFields',
          'colorField',
          'floatField',
          'integerField',
          'rangeField',
          'selector',
          'selectorWithDef',
          'requiredSelector',
          'requiredWithNullSelector',
          'dynamicSelector',
          'dynamicSelectorWithDef',
          'dynamicRequiredSelector',
          'dynamicRequiredWithNullSelector',
          'booleanCustom'
        ]
      },
      fancy: {
        label: 'Fancy fields',
        fields: [
          '_articles',
          '_users',
          'arrayField',
          'inlineArrayField',
          'inlineArrayTableField',
          'inlineArrayTableWithRemoveButtonField',
          'objectField',
          'photoField',
          'singleton',
          'oembedField',
          'main',
          'housing',
          'roomPreference',
          'rating',
          'checkFieldsCombo',
          'checkFieldsComboReadOnly',
          'box'
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
      },
      width: {
        preset: 'width',
        selector: '.card-widget'
      },
      alignment: {
        preset: 'alignment',
        selector: '.card-widget'
      },
      padding: {
        preset: 'padding',
        selector: '.card-widget'
      },
      margin: {
        preset: 'margin',
        selector: '.card-widget'
      }
    }
  }
};
