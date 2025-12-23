export default () => {
  apos.util.onReadyAndRefresh(() => {

    const pagePref = localStorage.getItem('apos-@apostrophecms/page-save-pref');
    if (!pagePref) {
      localStorage.setItem('apos-@apostrophecms/page-save-pref', 'onSaveAndView');
    }

    const articlePref = localStorage.getItem('apos-article-save-pref');
    if (!articlePref) {
      localStorage.setItem('apos-article-save-pref', 'onSaveAndView');
    }

  });
};
