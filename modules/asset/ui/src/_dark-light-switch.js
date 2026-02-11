export default () => {
  const APOS_LIGHT_DARK_KEY = 'apostrophe-demo-visual-preference';

  // Check preference immediately to prevent flash
  const pref = localStorage.getItem(APOS_LIGHT_DARK_KEY);
  if (pref === 'dark') {
    document.body.classList.add('dark');
  }

  let done = false;

  apos.util.onReady(() => {
    if (done) {
      return;
    }
    done = true;

    const toggle = document.querySelector('[data-mode-switch] input');

    if (!toggle) {
      return;
    }

    // Sync toggle UI with current state
    toggle.checked = (pref === 'dark');

    toggle.addEventListener('change', toggleMode);
  });

  function toggleMode() {
    document.body.classList.toggle('dark');
    const pref = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem(APOS_LIGHT_DARK_KEY, pref);
  }
};
