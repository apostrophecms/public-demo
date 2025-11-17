export default () => {
  apos.util.onReadyAndRefresh(() => {
    const toggle = document.querySelector('[data-mode-switch] input');

    if (!toggle) {
      console.log('bail');
      return;
    }

    toggle.addEventListener('change', toggleMode);

    // window.addEventListener('click', clickOutside);

    function toggleMode (event) {
      console.log('change');
    }
  });
};
