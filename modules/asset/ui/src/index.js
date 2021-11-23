export default () => {
  const localesSelectorElem = document.querySelector('[data-locales-selector]');
  const toggleBtn = localesSelectorElem.querySelector('[data-locales-toggle]');
  const localesList = localesSelectorElem.querySelector('.locales__list');

  toggleBtn.addEventListener('click', () => {
    if (localesList.classList.contains('active')) {
      localesList.classList.remove('active');
    } else {
      localesList.classList.add('active');
    }
    console.log('localesList.classList ===> ', localesList.classList);
  });

  console.log('toggleBtn ===> ', toggleBtn);
};
