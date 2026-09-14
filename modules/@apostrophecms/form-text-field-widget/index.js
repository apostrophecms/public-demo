// Project-level improvement of the form module's text field widget: when the
// editor sets the input type to "Phone," the field gets a searchable country
// picker (flags, dial codes, as-you-type formatting) courtesy of
// `intl-tel-input`, and submissions are validated and stored in E.164.
import allCountries from 'intl-tel-input/data';

// `intl-tel-input` ships its country list without names — the browser fills
// them in from `Intl.DisplayNames` at runtime — so build the labels the editor
// picks from here.
const regionNames = new Intl.DisplayNames([ 'en' ], { type: 'region' });

function countryName (iso2) {
  const code = iso2.toUpperCase();

  try {
    return regionNames.of(code) || code;
  } catch (e) {
    // Not a region code this runtime knows about.
    return code;
  }
}

const countryChoices = allCountries
  .map(({ iso2, dialCode }) => ({
    label: `${countryName(iso2)} (+${dialCode})`,
    value: iso2
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export default {
  fields: {
    add: {
      phoneInitialCountry: {
        label: 'project:phoneInitialCountry',
        type: 'select',
        help: 'project:phoneInitialCountryHelp',
        choices: [
          {
            label: 'project:phoneInitialCountryLocale',
            value: ''
          },
          ...countryChoices
        ],
        def: '',
        if: {
          inputType: 'tel'
        }
      },
      phoneValidate: {
        label: 'project:phoneValidate',
        type: 'boolean',
        help: 'project:phoneValidateHelp',
        def: true,
        if: {
          inputType: 'tel'
        }
      }
    }
  },
  async init (self) {
    // The same libphonenumber build the browser uses, so a submission that
    // bypasses the widget's JavaScript is held to the same standard.
    const { default: phoneUtils } = await import('intl-tel-input/utils');

    self.phoneUtils = phoneUtils;
  },
  methods (self) {
    return {
      isPhone (widget) {
        return widget.inputType === 'tel';
      },
      // The country the picker opens on: whatever the editor chose, or the
      // region the current locale implies (`fr` -> France, `de` -> Germany).
      initialCountry (req, widget) {
        if (widget.phoneInitialCountry) {
          return widget.phoneInitialCountry;
        }

        try {
          return (new Intl.Locale(req.locale).maximize().region || '')
            .toLowerCase();
        } catch (e) {
          return '';
        }
      }
    };
  },
  extendMethods (self) {
    return {
      load (_super, req, widgets) {
        widgets
          .filter(widget => self.isPhone(widget))
          .forEach(widget => {
            widget.phone = {
              initialCountry: self.initialCountry(req, widget),
              locale: req.locale,
              validate: widget.phoneValidate !== false
            };
          });

        return _super(req, widgets);
      },
      // `checkRequired` is the only per-field validation hook that receives
      // `req`, so it is where the "that isn't a real number" message can be
      // localized. The processor calls it immediately before
      // `sanitizeFormField`.
      checkRequired (_super, req, widget, input) {
        _super(req, widget, input);

        const value = input[widget.fieldName];

        if (!self.isPhone(widget) || widget.phoneValidate === false || !value) {
          return;
        }

        // The widget submits E.164, so the leading dial code identifies the
        // country and no separate region hint is needed here.
        if (!self.phoneUtils.isValidNumber(value, null)) {
          throw self.apos.error('invalid', {
            fieldError: {
              field: widget.fieldName,
              error: 'invalid',
              message: req.t('project:phoneInvalid')
            }
          });
        }
      },
      sanitizeFormField (_super, widget, input, output) {
        _super(widget, input, output);

        if (!self.isPhone(widget) || !output[widget.fieldName]) {
          return;
        }

        // Store one canonical shape no matter how the number was typed.
        output[widget.fieldName] = self.phoneUtils.formatNumber(
          output[widget.fieldName], null, 'E164'
        );
      }
    };
  }
};
