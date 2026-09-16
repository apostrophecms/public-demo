// Light/dark mode toggle. The visitor's choice is saved in localStorage and
// applied as a `dark` class on <body>; the `.dark` rules in _variables.scss and
// the dark-mode fields in modules/@apostrophecms/styles key off that class.
export default () => {
  const STORAGE_KEY = 'apostrophe-demo-visual-preference';

  // Apply the saved preference right away to avoid a flash of light mode.
  setDark(readPreference() === 'dark');

  apos.util.onReady(() => {
    const toggle = document.querySelector('[data-mode-switch] input');
    // onReady runs again after in-context edits refresh the page content;
    // only wire the toggle up once.
    if (!toggle || toggle.dataset.modeSwitchReady) {
      return;
    }
    toggle.dataset.modeSwitchReady = 'true';
    toggle.checked = isDark();
    toggle.addEventListener('change', () => {
      setDark(toggle.checked);
      writePreference(toggle.checked ? 'dark' : 'light');
    });
  });

  // Refreshing the page content re-renders the header with the light logo,
  // so swap the dark one back in whenever that happens.
  const refreshable = document.querySelector('[data-apos-refreshable]');
  if (refreshable) {
    new MutationObserver(() => updateNavLogo(isDark()))
      .observe(refreshable, {
        childList: true,
        subtree: true
      });
  }

  function isDark() {
    return document.body.classList.contains('dark');
  }

  function setDark(dark) {
    document.body.classList.toggle('dark', dark);
    updateNavLogo(dark);
  }

  // localStorage can throw when storage is blocked (some private windows).
  function readPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function writePreference(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // The toggle still works for this page view.
    }
  }

  // The logo URLs come from data attributes rendered in views/layout.jsx.
  // Only http(s) URLs are accepted before they are assigned to `src`.
  function updateNavLogo(dark) {
    const logo = document.getElementById('nav-logo');
    if (!logo) {
      return;
    }
    const url = safeUrl(logo.getAttribute(dark ? 'data-dark-url' : 'data-light-url'));
    if (url && logo.getAttribute('src') !== url) {
      logo.setAttribute('src', url);
    }
  }

  function safeUrl(value) {
    if (!value) {
      return null;
    }
    try {
      const url = new URL(value, window.location.origin);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        return url.toString();
      }
    } catch (e) {
      // Invalid URL
    }
    return null;
  }
};
