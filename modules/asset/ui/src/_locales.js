export default () => {
  apos.util.onReadyAndRefresh(() => {
    const locales = document.querySelector('[data-locales]');
    const toggler = document.querySelector('[data-locales-toggle]');
    const localeList = document.querySelector('[data-locales-list]');

    if (!toggler || !localeList) {
      return;
    }

    toggler.addEventListener('click', toggleLocales);

    window.addEventListener('click', clickOutside);

    function toggleLocales () {
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
  });
};
