// Opens and closes each locale switcher's dropdown. The layout renders more
// than one switcher (desktop and mobile nav), so every lookup is scoped to the
// switcher that was clicked rather than the first match on the page.
export default () => {
  apos.util.onReady(() => {
    document.querySelectorAll('[data-locales]').forEach(setUp);
  });

  function setUp(locales) {
    const toggler = locales.querySelector('[data-locales-toggle]');
    const localeList = locales.querySelector('[data-locales-list]');
    if (!toggler || !localeList || toggler.dataset.localesReady) {
      return;
    }
    // onReady runs again after in-context edits refresh the page content.
    toggler.dataset.localesReady = 'true';

    toggler.addEventListener('click', () => {
      setExpanded(toggler.getAttribute('aria-expanded') !== 'true');
    });

    function setExpanded(expanded) {
      toggler.setAttribute('aria-expanded', expanded);
      localeList.hidden = !expanded;
      if (expanded) {
        window.addEventListener('click', clickOutside);
      } else {
        window.removeEventListener('click', clickOutside);
      }
    }

    function clickOutside({ target }) {
      if (!locales.contains(target)) {
        setExpanded(false);
      }
    }
  }
};
