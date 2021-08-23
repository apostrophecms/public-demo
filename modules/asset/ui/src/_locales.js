export default () => {
  const toggler = document.querySelector('[data-locales-toggle]');
  const localeList = document.querySelector('[data-locales]');

  if (!toggler || !localeList) {
    return;
  }

  apos.util.onReadyAndRefresh(() => {
    toggler.addEventListener('click', toggleLocales);
  });

  function toggleLocales () {
    const expanded = toggler.getAttribute('aria-expanded') === 'true' || false;

    toggler.setAttribute('aria-expanded', !expanded);
    localeList.hidden = expanded;
  }

};
