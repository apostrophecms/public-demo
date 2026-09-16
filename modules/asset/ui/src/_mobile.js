// Opens and closes the full-screen mobile navigation.
//
// Like _locales.js, this uses delegated listeners on `document` because the
// header markup is replaced whenever an editor refreshes the page, which would
// discard listeners attached directly to the buttons.
export default () => {
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-mobile-trigger]')) {
      const nav = document.querySelector('[data-mobile-nav]');
      setOpen(nav && !nav.classList.contains('active'));
    } else if (event.target.closest('[data-mobile-close-trigger]')) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  });

  function setOpen(open) {
    const nav = document.querySelector('[data-mobile-nav]');
    if (!nav) {
      return;
    }
    nav.classList.toggle('active', open);
    nav.dataset.mobileNav = open ? 'visible' : 'hidden';
    nav.setAttribute('aria-hidden', String(!open));
  }
};
