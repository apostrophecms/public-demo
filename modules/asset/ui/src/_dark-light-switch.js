export default () => {
  const APOS_LIGHT_DARK_KEY = 'apostrophe-demo-visual-preference';

  // Check preference immediately to prevent flash
  const pref = localStorage.getItem(APOS_LIGHT_DARK_KEY);
  if (pref === 'dark') {
    document.body.classList.add('dark');
  }

  updateNavLogo(pref === 'dark');

  let done = false;

  function getSafeLogoUrl(logo, dataAttrName) {
    const value = logo.getAttribute(dataAttrName);
    if (!value) {
      return null;
    }
    try {
      const url = new URL(value, window.location.origin);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        return url.toString();
      }
    } catch (e) {
      // Invalid URL; fall through to return null.
    }
    return null;
  }

  function getCurrentPreference() {
    // First try to get from toggle input if it exists
    const toggle = document.querySelector('[data-mode-switch] input');
    if (toggle) {
      return toggle.checked ? 'dark' : 'light';
    }
    // Fall back to localStorage
    return localStorage.getItem(APOS_LIGHT_DARK_KEY) || 'light';
  }

  function updateNavLogo(isDark) {
    const logo = document.getElementById('nav-logo');
    if (!logo) {
      return;
    }
    if (isDark && logo.hasAttribute('data-dark-url')) {
      const safeUrl = getSafeLogoUrl(logo, 'data-dark-url');
      if (safeUrl) {
        logo.setAttribute('src', safeUrl);
      }
    } else if (!isDark && logo.hasAttribute('data-light-url')) {
      const safeUrl = getSafeLogoUrl(logo, 'data-light-url');
      if (safeUrl) {
        logo.setAttribute('src', safeUrl);
      }
    }
  }

  apos.util.onReady(() => {
    if (done) {
      return;
    }
    done = true;

    const currentPref = getCurrentPreference();
    updateNavLogo(currentPref === 'dark');

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
    // Get fresh preference from toggle input
    const currentPref = getCurrentPreference();
    updateNavLogo(currentPref === 'dark');
  }

  // Watch changes to apos refreshable and make sure logo is updated
  const el = document.querySelector('[data-apos-refreshable]');

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'childList' || m.type === 'characterData') {
        // Get fresh preference from toggle input
        const currentPref = getCurrentPreference();
        updateNavLogo(currentPref === 'dark');
      }
    }
  });

  observer.observe(el, {
    childList: true,
    subtree: true,
    characterData: true
  });
};
