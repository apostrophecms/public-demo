import intlTelInput from 'intl-tel-input';
import de from 'intl-tel-input/locale/de';
import es from 'intl-tel-input/locale/es';
import fr from 'intl-tel-input/locale/fr';
import 'intl-tel-input/styles';

// The picker's own chrome — search placeholder, aria labels. Country names come
// from the browser's `Intl.DisplayNames`, and English is the library's default.
const uiTranslations = {
  de,
  es,
  fr
};

let utilsPromise = null;

// libphonenumber is ~270KB, so it loads as its own chunk while the visitor is
// still filling the field in rather than riding along with the page bundle.
// Formatting and validation quietly wait for it; nothing else does.
function loadUtils () {
  if (!utilsPromise) {
    utilsPromise = intlTelInput
      .attachUtils(() => import('intl-tel-input/utils'))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('intl-tel-input: could not load phone number utils', error);
      });
  }

  return utilsPromise;
}

// Once the picker is up, its country search box is the first input in the
// wrapper, so match on the one carrying the field's name instead.
function telInput (el) {
  return el.querySelector('input[name]');
}

export default () => {
  apos.util.widgetPlayers['@apostrophecms/form-text-field-phone'] = {
    selector: '[data-apos-form-phone]',
    player (el) {
      const input = telInput(el);

      if (!input) {
        return;
      }

      const locale = el.dataset.aposFormPhoneLocale || 'en';

      loadUtils();

      intlTelInput(input, {
        countryNameLocale: locale,
        uiTranslations: uiTranslations[locale] || {},
        initialCountry: el.dataset.aposFormPhoneInitialCountry || ''
      });
    }
  };

  apos.aposForm.collectors['@apostrophecms/form-text-field-phone'] = {
    selector: '[data-apos-form-phone]',
    async collector (el) {
      const input = telInput(el);
      const field = input.getAttribute('name');
      const iti = intlTelInput.getInstance(input);

      await loadUtils();

      // No instance, or no utils, means the picker never got off the ground.
      // Send what was typed and let the server have the last word.
      if (!iti || !intlTelInput.utils) {
        return {
          field,
          value: input.value
        };
      }

      if (!input.value.trim()) {
        return {
          field,
          value: ''
        };
      }

      if (el.hasAttribute('data-apos-form-phone-validate') && !iti.isValidNumber()) {
        const error = new Error(el.dataset.aposFormPhoneInvalid);
        error.field = field;

        throw error;
      }

      // E.164, so every submission for this field reads the same way.
      return {
        field,
        value: iti.getNumber()
      };
    }
  };
};
