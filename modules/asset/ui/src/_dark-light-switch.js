export default () => {
  const APOS_LIGHT_DARK_KEY = 'apostrophe-demo-visual-preference';

  apos.util.onReadyAndRefresh(() => {
    setInitial();
    const toggle = document.querySelector('[data-mode-switch] input');

    if (!toggle) {
      return;
    }

    toggle.addEventListener('change', toggleMode);

    function toggleMode () {
      document.body.classList.toggle('dark');
      const pref = document.body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem(APOS_LIGHT_DARK_KEY, pref);
    }
  });

  function setInitial() {
    const pref = localStorage.getItem(APOS_LIGHT_DARK_KEY);
    if (pref === 'dark') {
      document.querySelector('[data-mode-switch] input').checked = true;
      document.body.classList.toggle('dark');
    }
  }
};
