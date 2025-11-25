export default () => {
  apos.util.onReadyAndRefresh(() => {
    const toggle = document.querySelector('[data-mode-switch] input');

    if (!toggle) {
      return;
    }

    toggle.addEventListener('change', toggleMode);

    function toggleMode (event) {
      document.body.classList.toggle('dark');
    }
  });
};
