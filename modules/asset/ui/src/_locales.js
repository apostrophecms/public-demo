export default () => {
  window.aposSwitchLocale = function aposSwitchLocale(toggler) {
    const locales = document.querySelector('[data-locales]');
    const localeList = document.querySelector('[data-locales-list]');
    if (!toggler || !localeList) {
      return;
    }
    toggleLocales();

    if (toggler.getAttribute('aria-expanded') === 'true') {
      window.addEventListener('click', clickOutside);
    } else {
      window.removeEventListener('click', clickOutside);
    }

    function toggleLocales() {
      const expanded = toggler.getAttribute('aria-expanded') === 'true' || false;

      toggler.setAttribute('aria-expanded', !expanded);
      localeList.hidden = expanded;
    }

    function clickOutside ({ target }) {
      const expanded = toggler.getAttribute('aria-expanded') === 'true' || false;

      if (expanded && !locales.contains(target)) {
        toggler.setAttribute('aria-expanded', false);
        localeList.hidden = true;
      }
    }
  };
};
