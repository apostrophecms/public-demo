export default () => {
  const APOS_LIGHT_DARK_KEY = 'apostrophe-demo-visual-preference';

  // Check preference immediately to prevent flash
  const pref = localStorage.getItem(APOS_LIGHT_DARK_KEY);
  if (pref === 'dark') {
    document.body.classList.add('dark');
  }

  updateNavLogo(pref === 'dark');

  let done = false;

  function updateNavLogo(isDark) {
    const logo = document.getElementById('nav-logo');
    if (!logo) {
      return;
    }
    if (isDark && logo.hasAttribute('data-dark-url')) {
      logo.setAttribute('src', logo.getAttribute('data-dark-url'));
    } else if (!isDark && logo.hasAttribute('data-light-url')) {
      logo.setAttribute('src', logo.getAttribute('data-light-url'));
    }
  }

  apos.util.onReady(() => {
    if (done) {
      return;
    }
    done = true;

    updateNavLogo(pref === 'dark');

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
    updateNavLogo(pref === 'dark');
  }

  // Watch changes to apos refreshable and make sure logo is updated
  const el = document.querySelector('[data-apos-refreshable]');

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'childList' || m.type === 'characterData') {
        updateNavLogo(pref === 'dark');
      }
    }
  });

  observer.observe(el, {
    childList: true,
    subtree: true,
    characterData: true
  });
};
