// Opens and closes the locale switcher dropdowns.
//
// Uses one delegated listener on `document` instead of listeners on each
// switcher: the header is re-rendered whenever an editor refreshes the page
// (for example, switching between edit and preview), which throws away any
// listeners attached to the old markup. `document` is never replaced.
//
// The layout renders more than one switcher (desktop and mobile nav), so each
// lookup is scoped to the `[data-locales]` wrapper of the switcher involved.
export default () => {
  document.addEventListener('click', (event) => {
    const toggler = event.target.closest('[data-locales-toggle]');

    // Close any open switcher the click landed outside of.
    document.querySelectorAll('[data-locales-toggle][aria-expanded="true"]').forEach((open) => {
      if (open !== toggler && !open.closest('[data-locales]').contains(event.target)) {
        setExpanded(open, false);
      }
    });

    if (toggler) {
      setExpanded(toggler, toggler.getAttribute('aria-expanded') !== 'true');
    }
  });

  function setExpanded(toggler, expanded) {
    const list = toggler.closest('[data-locales]')?.querySelector('[data-locales-list]');
    if (!list) {
      return;
    }
    toggler.setAttribute('aria-expanded', expanded);
    list.hidden = !expanded;
  }
};
