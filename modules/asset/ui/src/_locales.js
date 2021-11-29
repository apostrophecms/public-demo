export default () => {
  apos.util.onReadyAndRefresh(() => {
    const localesSelectorElem = document.querySelector('[data-locales-selector]');
    const toggleBtn = localesSelectorElem.querySelector('[data-locales-toggle]');
    const localesList = localesSelectorElem.querySelector('.locales__list');

    window.addEventListener('click', ({ target }) => {
      if (localesList.classList.contains('active') && !localesSelectorElem.contains(target)) {
        localesList.classList.remove('active');
      }
    });

    toggleBtn.addEventListener('click', () => {
      const shouldRemove = localesList.classList.contains('active');
      localesList.classList[shouldRemove ? 'remove' : 'add']('active');
    });
  });
};
