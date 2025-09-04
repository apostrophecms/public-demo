export default {
  options: {
    preview: true,
    appearanceFields: true
  },
  fields(self, options) {
    if (!options.appearanceFields) {
      return {};
    }
    return {
      add: {
        appearanceWidth: {
          label: 'Width',
          type: 'range',
          min: 0,
          max: 100,
          def: 100,
          help: 'Relative to the width of the container'
        },
        appearanceAlignment: {
          label: 'Alignment',
          type: 'select',
          def: 'center',
          choices: [
            {
              label: 'Left',
              value: 'left'
            },
            {
              label: 'Center',
              value: 'center'
            },
            {
              label: 'Right',
              value: 'right'
            }
          ]
        },
        appearancePadding: {
          label: 'Padding',
          type: 'range',
          min: 0,
          max: 32,
          def: 0
        },
        appearanceBorderStyle: {
          label: 'Border Style',
          type: 'select',
          def: '',
          choices: [
            {
              label: 'None',
              value: ''
            },
            {
              label: 'Solid',
              value: 'solid'
            },
            {
              label: 'Dotted',
              value: 'dotted'
            },
            {
              label: 'Dashed',
              value: 'dashed'
            }
          ]
        },
        appearanceBorder: {
          type: 'range',
          min: 1,
          max: 32,
          def: 2,
          if: {
            $or: [
              {
                appearanceBorderStyle: 'solid'
              },
              {
                appearanceBorderStyle: 'dotted'
              },
              {
                appearanceBorderDashed: 'dashed'
              }
            ]
          }
        },
        appearanceBorderRadius: {
          type: 'range',
          min: 0,
          max: 32,
          def: 0,
          if: {
            $or: [
              {
                appearanceBorderStyle: 'solid'
              },
              {
                appearanceBorderStyle: 'dotted'
              },
              {
                appearanceBorderDashed: 'dashed'
              }
            ]
          }
        },
        appearanceBorderColor: {
          type: 'color',
          def: '#008800',
          if: {
            $or: [
              {
                appearanceBorderStyle: 'solid'
              },
              {
                appearanceBorderStyle: 'dotted'
              },
              {
                appearanceBorderDashed: 'dashed'
              }
            ]
          }
        },
      },
      group: {
        appearance: {
          label: 'Appearance',
          fields: [
            'appearanceWidth',
            'appearanceAlignment',
            'appearancePadding',
            'appearanceBorderStyle',
            'appearanceBorder',
            'appearanceBorderColor',
            'appearanceBorderRadius'
          ]
        }
      }
    };
  },
  extendMethods(self) {
    return {
      composeSchema(_super) {
        if (self.options.appearanceFields) {
          // Since we are forcing a appearance group to exist, politely move ungrouped fields to a "Main" group
          const ungrouped = Object.keys(self.fields).filter(name => !Object.values(self.fieldsGroups).some(group => group.fields.includes(name)));
          if (ungrouped.length) {
            const { main, ...rest } = self.fieldsGroups;
            if (main) {
              main.fields = [...main.fields, ...ungrouped];
            } else {
              self.fieldsGroups = {
                ...rest,
                // Goes after all intended groups except appearance
                main: {
                  label: 'Main',
                  fields: ungrouped
                }
              };
            }
          }
          // Make sure the appearance group goes at the end
          const {
            appearance,
            ...rest
          } = self.fieldsGroups;
          self.fieldsGroups = {
            ...rest,
            appearance
          };
        }
        return _super();
      },
      async output(_super, req, widget, options, _with) {
        const content = await _super(req, widget, options, _with);
        if (!self.options.appearanceFields) {
          return content;
        }
        return self.render(req, 'appearance', {
          widget,
          content,
          attrs: {
            style: self.widgetAppearanceStyle(widget),
            containerStyle: self.widgetAppearanceContainerStyle(widget),
            class: self.widgetAppearanceClass(widget)
          }
        });
      }
    }
  },
  methods(self) {
    return {
      widgetAppearanceStyle(widget) {
        let borderBox = false;
        const styles = [];
        if (widget.appearanceWidth !== 100) {
          styles.push(`width: ${widget.appearanceWidth}%`);
        }
        if (widget.appearancePadding !== 0) {
          borderBox = true;
          styles.push(`padding: ${widget.appearancePadding}%`);
        }
        if (widget.appearanceBorderStyle !== '') {
          borderBox = true;
          styles.push(`border: ${widget.appearanceBorder}px ${widget.appearanceBorderStyle} ${widget.appearanceBorderColor}`);
          if (widget.appearanceBorderRadius > 0) {
            styles.push(`border-radius: ${widget.appearanceBorderRadius}px`);
          }
        }
        if (borderBox) {
          styles.push('box-sizing: border-box');
        }
        return styles.join(';');
      },
      widgetAppearanceContainerStyle(widget) {
        const styles = [ 'display: flex', 'width: 100%' ];
        styles.push(`justify-content: ${widget.appearanceAlignment}`);
        return styles.join(';');
      },
      widgetAppearanceClass(widget) {
        return '';
      }
    };
  }
};
